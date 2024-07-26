import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const staggeredBaseQuery = async (args, api, extraOptions) => {
    try {
        const result = await fetchBaseQuery({
            baseUrl: '',
        })(args, api, extraOptions);

        return result;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
};

export const websiteApi = createApi({
    reducerPath: 'websiteApi',
    baseQuery: staggeredBaseQuery,
    keepUnusedDataFor: 240,
    tagTypes: [],
    endpoints: builder => ({
        cryptoData: builder.query({
            query: () => `http://zedxexchangeapi.com/api/wallet/coinMarket`,
            keepUnusedDataFor: 0,
        }),
    }),
});

export const { useCryptoDataQuery } = websiteApi;

export default websiteApi;
