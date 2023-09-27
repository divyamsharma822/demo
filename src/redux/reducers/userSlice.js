import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        add: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { add } = userSlice.actions;

export default userSlice.reducer;
