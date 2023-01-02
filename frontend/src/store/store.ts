import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import words from "./slices/words";
import authorization from "./slices/authorization";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
 reducer: {
  authorization,
  words,
 },
 devTools: process.env.NODE_ENV === "development",
 middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
