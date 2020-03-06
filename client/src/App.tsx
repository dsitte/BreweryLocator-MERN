import React from 'react';
import './App.css';
import { Header } from './components/header/header';
import { BreweryLocator } from './components/breweryLocator/breweryLocator';
import { Container } from '@material-ui/core';
import axios from 'axios'
import { BreweryService } from './services/breweryService'

function App() {

  let axiosInstance = axios.create({
    baseURL: "/api"
  });
  let breweryService = new BreweryService(axiosInstance);

  return (
    <div>
      <Header></Header>
      <Container>
        <BreweryLocator breweryService={breweryService}/>
      </Container>
    </div>
  );
}

export default App;
