import React from 'react'
import { CitySelector } from '../citySelector/citySelector'
import { BreweryService } from '../../services/breweryService'
import { Brewery } from '../../models/brewery';
import { BreweryList } from '../breweryList/breweryList';
import { Grid, LinearProgress } from '@material-ui/core';
import { DistanceSelector } from '../distanceSelector/distanceSelector';
import styles from './breweryLocator.module.css'
import { Search } from '../search/search';

export class BreweryLocator extends React.Component<BreweryLocatorProps, BreweryLocatorState> {

    private breweryService: BreweryService 

    constructor(props: Readonly<BreweryLocatorProps>) {
        super(props);
        this.breweryService = props.breweryService; 
        this.state = {
            states: [],
            cities: [],
            breweries: [],
            loading: false
        }
    }

    async componentDidMount(){
        let states = await this.breweryService.getStates();
        this.setState({
            states
        })
    }

    render() {
        return (
            <div className={styles.brewery_locator}>
                <Grid container spacing={3}> 
                    <Grid item xs={12}>
                        { this.state.loading? <LinearProgress variant="query"/> : null }
                    </Grid>
                    <Grid item xs={4} className={styles.seperator}>
                        <CitySelector onCitySelected={this.onCitySelected} onStateSelected={this.onStateSelected} cities={this.state.cities} 
                            states={this.state.states} selectedCity={this.state.selectedCity} selectedState={this.state.selectedState} 
                            stateDisabled={this.state.loading} cityDisabled={this.state.loading || this.state.cities.length === 0} />
                    </Grid>
                    <Grid item xs={4} className={styles.seperator}>
                        <DistanceSelector onButtonClick={this.onDistanceButtonClicked} disabled={this.state.loading}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Search onSearchSubmit={this.onSearchSubmit} />
                    </Grid>
                    <Grid item xs={12}>
                        <BreweryList breweries={this.state.breweries}></BreweryList>
                    </Grid>
                </Grid>
            </div>
        )
    }

    onCitySelected = async (city: string) => {
        this.setState({
            loading: true,
            breweries: []
        })
        let breweries = await this.breweryService.getBreweriesForCity(this.state.selectedState!, city)
        breweries.sort((a,b) => a.name?.localeCompare(b.name!) ?? -1)
        this.setState({
            selectedCity: city,
            breweries,
            loading: false
        })
    }

    onStateSelected = async (state: string) => {
        this.setState({
            loading: true,
            breweries: []
        })
        let cities = await this.breweryService.getCities(state)
        let breweries = await this.breweryService.getBreweriesForState(state);
        breweries.sort((a: Brewery,b: Brewery) => a.name?.localeCompare(b.name!) ?? -1)
        this.setState({
            cities,
            selectedState: state,
            breweries,
            loading: false
        })
    }

    onDistanceButtonClicked = async (distance: number) => {
        this.setState({
            loading: true,
            selectedCity: "",
            selectedState: "",
            breweries: []
        })
        let location = await new Promise<Position>((resolve, reject) => {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position => {
                    resolve(position)
                }, err => reject(err))
            }else{
                reject("Geolocation not supported by browser")
            }
        })

        let breweries = await this.breweryService.getBreweriesForLocation(location.coords.latitude, location.coords.longitude, distance)
        breweries.sort((a, b) => a.distance! - b.distance!)
        this.setState({
            breweries,
            loading: false
        })
    }

    onSearchSubmit = async (searchTerm: string) => {
        this.setState({
            loading: true,
            breweries: []
        })

        let breweries = await this.breweryService.getBreweriesForSearch(searchTerm);
        breweries.sort((a,b) => a.name?.localeCompare(b.name!) ?? -1)
        this.setState({
            breweries,
            loading: false
        })
    }
}

export interface BreweryLocatorState {
    states: string[]
    cities: string[]
    selectedState?: string
    selectedCity?: string
    breweries: Brewery[]
    loading: boolean
}

export interface BreweryLocatorProps {
    breweryService: BreweryService
}