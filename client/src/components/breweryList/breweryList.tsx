import React from 'react'
import { Brewery } from '../../models/brewery'
import { List, ListItem, ListItemText, ListItemIcon, Typography, ListItemSecondaryAction } from '@material-ui/core'
import styles from './breweryList.module.css'

export class BreweryList extends React.Component<BreweryListProps, {}> {

    render() { 
        return (
            <List className={styles.list_item}>
                {
                    this.props.breweries.map((brewery, index) => (
                        <ListItem>
                            <ListItemIcon>
                                <Typography>
                                    {index+1}.
                                </Typography>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        { 
                                            brewery.website_url ? (<a href={brewery.website_url}>{brewery.name}</a>) : (brewery.name)
                                        }
                                    </React.Fragment>
                                }
                                secondary={
                                    <React.Fragment>
                                        {`${brewery.street}`}
                                        <Typography color="textPrimary">
                                            {`${brewery.city}, ${brewery.state}`}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                            <ListItemSecondaryAction>
                                {brewery.distance ? `${brewery.distance.toFixed(1)} mi` : null}
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
        )
    }
}

export interface BreweryListProps {
    breweries: Brewery[];
}