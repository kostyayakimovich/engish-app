import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import RootProvider from "./core/root-provider";
import { store } from "./store/store";
import "./App.css";

function App() {
 return (
  <BrowserRouter>
   <Provider store={store}>
    <RootProvider />
   </Provider>
  </BrowserRouter>
 );
}

export default App;
