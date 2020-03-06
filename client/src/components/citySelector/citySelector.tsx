import React from 'react'
import { Select, MenuItem, InputLabel, FormControl, Grid } from '@material-ui/core'

import styles from './citySelector.module.css'

export class CitySelector extends React.Component<CitySelectorProps, {}> {

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <FormControl variant="outlined" className={styles.select}>
                        <InputLabel id="state-select-label">State</InputLabel>
                        <Select fullWidth={true} labelId="state-select-label" value={this.props.selectedState} onChange={this.onStateSelected} 
                            disabled={this.props.stateDisabled} labelWidth={40}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                this.props.states.map(state => (
                                    <MenuItem value={state}>{state}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined" className={styles.select}>
                        <InputLabel id="city-select-label">City</InputLabel>
                        <Select fullWidth={true} labelId="city-select-label" value={this.props.selectedCity} onChange={this.onCitySelected} 
                            disabled={this.props.cityDisabled} labelWidth={30}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                this.props.cities.map(city => (
                                    <MenuItem value={city}>{city}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }

    onStateSelected = async (event: any) => {
        let selectedState = event.target.value;
        if(selectedState && selectedState.length > 0){
            this.props.onStateSelected(selectedState)
        }
    }

    onCitySelected = (event: any) => {
        let selectedCity = event.target.value
        if(selectedCity && selectedCity.length > 0){
            this.props.onCitySelected(selectedCity)
        }
    }

}

export interface CitySelectorProps {
    onCitySelected: (city: string) => void
    onStateSelected: (state: string) => void
    states: string[]
    cities: string[]
    selectedState?: string
    selectedCity?: string
    cityDisabled: boolean
    stateDisabled: boolean
}