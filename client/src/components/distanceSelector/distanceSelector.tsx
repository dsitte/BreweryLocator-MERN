import React from 'react'
import { FormControl, Select, MenuItem, InputLabel, Button, Grid } from '@material-ui/core'

import styles from './distanceSelector.module.css'

export class DistanceSelector extends React.Component<DistanceSelectorProps, DistanceSelectorState> {

    constructor(props: DistanceSelectorProps){
        super(props)
        this.state = {
            distance: 5
        }
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <div>
                        <Button onClick={this.onButtonClick} disabled={this.props.disabled} className={styles.button}>
                            Find Near Me
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <FormControl className={styles.select}>
                        <InputLabel id="distance-select-label">Distance</InputLabel>
                        <Select labelId="distance-select-label" value={this.state.distance} disabled={this.props.disabled} onChange={this.onSelectChange}>
                            <MenuItem value="5">5 mi</MenuItem>
                            <MenuItem value="10">10 mi</MenuItem>
                            <MenuItem value="25">25 mi</MenuItem>
                            <MenuItem value="50">50 mi</MenuItem>
                            <MenuItem value="100">100 mi</MenuItem>
                            <MenuItem value="250">250 mi</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }

    onButtonClick = () => {
        this.props.onButtonClick(this.state.distance)
    }

    onSelectChange = (event: any) => {
        let distance = event.target.value
        this.setState({
            distance
        })
    }

}

export interface DistanceSelectorProps {
    onButtonClick: (distance: number) => void
    disabled: boolean
} 

export interface DistanceSelectorState {
    distance: number
}