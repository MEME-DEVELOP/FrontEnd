
import React from 'react';
import './App.css';
import logo from './logo.svg';
import LoginButton from '../components/LoginButton';

const HomePrueba = () => {
  
    return (
        <div>
        <h1>Hola Mundo</h1>
        <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            
                <LoginButton />

            </header>
        </div>
        </div>
    );
  };
  
  export default HomePrueba;