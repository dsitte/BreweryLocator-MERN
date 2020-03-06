import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './components/header/header';
import { BreweryList } from './components/breweryList/breweryList';
import { CitySelector } from './components/citySelector/citySelector';
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
