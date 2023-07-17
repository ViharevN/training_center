import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  stepsData: {
    step: 0,
    variant: 0,
    replica: "",
    branch: 0
  }
};
  
const stepsSlice = createSlice({
    name: "steps",
    initialState,
    reducers: {
      getStepsData: (state, action) => {
        state.stepsData = action.payload
      },
      setStepsData: (state, action) => {
        state.stepsData = action.payload
      },
    },
  });
  
  export default stepsSlice.reducer;
  export const { getStepsData, setStepsData } = stepsSlice.actions;