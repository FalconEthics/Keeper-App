import {createSlice} from "@reduxjs/toolkit";


const noteSlice = createSlice({
    name: 'note',
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },
        remove(state, action) {
            state.splice(action.payload, 1);
        }
    },
});

export const { add, remove } = noteSlice.actions;
export default noteSlice.reducer;