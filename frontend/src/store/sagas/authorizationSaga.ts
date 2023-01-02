import { takeEvery, put, fork, call } from "redux-saga/effects";
import { setCookie } from "react-use-cookie";
import { authorizationTypeActions } from "../actions/authorizationActions";
import { AuthorizationActionSaga, Pages } from "../models";
import {
 errorServer,
 isLoading,
 loginParams,
 page,
 registerParams,
 user,
} from "../reduxActions";
import api from "../server";

function* loginSagaHandler(action: AuthorizationActionSaga): any {
 try {
  yield put(isLoading(true));
  yield put(errorServer(null));
  try {
   const response: any = yield call(api.login, action.payload);
   if (response.accessToken && response?.refreshToken) {
    localStorage.setItem("accessToken", response.accessToken);
    setCookie("refreshToken", response.refreshToken, { days: 60 });
    yield put(loginParams(response));
    yield put(page(Pages.Home));
   } else if (response?.message) {
    yield put(errorServer(response.message));
   }
  } catch (error) {
   yield put(errorServer("Error server login error"));
  }

  yield put(isLoading(false));
 } catch (error) {
  yield put(errorServer(error));
 }
}

function* registerSagaHandler(action: AuthorizationActionSaga): any {
 try {
  yield put(isLoading(true));
  yield put(errorServer(null));
  try {
   const response: any = yield call(api.register, action.payload);
   if (response?.accessToken && response?.refreshToken) {
    yield put(registerParams(response));
    localStorage.setItem("accessToken", response.accessToken);
    setCookie("refreshToken", response.refreshToken, { days: 60 });
   } else if (response?.message) {
    yield put(errorServer(response.message));
   }
  } catch (error) {
   yield put(errorServer("Error server registration error"));
  }
  yield put(isLoading(false));
 } catch (error) {
  yield put(errorServer(error));
 }
}

function* logoutSagaHandler() {
 try {
  yield put(isLoading(true));
  yield put(errorServer(null));
  try {
   yield call(api.logout);
   yield put(page(Pages.Login));
   localStorage.removeItem("accessToken");
   setCookie("refreshToken", "", { days: 1 });
  } catch (error) {
   yield put(errorServer("Error server logout error"));
  }
  yield put(isLoading(false));
 } catch (error) {
  yield put(errorServer(error));
 }
}

function* checkAuthSagaHandler(): any {
 try {
  yield put(errorServer(null));
  try {
   const response: any = yield call(api.checkAuth);
   if (response?.refreshToken && response?.user) {
    setCookie("refreshToken", response.refreshToken, { days: 60 });
    yield put(user(response.user));
    yield put(page(Pages.Home));
   }
  } catch (error) {
   yield put(errorServer("Error server auth error"));
  }
 } catch (error) {
  yield put(errorServer(error));
 }
}

function* authorizationSagaWatcher() {
 yield takeEvery(authorizationTypeActions.LOG_IN, loginSagaHandler);
 yield takeEvery(authorizationTypeActions.REG, registerSagaHandler);
 yield takeEvery(authorizationTypeActions.LOGOUT, logoutSagaHandler);
 yield takeEvery(authorizationTypeActions.CHECK_AUTH, checkAuthSagaHandler);
}

export default fork(authorizationSagaWatcher);
