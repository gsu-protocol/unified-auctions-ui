import fetch from 'node-fetch';
import BigNumber from '../../bignumber';
import { WAD } from '../../constants/UNITS';

const GSU_RATES = process.env.GSU_RATES || 'https://goerli.gsu.io/Umbraco/Api/Rates/GSU/';

type RatesAPIResponse = {
    price: string;
};

export const fetchGSURates = async function (symbol: string): Promise<BigNumber> {
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
        rate = new BigNumber(result.price);
        if (rate.isZero()) {
            rate = new BigNumber(1);
            console.warn('sending bad GSU rate', rate.toString());
        } else {
            rate = rate.dividedBy(WAD);
        }
    } catch (error) {
        console.error('fetchGSURates error message: ', error);
    } finally {
        return rate;
    }
};