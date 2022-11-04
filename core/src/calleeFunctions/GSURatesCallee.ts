import type { CalleeFunctions, CollateralConfig } from '../types';
import fetch from 'node-fetch';
import BigNumber from '../bignumber';

const DECIMAL_18 = new BigNumber(1000000000000000000);
const GSU_RATES = process.env.GSU_RATES || 'https://goerli.gsu.io/Umbraco/Api/Rates/GSU/';
type RatesAPIResponse = {
    price: string;
}

const fetchDaiRates = async function (network: string, symbol: string): Promise<BigNumber> {
    let rate = new BigNumber(1);
    console.log('asking for Dai rates', network, symbol, rate);
    try {
        const response = await fetch(GSU_RATES + '?symbol=' + symbol, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = (await response.json()) as RatesAPIResponse;
        rate = new BigNumber(result.price).dividedBy(DECIMAL_18);
    } catch (error) {
        console.log('error message: ', error);
    } finally {
        console.log('will return rate', rate.toString());
        return rate;
    }
};

const getCalleeData = async function (
    network: string,
    collateral: CollateralConfig,
    profitAddress: string
): Promise<string> {
    console.log('ignore asking for Callee data', network, collateral.symbol, profitAddress);
    return '0x';
};

const getMarketPrice = async function (
    network: string,
    collateral: CollateralConfig,
    collateralAmount: BigNumber
): Promise<BigNumber> {
    console.log('collateral symbol', JSON.stringify(collateral), collateralAmount);
    // convert collateral into DAI
    const daiPrice = await fetchDaiRates(network, collateral.symbol);

    // return price per unit
    return daiPrice;
};

const GSURatesCalleeDai: CalleeFunctions = {
    getCalleeData,
    getMarketPrice,
};

export default GSURatesCalleeDai;
