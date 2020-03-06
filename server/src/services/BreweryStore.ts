import { Brewery } from '../models/Brewery'
import { isNumber } from "util";
import { IIndexable } from "../util/indexable";
import { MongoClient, Db } from 'mongodb';
import haversine from "haversine";
import { env } from 'process';

export class BreweryStore {

    static async createInstance(): Promise<BreweryStore> {
        let mongoHost = env.MONGO_HOST ? env.MONGO_HOST : 'localhost'
        let mongo = await MongoClient.connect(`mongodb://root:example@${mongoHost}:27017`)
        return new BreweryStore(mongo.db("brewery"));
    }
    
    constructor(private db: Db) {
        
    }

    public async batchInsertBrewery(breweries: Brewery[]): Promise<any>{
        await this.db.collection("brewery").insertMany(breweries);
    }

    public async insertBrewery(brewery: Brewery): Promise<any> {
        await this.db.collection("brewery").insertOne(brewery);
    }

    public async getStates(): Promise<string[]> {
        return (<string[]> await this.db
            .collection("brewery")
            .distinct("state"))
            .filter(s => s); //remove null
    }

    public async getCities(state: string): Promise<string[]> {
        return (<string[]> await this.db
            .collection("brewery")
            .distinct("city", { state }))
            .filter(s => s);
    }

    public async getBreweries(state?: string, city?: string): Promise<Brewery[]>{
        let query: any = {};
        if(state) query["state"] = state;
        if(city) query["city"] = city;

        return this.db
            .collection("brewery")
            .find<Brewery>(query)
            .toArray()
    }

    //Thought I might be able to find an inverse haversine library, but it didn't seem to exist. This could 
    //definitely be optimized by querying the db for a range of lat and long instead of calculating the distance
    //of every lat/long in the db. 
    public async getBreweriesNearLocation(lat: number, long: number, dist: number): Promise<Brewery[]>{
        let locations = await this.db
            .collection("brewery")
            .find({}, {projection: { latitude: 1, longitude: 1, id: 1}})
            .toArray()

        let distances = locations
            .map(loc => {
                let distance = haversine(
                    {latitude: lat, longitude: long}, 
                    {latitude: loc.latitude, longitude: loc.longitude}, 
                    {unit: "mile"}
                );

                return { distance, ...loc };
            })
            .filter(loc => loc.distance <= dist);
        
        let ids = distances.map(dist => dist.id);

        let breweries = await this.db
                .collection("brewery")
                .find<Brewery>({id: {$in: ids}})
                .toArray();
        
        return breweries.map(brew => ({...brew, distance: distances.find(b => b.id === brew.id).distance}));
    }

    public async searchBreweryNames(term: string): Promise<Brewery[]>{
        return this.db.collection("brewery")
            .find<Brewery>({name: {'$regex': `.*${term}.*`, '$options': 'i'}}, {limit: 50})
            .toArray();
    }

    public async getBrewery(id: number): Promise<Brewery> {
        let brewery = await this.db
            .collection("brewery")
            .findOne<Brewery>({id})
        return brewery as Brewery;
    }



}