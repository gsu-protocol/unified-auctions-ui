import type { CalleeFunctions, CollateralConfig, GetCalleeDataParams, PriceWithPools } from '../types';
import BigNumber from '../bignumber';
import { NULL_BYTES } from '../constants/UNITS';
import { fetchGSURates } from './helpers/gsu';

const getCalleeData = async function (
    network: string,
    collateral: CollateralConfig,
    marketId: string,
    profitAddress: string,
    params?: GetCalleeDataParams
): Promise<string> {
    console.warn('ignore asking for Callee data', network, marketId, collateral.symbol, profitAddress, params);
    return NULL_BYTES;
};

const getMarketPrice = async function (
    network: string,
    _collateral: CollateralConfig,
    _marketId: string,
    collateralAmount: BigNumber
): Promise<PriceWithPools> {
    // eslint-disable-next-line no-console
    console.debug('ignoring market price params', network, _marketId, collateralAmount);
    // convert collateral into DAI aka GSUc
    const daiPrice = await fetchGSURates(_collateral.symbol);

    // return price per unit
    return { price: daiPrice, pools: [] };
};

const GSURatesCallee: CalleeFunctions = {
    getCalleeData,
    getMarketPrice,
};

export default GSURatesCallee;
