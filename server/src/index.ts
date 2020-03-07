import express from 'express'
import cors from 'cors'
import path from 'path'
import BreweryRoutes from './routes/breweries'
import LocationRoutes from './routes/locations'

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, '../../client/build')))
app.use('/api/breweries', BreweryRoutes)
app.use('/api/locations', LocationRoutes)


app.listen(8080, () => {
    console.log("Server started on port 8080");
});