import React from 'react';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import { Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <Switch>
      <Route exact pathname="/" component={ Login } />
    </Switch>
  );
}

// Montando a estrutura do projeto
