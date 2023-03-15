import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../../modules/header";
import { wordsActions } from "../../store/actions/wordsActions";

import "./style.scss";

const Home: React.FunctionComponent = memo(() => {
 const dispatch = useDispatch();

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
