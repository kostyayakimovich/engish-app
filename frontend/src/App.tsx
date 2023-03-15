import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Modal from "react-modal";
import RootProvider from "./core/root-provider";
import { store } from "./store/store";
import "./App.scss";

Modal.setAppElement("#root");

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
