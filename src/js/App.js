import React, { useReducer, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import {GestioneFilm, GestioneProiezioni, CercaSpettatori} from './components.js';
import "./style.scss";

const { GETData, postData } = require("./fetch.js");

const AppContext = React.createContext(null);

export function App() {
  const [state, dispatch] = useReducer(reducer, {
    film: new Array(),
    proiezioni: new Array(),
    sale: new Array(),
    recapiti: new Array(),
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
        <Router>
            <Switch>
                <Route exact path="/gestioneProiezioni">
                    <GestioneProiezioni contesto={AppContext} />
                </Route>
                <Route exact path="/cercaSpettatori">
                    <CercaSpettatori contesto={AppContext} />
                </Route>
                <Route path="/">
                    <GestioneFilm contesto={AppContext} />
                </Route>
            </Switch>
        </Router>
    </AppContext.Provider>
  );
}

function reducer(state, action) {
    let newState = { ...state };
    switch (action.type) {
      case "Carica film":
        newState.film = action.payload;
      break;
      case "Carica proiezioni":
        newState.proiezioni = action.payload;
      break;
      case "Carica sale":
        newState.sale = action.payload;
      break;
      case "Carica recapiti":
        newState.recapiti = action.payload;
      break;
      default:
        break;
    }
    console.log("stato", newState);
    return newState;
  }
