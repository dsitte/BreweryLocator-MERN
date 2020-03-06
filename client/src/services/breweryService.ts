import { AxiosInstance } from 'axios'
import { Brewery } from '../models/brewery'

export class BreweryService {

    constructor(private axios: AxiosInstance) {}
    
    async getBreweries(): Promise<Brewery[]> {
        let resp = await this.axios.get("/breweries/Wisconsin/Milwaukee/")
        return resp.data;
    }

    async getStates(): Promise<string[]> {
        let resp = await this.axios.get("/locations/states")
        return resp.data;
    }

    async getCities(state: string): Promise<string[]>{
        let resp = await this.axios.get(`/locations/${state}/cities`)
        return resp.data;
    }

    async getBreweriesForState(state: string){
        let resp = await this.axios.get(`/breweries/${state}`);
        return resp.data
    }

    async getBreweriesForCity(state: string, city: string): Promise<Brewery[]> {
        let resp = await this.axios.get(`/breweries/${state}/${city}`)
        return resp.data;
    }

    async getBreweriesForLocation(lat: number, long: number, dist: number): Promise<Brewery[]>{
        let resp = await this.axios.get(`/breweries/nearme?lat=${lat}&long=${long}&dist=${dist}`)
        return resp.data;
    }

    async getBreweriesForSearch(searchTerm: string): Promise<Brewery[]> {
        let resp = await this.axios.get(`/breweries/search?term=${searchTerm}`)
        return resp.data;
    }
}