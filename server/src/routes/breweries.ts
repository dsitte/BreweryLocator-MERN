import { Router } from 'express'
import { BreweryStore } from '../services/BreweryStore'

const router = Router();


router.get("/nearme", async (req, resp) => {
    let lat = req.query.lat;
    let long = req.query.long;
    let dist = req.query.dist ? req.query.dist : 10;
    let brewStore = await BreweryStore.createInstance();
    let breweries = await brewStore.getBreweriesNearLocation(lat, long, dist);
    resp.send(breweries);
})

router.get("/search", async(req, resp) => {
    let term = req.query.term;
    let brewStore = await BreweryStore.createInstance();
    let breweries = await brewStore.searchBreweryNames(term);
    resp.send(breweries)
})

router.get("/:state", async(req, resp) => {
    let brewStore = await BreweryStore.createInstance();
    let breweries = await brewStore.getBreweries(req.params.state)
    resp.send(breweries);
})

router.get("/:state/:city", async (req, resp) => {
    let brewStore = await BreweryStore.createInstance();
    let breweries = await brewStore.getBreweries(req.params.state, req.params.city);
    resp.send(breweries);
})


export default router;