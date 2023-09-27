import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import historySlice from "./reducers/historySlice";
import userSlice from "./reducers/userSlice";

// api
import { newsApi } from "../api/newsApi";
import { dashboardApi } from "../api/krishiBazaarApi";
import { kisaanStationsApi } from "../api/KisaanStationsApi";
import { daybestApi } from "../api/daybestApi";

export const store = configureStore({
    reducer: {
        history: historySlice,
        user: userSlice,
        [newsApi.reducerPath]: newsApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [kisaanStationsApi.reducerPath]: kisaanStationsApi.reducer,
        [daybestApi.reducerPath]: daybestApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(newsApi.middleware).concat(dashboardApi.middleware).concat(kisaanStationsApi.middleware).concat(daybestApi.middleware),
});

setupListeners(store.dispatch);
