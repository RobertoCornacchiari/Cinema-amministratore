import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './App';

import './style.scss';

import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  rootElement
);