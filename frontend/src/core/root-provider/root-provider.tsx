import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { Pages } from "../../store/models";
import Home from "../../pages/home";
import Login from "../../pages/login";
import ErrorPage from "../../pages/error-page";

import { authorizationActions } from "../../store/actions/authorizationActions";

import "./root-provider.scss";

const RootProvider = () => {
 const { page } = useSelector((state: RootState) => state.authorization);
 const dispatch = useDispatch();
 useEffect(() => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
   dispatch(authorizationActions.checkAuth());
  }
 }, [dispatch]);

 return (
  <div className="root-provider">
   <Routes>
    <Route
     path="/login"
     element={page === Pages.Login ? <Login /> : <Navigate to="/" />}
    />
    <Route
     path="/"
     element={page === Pages.Home ? <Home /> : <Navigate to="/login" />}
    />
    <Route path="*" element={<ErrorPage />} />
   </Routes>
  </div>
 );
};

export default RootProvider;
