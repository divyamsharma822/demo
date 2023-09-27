import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
};

export const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        add: (state, action) => {
            state.list.unshift(action.payload);
            state.list.splice(10, state.list.length);
        },
    },
});

export const { add } = historySlice.actions;

export default historySlice.reducer;
