import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../modules/header";
import { wordsActions } from "../../store/actions/wordsActions";
import { RootState } from "../../store/store";

import "./style.scss";

const Home: React.FunctionComponent = memo(() => {
 const dispatch = useDispatch();
 const { user } = useSelector((state: RootState) => state.authorization);
 console.log(user, "user");

 useEffect(() => {
  dispatch(wordsActions.getWords({ userId: "12" }));
 }, [dispatch]);
 return (
  <div className="home">
   <Header />
  </div>
 );
});

export default Home;
