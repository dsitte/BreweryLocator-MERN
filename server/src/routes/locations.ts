import { Router } from 'express'
import { BreweryStore } from '../services/BreweryStore'

const router = Router();

router.get('/states', async (req, resp) => {
    let brewStore = await BreweryStore.createInstance();
    let states = await brewStore.getStates();
    resp.send(states);
})

router.get('/:state/cities', async (req, resp) => {
    let brewStore = await BreweryStore.createInstance();
    let states = await brewStore.getCities(req.params.state);
    resp.send(states);
})

export default router;