import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './noteSlice';
const store = configureStore({
    reducer: {
        note: noteReducer,
    },
});

export default store;