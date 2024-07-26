import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { websiteApi } from './web-app';

export const store = configureStore({
    reducer: {
        [websiteApi.reducerPath]: websiteApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(websiteApi.middleware),
});

setupListeners(store.dispatch);
