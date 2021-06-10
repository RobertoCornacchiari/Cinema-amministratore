import React, { useReducer, useContext, useEffect, useState } from "react";
import "./style.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const { GETData, postData } = require("./fetch.js");

export function Home(params) {
  const { state, dispatch } = useContext(params.contesto);

  return <Pagina body={<h1>Ciao</h1>} />;
}

export function AggiungiFilm(params) {
  const { state, dispatch } = useContext(params.contesto);

  return <Pagina body={<h1>Film</h1>} />;
}

function Pagina(props) {
  return (
    <div className="Pagina">
      <nav class="barra navbar navbar-expand-md navbar-dark bg-dark">
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link to="/" style={{ textDecoration: "none" }}>
                <a class="nav-link" href="#">
                  Home
                </a>
              </Link>
            </li>
            <li class="nav-item">
                <Link to="/aggiungiFilm" style={{ textDecoration: "none" }}>
                <a class="nav-link" href="#">
                  Aggiungi Film
                </a>
              </Link>
            </li>
            <li class="nav-item">
            <Link to="/aggiungiProiezione" style={{ textDecoration: "none" }}>
                <a class="nav-link" href="#">
                  Aggiungi Proiezione
                </a>
              </Link>
            </li>
            <li class="nav-item">
            <Link to="/cercaSpettatori" style={{ textDecoration: "none" }}>
                <a class="nav-link" href="#">
                  Cerca Spettatori
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="corpo">{props.body}</div>
    </div>
  );
}
