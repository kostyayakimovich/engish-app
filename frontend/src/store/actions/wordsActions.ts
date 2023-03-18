import { createAction } from "redux-actions";
import {
 AddWordActionCreater,
 EditWordActionCreater,
 GetWordsActionCreater,
 RemoveWordActionCreater,
} from "../models/words.model";

export const wordsTypeActions = {
 GET_WORDS: "GET_WORDS",
 ADD_WORD: "ADD_WORD",
 EDIT_WORD: "EDIT_WORD",
 REMOVE_WORD: "REMOVE_WORD",
};

const getWords = createAction(
 wordsTypeActions.GET_WORDS,
 ({ userId }: GetWordsActionCreater) => ({
  userId,
 })
);

const addWord = createAction(
 wordsTypeActions.ADD_WORD,
 ({ userId, word, wordTranslate }: AddWordActionCreater) => ({
  userId,
  word,
  wordTranslate,
 })
);

const editWord = createAction(
 wordsTypeActions.EDIT_WORD,
 ({ userId, wordId, newWord, newWordTranslate }: EditWordActionCreater) => ({
  userId,
  wordId,
  newWord,
  newWordTranslate,
 })
);

const removeWord = createAction(
 wordsTypeActions.REMOVE_WORD,
 ({ userId, wordId }: RemoveWordActionCreater) => ({
  userId,
  wordId,
 })
);

export const wordsActions = {
 getWords,
 addWord,
 editWord,
 removeWord,
};
