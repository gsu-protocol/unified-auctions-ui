import { warpTime, resetNetworkAndSetupWallet } from '../../helpers/hardhat/network';
import { addDaiToBalance, addMkrToBalance } from '../../helpers/hardhat/balance';
import { Simulation } from '../types';
import { collectStabilityFees, fetchVault, liquidateVault } from '../../src/vaults';
import { TEST_NETWORK } from '../../helpers/constants';
import createVaultWithCollateral, {
    adjustLimitsAndRates,
    calculateMinCollateralAmountToOpenVault,
} from '../helpers/createVaultWithCollateral';
import promptToSelectOneOption from '../helpers/promptToSelectOneOption';
import promptToGetBlockNumber from '../helpers/promptToGetBlockNumber';

import { fetchMaximumAuctionDurationInSeconds } from '../../src/fetch';
import { getAllCollateralTypes } from '../../src/constants/COLLATERALS';

const TWO_YEARS_IN_MINUTES = 60 * 24 * 30 * 12 * 2;

const simulation: Simulation = {
    title: 'Create collateral auction',
    steps: [
        {
            title: 'Reset blockchain fork',
            entry: async () => {
                const number = await promptToGetBlockNumber();
                await resetNetworkAndSetupWallet(number);
                const collateralType = await promptToSelectOneOption(
                    'Select the collateral symbol to add to the VAT.',
                    getAllCollateralTypes()
                );
                return {
                    collateralType,
                };
            },
        },
        {
            title: 'Create the vault',
            entry: async context => {
                await adjustLimitsAndRates(context.collateralType);
                const collateralOwned = await calculateMinCollateralAmountToOpenVault(context.collateralType);
                console.info(`Minimum collateral amount to open vault: ${collateralOwned.toFixed()}`);
                const latestVaultId = await createVaultWithCollateral(context.collateralType, collateralOwned);
                console.info(`Created Vault id: ${latestVaultId}`);
                return { ...context, latestVaultId };
            },
        },
        {
            title: 'Skip time',
            entry: async context => {
                await warpTime(TWO_YEARS_IN_MINUTES, 60);
                return context;
            },
        },
        {
            title: 'Collect stability fees',
            entry: async context => {
                const collateralType = context.collateralType;
                const latestVaultId = context.latestVaultId;
                const vaultBefore = await fetchVault(TEST_NETWORK, latestVaultId);
                console.info(`stability fees before ${vaultBefore.stabilityFeeRate}`);
                await collectStabilityFees(TEST_NETWORK, collateralType);
                const vaultAfter = await fetchVault(TEST_NETWORK, latestVaultId);
                console.info(`stability fees after ${vaultAfter.stabilityFeeRate}`);
                return context;
            },
        },
        {
            title: 'Liquidate the vault',
            entry: async context => {
                const liquidatedId = context.latestVaultId;
                const vault = await fetchVault(TEST_NETWORK, liquidatedId);
                await liquidateVault(TEST_NETWORK, vault.collateralType, vault.address);
                return context;
            },
        },
        {
            title: 'Skip time',
            entry: async context => {
                const auctionLifetime = await fetchMaximumAuctionDurationInSeconds(
                    TEST_NETWORK,
                    context.collateralType
                );
                const warpSeconds = Math.floor(auctionLifetime / 2);
                if (!warpSeconds) {
                    throw new Error('Auction lifetime is too short to warp time.');
                }
                console.info(`Skipping time: ${warpSeconds} seconds`);
                await warpTime(warpSeconds, 1);
                return context;
            },
        },
        {
            title: 'Add GSUc and GSUp to the wallet',
            entry: async () => {
                await addDaiToBalance();
                await addMkrToBalance();
            },
        },
    ],
};

export default simulation;
