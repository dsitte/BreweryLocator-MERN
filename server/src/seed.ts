//Seed db with data
import { MongoClient } from 'mongodb';
import { BreweryStore } from './services/BreweryStore';

import * as Axios from 'axios'
import { OpenBreweryService } from './services/OpenBreweryService';
import { env } from 'process';

export const SeedDB = async () => {
    console.log("Beginning DB seed");

    let axiosInstance = Axios.default.create({
        baseURL: "https://api.openbrewerydb.org/"
    })

    let mongo: MongoClient | null = null;
    let retryCount = 0;
    let mongoHost = env.MONGO_HOST ? env.MONGO_HOST : 'localhost'
    while(!mongo){
        try{
            mongo = await MongoClient.connect(`mongodb://root:example@${mongoHost}:27017`)
        }catch(e){
            console.log("Failed to connect to mongodb, retrying...")
        }
        retryCount++
        if(retryCount > 20){
            throw "Mongodb did not become available in a reasonable time."
        }

        await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    let databases = await mongo.db("admin").admin().listDatabases();
    if(databases.databases.some((d: any) => d.name === "brewery")){
        let brewCount = await mongo.db("brewery").collection("brewery").count()
        if(brewCount > 0){
            console.log("Database is already seeded. Exiting.")
            return;
        }
    }

    let openBrewServ = new OpenBreweryService(axiosInstance);
    let brewStore = new BreweryStore(mongo.db("brewery"));

    let breweries = await openBrewServ.getAllBreweries();
    await brewStore.batchInsertBrewery(breweries);

    console.log("Seed complete.");
}

