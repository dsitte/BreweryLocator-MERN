import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React from 'react';

export class Header extends React.Component {
    render(){
        return (
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6">
                        Brewery Locator
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}