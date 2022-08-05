import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route exact pathname="/" component={ Login } />
    </Switch>
  );
}

// Montando a estrutura do projeto
