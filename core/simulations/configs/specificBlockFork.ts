import { warpTime, resetNetworkAndSetupWallet } from '../../helpers/hardhat/network';
import promptToGetBlockNumber from '../helpers/promptToGetBlockNumber';
import { Simulation } from '../types';

const simulation: Simulation = {
    title: `Fork at specific block`,
    steps: [
        {
            title: `Reset blockchain fork`,
            entry: async () => {
                const selectedBlockNumber = await promptToGetBlockNumber();
                await resetNetworkAndSetupWallet(selectedBlockNumber);
            },
        },
        {
            title: 'Skip time',
            entry: async () => {
                await warpTime();
                return;
            },
        },
    ],
};

export default simulation;
