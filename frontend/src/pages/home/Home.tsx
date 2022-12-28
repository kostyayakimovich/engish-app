import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authorizationActions } from "../../store/actions/authorizationActions";
import { RootState } from "../../store/store";

import "./style.scss";

const Home: React.FunctionComponent = memo(() => {
 const dispatch = useDispatch();
 const { user } = useSelector((state: RootState) => state.authorization);
 console.log(user, "user");

 useEffect(() => {
  dispatch(authorizationActions.getUsers());
 }, [dispatch]);
 return <div className="home">Home page</div>;
});

export default Home;
