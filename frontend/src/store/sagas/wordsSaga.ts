import { takeEvery, put, fork, call } from 'redux-saga/effects';
import { wordsTypeActions } from '../actions/wordsActions';
import { WordsActionSaga } from '../models/words.model';

import api from '../server';
import { isLoading, errorServer, wordsData } from '../slices/words';

function* getWordsSagaHandler(action: WordsActionSaga): any {
 try {
  yield put(isLoading(true));
  yield put(errorServer(null));
  try {
   const response: any = yield call(api.getWords, action.payload);
   if (response) {
    yield put(wordsData(response));
   } else if (response?.message) {
    yield put(errorServer(response.message));
   }
  } catch (error) {
   yield put(errorServer('Error server login error'));
  }
  yield put(isLoading(false));
 } catch (error) {
  yield put(errorServer(error));
 }
}

function* addWordSagaHandler(action: WordsActionSaga): any {
 try {
  yield put(isLoading(true));
  yield put(errorServer(null));
  try {
   const response: any = yield call(api.addWord, action.payload);
   if (response?.message) {
    yield put(errorServer(response.message));
   }
  } catch (error) {
   yield put(errorServer('Error server login error'));
  }
  yield put(isLoading(false));
 } catch (error) {
  yield put(errorServer(error));
 }
}

function* editWordSagaHandler(action: WordsActionSaga): any {
 try {
  yield put(isLoading(true));
  yield put(errorServer(null));
  try {
   const response: any = yield call(api.editWord, action.payload);
   if (response?.message) {
    yield put(errorServer(response.message));
   }
  } catch (error) {
   yield put(errorServer('Error server login error'));
  }
  yield put(isLoading(false));
 } catch (error) {
  yield put(errorServer(error));
 }
}

function* removeWordSagaHandler(action: WordsActionSaga): any {
 try {
  yield put(isLoading(true));
  yield put(errorServer(null));
  try {
   const response: any = yield call(api.removeWord, action.payload);
   if (response?.message) {
    yield put(errorServer(response.message));
   }
  } catch (error) {
   yield put(errorServer('Error server login error'));
  }
  yield put(isLoading(false));
 } catch (error) {
  yield put(errorServer(error));
 }
}

function* wordsSagaWatcher() {
 yield takeEvery(wordsTypeActions.GET_WORDS, getWordsSagaHandler);
 yield takeEvery(wordsTypeActions.ADD_WORD, addWordSagaHandler);
 yield takeEvery(wordsTypeActions.EDIT_WORD, editWordSagaHandler);
 yield takeEvery(wordsTypeActions.REMOVE_WORD, removeWordSagaHandler);
}

export default fork(wordsSagaWatcher);
