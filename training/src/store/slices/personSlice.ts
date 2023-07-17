import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    person: {
        surname: "",
        name: "",
        patronymic: "",
        phone: "",
        email: "",
        date_reg: "",
        time_reg: ""
    }
}

const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        setPersonData: (state, action) => {
            state.person = action.payload
        }
    }
})

export default personSlice.reducer; 
export const { setPersonData } = personSlice.actions;