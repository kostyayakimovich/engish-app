import { createSlice } from '@reduxjs/toolkit';
import { WordsData } from '../models/words.model';

interface WordsState {
 isLoading: boolean;
 errorServer: null | string;
 wordsData: WordsData[];
}

const wordsSlice = createSlice({
 name: 'words',
 initialState: {
  isLoading: false,
  errorServer: null,
  wordsData: [],
 } as WordsState,
 reducers: {
  errorServer: (state, action) => {
   state.errorServer = action.payload;
  },
  isLoading: (state, action) => {
   state.isLoading = action.payload;
  },
  wordsData: (state, action) => {
   state.wordsData = Array.isArray(action.payload) ? action.payload : [];
  },
 },
});

export const { errorServer, isLoading, wordsData } = wordsSlice.actions;
export default wordsSlice.reducer;
