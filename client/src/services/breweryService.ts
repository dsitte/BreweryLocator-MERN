import { AxiosInstance, AxiosResponse } from 'axios'
import { Brewery } from '../models/brewery'
import { isNumber } from 'util';
import { Exception } from 'typemoq/_all';

export class BreweryService {

    constructor(private axios: AxiosInstance) {}
    
    async getStates(): Promise<string[]> {
        let resp = await this.axios.get("/locations/states")
        this.checkStatus(resp.status)
        return resp.data;        
    }

    async getCities(state: string): Promise<string[]>{
        let resp = await this.axios.get(`/locations/${state}/cities`)
        this.checkStatus(resp.status)
        return resp.data;
    }

    async getBreweriesForState(state: string){
        let resp = await this.axios.get(`/breweries/${state}`);
        this.checkStatus(resp.status)
        return this.mapResponseToObject(resp);
    }

    async getBreweriesForCity(state: string, city: string): Promise<Brewery[]> {
        let resp = await this.axios.get(`/breweries/${state}/${city}`)
        this.checkStatus(resp.status)
        return this.mapResponseToObject(resp);
    }

    async getBreweriesForLocation(lat: number, long: number, dist: number): Promise<Brewery[]>{
        let resp = await this.axios.get(`/breweries/nearme?lat=${lat}&long=${long}&dist=${dist}`)
        this.checkStatus(resp.status)
        return this.mapResponseToObject(resp);
    }

    async getBreweriesForSearch(searchTerm: string): Promise<Brewery[]> {
        let resp = await this.axios.get(`/breweries/search?term=${searchTerm}`)
        this.checkStatus(resp.status)
        return this.mapResponseToObject(resp);
    }

    private mapResponseToObject(resp: AxiosResponse<any[]>): Brewery[] {
        if(resp && resp.data){
            return resp.data.map<Brewery>(d => {
                let brewery: Brewery = {
                    id: d.id,
                    name: d.name,
                    brewery_type: d.brewery_type,
                    street: d.street,
                    city: d.city,
                    state: d.state,
                    postal_code: d.postal_code,
                    country: d.country,
                    phone: d.phone,
                    website_url: d.website_url
                }
                if(!isNaN(+d.longitude)){
                    brewery.longitude = +d.longitude
                }
                if(!isNaN(+d.latitude)){
                    brewery.latitude = +d.latitude
                }
                if(!isNaN(+d.distance)){
                    brewery.distance = +d.distance
                }
                return brewery
            })
        }
        return []
    }

    private checkStatus = (status: number) => { if(status < 200 || status >= 400) throw "An unknown error occurred." }
}