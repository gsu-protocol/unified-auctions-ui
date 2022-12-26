import type { CalleeFunctions, CollateralConfig } from '../types';
import BigNumber from '../bignumber';
import { NULL_BYTES } from '../constants/UNITS';
import { fetchGSURates } from './helpers/gsu';

const getCalleeData = async function (
    network: string,
    collateral: CollateralConfig,
    marketId: string,
    profitAddress: string,
    preloadedPools?: Pool[]
): Promise<string> {
    console.warn('ignore asking for Callee data', network, collateral.symbol, profitAddress);
    return NULL_BYTES;
};

const getMarketPrice = async function (
    network: string,
    _collateral: CollateralConfig,
    _marketId: string,
    collateralAmount: BigNumber
): Promise<BigNumber> {
    // convert collateral into DAI aka GSUc
    const daiPrice = await fetchGSURates(_collateral.symbol);

    // return price per unit
    return daiPrice;
};

const GSURatesCallee: CalleeFunctions = {
    getCalleeData,
    getMarketPrice,
};

export default GSURatesCallee;