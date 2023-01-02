import { AuthorizationActionCreater } from "../models";
import { createAction } from "redux-actions";

export const authorizationTypeActions = {
 LOG_IN: "LOG_IN",
 REG: "REG",
 LOGOUT: "LOGOUT",
 CHECK_AUTH: "CHECK_AUTH",
};

const logIn = createAction(
 authorizationTypeActions.LOG_IN,
 ({ email, password }: AuthorizationActionCreater) => ({
  email,
  password,
 })
);

const register = createAction(
 authorizationTypeActions.REG,
 ({ email, password }: AuthorizationActionCreater) => ({
  email,
  password,
 })
);

const logout = createAction(authorizationTypeActions.LOGOUT);

const checkAuth = createAction(authorizationTypeActions.CHECK_AUTH);

export const authorizationActions = {
 logIn,
 register,
 logout,
 checkAuth,
};
