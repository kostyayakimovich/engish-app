export enum AuthorizationActionCreaterKeys {
 email = "email",
 password = "password",
}

export interface AuthorizationActionCreater {
 [AuthorizationActionCreaterKeys.email]: string;
 [AuthorizationActionCreaterKeys.password]: string;
}

export interface AuthorizationActionSaga {
 type: string;
 payload: AuthorizationActionCreater;
}

export interface User {
 email: string;
 isActivate: boolean;
 id: string;
}

export interface AuthResponse {
 accessToken: string;
 refreshToken: string;
 user: User;
}
