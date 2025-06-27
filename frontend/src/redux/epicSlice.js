import { createSlice } from "@reduxjs/toolkit";

const epicSlice = createSlice({
    name: 'epic',
    initialState: {
        results: {}
    },
    reducers: {
        setEpicResults: (state, action) => {
            console.log('epic results :', action)
            const { date, data } = action.payload;
            state.results[date] = data;
        }
    }
});

export const { setEpicResults } = epicSlice.actions;
export default epicSlice.reducer;
