import React from 'react';
import './App.css';
import { Header } from './components/header/header';
import { BreweryLocator } from './components/breweryLocator/breweryLocator';
import { Container } from '@material-ui/core';
import axios from 'axios'
import { BreweryService } from './services/breweryService'

function App() {

  //Moving handling of error response to BreweryService
  let axiosInstance = axios.create({
    baseURL: "/api",
    validateStatus: () => true
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
