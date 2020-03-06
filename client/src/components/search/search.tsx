import React from 'react'
import { TextField } from '@material-ui/core'

import styles from './search.module.css'

export class Search extends React.Component<SearchProps, SearchState> {

    constructor(props: SearchProps){
        super(props);
        this.state = {
            searchText: ""
        }
    }

    render() {
        return (
            <TextField id="outlined-search" label="Search field" type="search" variant="outlined" onKeyPressCapture={this.onKeyPressCapture} 
                onChange={this.onSearchTextChange} className={styles.search}/>
        )
    }

    onSearchTextChange = (event: any) => {
        this.setState({
            searchText: event.target.value
        })
    }

    onKeyPressCapture = (event: any) => {
        if(event.key === "Enter" && this.state.searchText.length > 0){
            this.props.onSearchSubmit(this.state.searchText);
        }
    }
}

export interface SearchState {
    searchText: string;
}

export interface SearchProps {
    onSearchSubmit: (term: string) => void
}