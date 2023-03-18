import { createSlice } from "@reduxjs/toolkit";

const wordsSlice = createSlice({
 name: "words",
 initialState: {
  isLoading: false,
  errorServer: null,
  wordsData: [],
 },
 reducers: {
  errorServer: (state, action) => {
   state.errorServer = action.payload;
  },
  isLoading: (state, action) => {
   state.isLoading = action.payload;
  },
  wordsData: (state, action) => {
  state.wordsData = action.payload;
  },
 },
});

export const { errorServer, isLoading, wordsData } = wordsSlice.actions;
export default wordsSlice.reducer;
