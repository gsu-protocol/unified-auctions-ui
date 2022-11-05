import type { CalleeFunctions, CollateralConfig } from '../types';
import fetch from 'node-fetch';
import BigNumber from '../bignumber';
import { WAD, NULL_BYTES } from '../constants/UNITS';

const GSU_RATES = process.env.GSU_RATES || 'https://goerli.gsu.io/Umbraco/Api/Rates/GSU/';
type RatesAPIResponse = {
    price: string;
};

const fetchDaiRates = async function (symbol: string): Promise<BigNumber> {
    let rate = new BigNumber(1);
    try {
        const response = await fetch(GSU_RATES + '?symbol=' + symbol, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = (await response.json()) as RatesAPIResponse;
        rate = new BigNumber(result.price).dividedBy(WAD);
    } catch (error) {
        console.error('fetchDaiRates error message: ', error);
    } finally {
        return rate;
    }
};

const getCalleeData = async function (
    network: string,
    collateral: CollateralConfig,
    profitAddress: string
): Promise<string> {
    console.warn('ignore asking for Callee data', network, collateral.symbol, profitAddress);
    return NULL_BYTES;
};

const getMarketPrice = async function (
    network: string,
    collateral: CollateralConfig,
    collateralAmount: BigNumber
): Promise<BigNumber> {
    console.warn('ignoring all parameters but collateral', network, collateralAmount);
    // convert collateral into DAI
    const daiPrice = await fetchDaiRates(collateral.symbol);

    // return price per unit
    return daiPrice;
};

const GSURatesCallee: CalleeFunctions = {
    getCalleeData,
    getMarketPrice,
};

export default GSURatesCallee;
