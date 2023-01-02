import { createAction } from "redux-actions";
import {
 addWordActionCreater,
 editWordActionCreater,
 getWordsActionCreater,
} from "../models/words.model";

export const wordsTypeActions = {
 GET_WORDS: "GET_WORDS",
 ADD_WORD: "ADD_WORD",
 EDIT_WORD: "EDIT_WORD",
 REMOVE_WORD: "REMOVE_WORD",
};

const getWords = createAction(
 wordsTypeActions.GET_WORDS,
 ({ userId }: getWordsActionCreater) => ({
  userId,
 })
);

const addWord = createAction(
 wordsTypeActions.ADD_WORD,
 ({ userId, word, wordTranslate }: addWordActionCreater) => ({
  userId,
  word,
  wordTranslate,
 })
);

const editWord = createAction(
 wordsTypeActions.EDIT_WORD,
 ({ userId, wordId, newWord, newWordTranslate }: editWordActionCreater) => ({
  userId,
  wordId,
  newWord,
  newWordTranslate,
 })
);

const removeWord = createAction(
 wordsTypeActions.EDIT_WORD,
 ({ userId, wordId }: editWordActionCreater) => ({
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
