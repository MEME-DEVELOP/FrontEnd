import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Auth0Provider
        domain="meme-dev.us.auth0.com"
        clientId="Au6FoiFZQFzJdQmoVlB1uC0JLSOEi86p"
        redirectUri={window.location.origin + "/Home" } >
      <App />
    </Auth0Provider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
