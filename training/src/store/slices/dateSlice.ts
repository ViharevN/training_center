import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    date: {
        date_reg: "",
        time_reg: ""
    }
}

const dateSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload
        }
    }
})

export default dateSlice.reducer; 
export const { setDate } = dateSlice.actions;