import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info: null
}

export const tvSlice = createSlice({
    name: 'tv',
    initialState,
    reducers: {
        loadTV: (state, action) => {
            state.info = action.payload;
        },

        removeTV: (state) => {
            state.info = null;
        },

    }
});

export const { loadTV, removeTV } = tvSlice.actions;

export default tvSlice.reducer;