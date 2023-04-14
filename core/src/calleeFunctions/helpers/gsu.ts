import fetch from 'node-fetch';
import BigNumber from '../../bignumber';

const GSU_RATES = process.env.GSU_RATES || 'https://api.gsucoin.app/Products/GSULive/';

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
        }
    } catch (error) {
        console.error('fetchGSURates error message: ', error);
    } finally {
        return rate;
    }
};