import React from 'react';
import './App.css';
import { Header } from './components/header/header';
import { BreweryLocator } from './components/breweryLocator/breweryLocator';
import { Container } from '@material-ui/core';

function App() {
  return (
    <div>
      <Header></Header>
      <Container>
        <BreweryLocator/>
      </Container>
    </div>
  );
}

export default App;
