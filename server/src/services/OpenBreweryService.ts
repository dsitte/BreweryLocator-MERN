import { AxiosInstance } from 'axios'
import { Brewery } from '../models/Brewery';

export class OpenBreweryService {

    constructor(private axios: AxiosInstance) {
        
    }

    async getBreweryPage(page: number): Promise<Brewery[]> {
        let resp = await this.axios.get("/breweries", {
            params: {
                per_page: 50,
                page: page
            }
        })

        return resp.data as Brewery[];
    }

    async getAllBreweries(): Promise<Brewery[]> {
        let page = 1;
        let result = await this.getBreweryPage(page);
        let allResult = result.slice(0, result.length);
        while(result.length > 0){
            result = await this.getBreweryPage(++page);
            allResult = allResult.concat(result);
        }

        return allResult;
    }
}