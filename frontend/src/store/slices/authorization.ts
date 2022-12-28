import { createSlice } from "@reduxjs/toolkit";
import { Pages } from "../models";

const authorizationSlice = createSlice({
 name: "authorization",
 initialState: {
  isLoading: false,
  errorServer: null,
  page: Pages.Login,
  loginParams: null,
  registerParams: null,
  user: null,
 },
 reducers: {
  page: (state, action) => {
   state.page = action.payload;
  },
  errorServer: (state, action) => {
   state.errorServer = action.payload;
  },
  isLoading: (state, action) => {
   state.isLoading = action.payload;
  },
  loginParams: (state, action) => {
   state.loginParams = action.payload;
  },
  registerParams: (state, action) => {
   state.registerParams = action.payload;
  },
  user: (state, action) => {
   state.user = action.payload;
  },
 },
});

export const {
 errorServer,
 isLoading,
 page,
 loginParams,
 registerParams,
 user,
} = authorizationSlice.actions;
export default authorizationSlice.reducer;
