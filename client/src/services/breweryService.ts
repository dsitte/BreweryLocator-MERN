import axios from 'axios'
import { Brewery } from '../models/brewery'

export class BreweryService {
    static async getBreweries(): Promise<Brewery[]> {
        let resp = await axios.get("/api/breweries/Wisconsin/Milwaukee/")
        return resp.data;
    }

    static async getStates(): Promise<string[]> {
        let resp = await axios.get("/api/locations/states")
        return resp.data;
    }

    static async getCities(state: string): Promise<string[]>{
        let resp = await axios.get(`/api/locations/${state}/cities`)
        return resp.data;
    }

    static async getBreweriesForState(state: string){
        let resp = await axios.get(`/api/breweries/${state}`);
        return resp.data
    }

    static async getBreweriesForCity(state: string, city: string): Promise<Brewery[]> {
        let resp = await axios.get(`/api/breweries/${state}/${city}`)
        return resp.data;
    }

    static async getBreweriesForLocation(lat: number, long: number, dist: number): Promise<Brewery[]>{
        let resp = await axios.get(`/api/breweries/nearme?lat=${lat}&long=${long}&dist=${dist}`)
        return resp.data;
    }

    static async getBreweriesForSearch(searchTerm: string): Promise<Brewery[]> {
        let resp = await axios.get(`/api/breweries/search?term=${searchTerm}`)
        return resp.data;
    }
}