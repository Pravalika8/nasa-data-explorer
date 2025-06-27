import { createSlice } from '@reduxjs/toolkit';

const apodSlice = createSlice({
    name: 'apod',
    initialState: {
        results: {},
        favorites: {},
    },
    reducers: {
        setApodResults: (state, action) => {
            const list = Array.isArray(action.payload) ? action.payload : [action.payload];
            console.log('list: ', list);
            list.forEach((item) => {
                if (item.date) {
                    state.results[item.date] = item;
                }
            });
        },
        setApodResultsByDate: (state, action) => {
            const { date, item } = action.payload;
            state.results[date] = item;
        },
        toggleFavorite: (state, action) => {
            const { date, data } = action.payload;
            if (!state.favorites) {
                state.favorites = {};
            }
            if (state.favorites[date]) {
                delete state.favorites[date];
            } else {
                state.favorites[date] = data;

            }
        }
    },
});

export const { setApodResults, setApodResultsByDate, toggleFavorite } = apodSlice.actions;
export default apodSlice.reducer;