import { all } from "redux-saga/effects";

import authorizationSagaWatcher from "./sagas/authorizationSaga";
import wordsSagaWatcer from "./sagas/wordsSaga";

export function* rootSaga() {
 yield all([authorizationSagaWatcher, wordsSagaWatcer]);
}
