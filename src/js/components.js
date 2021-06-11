import React, { useReducer, useContext, useEffect, useState } from "react";
import "./style.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const { GETData, postData } = require("./fetch.js");

let bool = 0;

export function Home(params) {
  const { state, dispatch } = useContext(params.contesto);

  function carica() {
    if (bool == 0) {
      bool = 1;
      GETData("film.php", {}).then((r) => {
        let a = new Array();
        for (let i in r) a.push(r[i]);
        let elencoFilm = a;
        console.log(elencoFilm);
        dispatch({ type: "Carica film", payload: elencoFilm });
      });
    }
  }
  carica();

  return <Pagina body={<h1>Ciao</h1>} />;
}

export function GestioneFilm(params) {
  const { state, dispatch } = useContext(params.contesto);

  function carica() {
    if (bool == 0) {
      bool = 1;
      GETData("film.php", {}).then((r) => {
        let a = new Array();
        for (let i in r) a.push(r[i]);
        let elencoFilm = a;
        console.log(elencoFilm);
        dispatch({ type: "Carica film", payload: elencoFilm });
      });
    }
  }
  carica();

  return (
    <Pagina
      body={
        <>
          <Card
            nome="Aggiungi Film"
            titolo="Aggiungi Film"
            contesto={params.contesto}
            bodyCard={
              <form>
                <div className="mb-3">
                  <label htmlFor="AggiungiFilmTitolo" className="form-label">
                    Titolo del film
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="AggiungiFilmTitolo"
                    required
                  ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="AggiungiFilmDurata" className="form-label">
                    Durata del film
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="AggiungiFilmDurata"
                    required
                  ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="AggiungiFilmRegista" className="form-label">
                    Nome del regista del film
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="AggiungiFilmRegista"
                    required
                  ></input>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  id="Conferma"
                  style={{ fontSize: "20px" }}
                  onClick={() => {
                    console.log("Entrato");
                    let titolo =
                      document.getElementById("AggiungiFilmTitolo").value;
                    let durata =
                      document.getElementById("AggiungiFilmDurata").value;
                    let regista = document.getElementById(
                      "AggiungiFilmRegista"
                    ).value;
                    if (
                      titolo == "" ||
                      isNaN(durata) ||
                      regista == "" ||
                      durata == ""
                    ) {
                      console.log("Fail");
                      electron.notificationApi.sendNotification(
                        "Campi non correttamente riempiti."
                      );
                    } else {
                      postData("aggiungiFilm.php", {
                        titolo: titolo,
                        durata: durata,
                        regista: regista,
                      }).then((r) => {
                        document.getElementById("AggiungiFilmTitolo").value =
                          "";
                        document.getElementById("AggiungiFilmDurata").value =
                          "";
                        document.getElementById("AggiungiFilmRegista").value =
                          "";
                        bool = 0;
                        carica();
                      });
                    }
                  }}
                >
                  Aggiungi
                </button>
              </form>
            }
          />
          <Card
            nome="Rimuovi Film"
            titolo="Rimuovi Film"
            contesto={params.contesto}
            bodyCard={
              <form>
                <div className="mb-3">
                  <label htmlFor="ScegliFilm" className="form-label">
                    Proiezioni
                  </label>
                  <select
                    className="form-select"
                    id="ScegliFilm"
                    aria-describedby="ScegliFilmHelp"
                    required
                  >
                    <Film contesto={params.contesto} />
                  </select>
                  <div id="ScegliFilmHelp" className="form-text">
                    Seleziona il film da eliminare.
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  id="Conferma"
                  style={{ fontSize: "20px" }}
                  onClick={() => {
                    let film = document.getElementById("ScegliFilm").value;
                    if (film != null) {
                      postData("EliminaFilm.php", {
                        titolo: film,
                      }).then((r) => {
                        bool = 0;
                        carica();
                      });
                    }
                  }}
                >
                  Elimina
                </button>
              </form>
            }
          />
        </>
      }
    />
  );
}

let boolProiezioni = 0;

export function GestioneProiezioni(params){
  const { state, dispatch } = useContext(params.contesto);

  function carica() {
    if (boolProiezioni == 0) {
      boolProiezioni = 1;
      GETData("proiezioni.php", {}).then((r) => {
        let a = new Array();
        for (let i in r) a.push(r[i]);
        let elencoProiezioni = a;
        console.log(elencoProiezioni);
        dispatch({ type: "Carica proiezioni", payload: elencoProiezioni });
      });
    }
  }
  carica();

  return (
    <Pagina
      body={
        <>
          <Card
            nome="Aggiungi Proiezione"
            titolo="Aggiungi Proiezione"
            contesto={params.contesto}
            bodyCard={
              <form>
                <button
                  type="button"
                  className="btn btn-primary"
                  id="Conferma"
                  style={{ fontSize: "20px" }}
                  onClick={() => {
                    console.log("Entrato");
                    let titolo =
                      document.getElementById("AggiungiFilmTitolo").value;
                    let durata =
                      document.getElementById("AggiungiFilmDurata").value;
                    let regista = document.getElementById(
                      "AggiungiFilmRegista"
                    ).value;
                    if (
                      titolo == "" ||
                      isNaN(durata) ||
                      regista == "" ||
                      durata == ""
                    ) {
                      console.log("Fail");
                      electron.notificationApi.sendNotification(
                        "Campi non correttamente riempiti."
                      );
                    } else {
                      postData("aggiungiFilm.php", {
                        titolo: titolo,
                        durata: durata,
                        regista: regista,
                      }).then((r) => {
                        document.getElementById("AggiungiFilmTitolo").value =
                          "";
                        document.getElementById("AggiungiFilmDurata").value =
                          "";
                        document.getElementById("AggiungiFilmRegista").value =
                          "";
                        bool = 0;
                        carica();
                      });
                    }
                  }}
                >
                  Aggiungi
                </button>
              </form>
            }
          />
          <Card
            nome="Rimuovi Proiezione"
            titolo="Rimuovi Proiezione"
            contesto={params.contesto}
            bodyCard={
              <form>
                <div className="mb-3">
                  <label htmlFor="ScegliProiezione" className="form-label">
                    Proiezioni
                  </label>
                  <select
                    className="form-select"
                    id="ScegliProiezione"
                    aria-describedby="ScegliProiezioneHelp"
                    required
                  >
                    <Proiezioni contesto={params.contesto} />
                  </select>
                  <div id="ScegliProiezioneHelp" className="form-text">
                    Seleziona la proiezione da eliminare.
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  id="Conferma"
                  style={{ fontSize: "20px" }}
                  onClick={() => {
                    let proiezione = document.getElementById("ScegliProiezione").value;
                    if (proiezione != null) {
                      postData("EliminaProiezione.php", {
                        proiezione: proiezione,
                      }).then((r) => {
                        boolProiezioni = 0;
                        carica();
                      });
                    }
                  }}
                >
                  Elimina
                </button>
              </form>
            }
          />
        </>
      }/>
  )
}

function Pagina(props) {
  return (
    <div className="Pagina">
      <nav className="barra navbar navbar-expand-md navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" style={{ textDecoration: "none" }}>
                <a className="nav-link" href="#">
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/gestioneFilm" style={{ textDecoration: "none" }}>
                <a className="nav-link" href="#">
                  Gestione Film
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/gestioneProiezioni" style={{ textDecoration: "none" }}>
                <a className="nav-link" href="#">
                  Gestione Proiezioni
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cercaSpettatori" style={{ textDecoration: "none" }}>
                <a className="nav-link" href="#">
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

export function Card(params) {
  const { state, dispatch } = useContext(params.contesto);

  return (
    <div className="card">
      <h5 className="card-header">{params.titolo}</h5>
      <div className="card-body">{params.bodyCard}</div>
    </div>
  );
}

function Film(params) {
  const { state, dispatch } = useContext(params.contesto);
  let film = [];

  let filmPresenti = state.film;
  filmPresenti.forEach((element, i) => {
    let titolo = element.titolo;
    film[film.length] = (
      <option value={element.titolo} key={i}>
        {titolo}
      </option>
    );
  });
  return <>{film}</>;
}

function Proiezioni(params) {
  const { state, dispatch } = useContext(params.contesto);
  let proiezioni = [];

  let disponibili = state.proiezioni;
  console.log(disponibili);
  disponibili.forEach((element, i) => {
    let stringa =
      element.titolo + " " + element.dataOra + " Sala: " + element.idSala;
    proiezioni[proiezioni.length] = (
      <option value={element.id} key={i}>
        {stringa}
      </option>
    );
  });

  return <>{proiezioni}</>;
}
