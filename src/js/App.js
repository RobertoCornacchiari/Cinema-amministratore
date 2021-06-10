import React, { useReducer, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Home, AggiungiFilm} from './components.js';
import "./style.scss";

const { GETData, postData } = require("./fetch.js");

const AppContext = React.createContext(null);

export function App() {
  const [state, dispatch] = useReducer(reducer, {
    codice: "",
    proiezioniDisponibili: [],
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
        <Router>
            <Switch>
                <Route exact path="/aggiungiFilm">
                    <AggiungiFilm contesto={AppContext} />
                </Route>
                <Route path="/">
                    <Home contesto={AppContext} />
                </Route>
            </Switch>
        </Router>
    </AppContext.Provider>
  );
}

function reducer(state, action) {
    let newState = { ...state };
    switch (action.type) {
      case "Carica proiezioni":
        newState.proiezioniDisponibili = action.payload;
      break;
      default:
        break;
    }
    console.log("stato", newState);
    return newState;
  }
