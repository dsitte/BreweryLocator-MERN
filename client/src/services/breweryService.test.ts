import * as TypeMoq from 'typemoq'
import { AxiosInstance, AxiosResponse } from 'axios'
import { BreweryService } from './breweryService'
import { Brewery } from '../models/brewery'

const createOkResponse = (data: any): AxiosResponse => {
    return {
        data,
        status: 200,
        statusText: "Ok",
        config: {},
        headers: {}
    }
}

const errorResponse: AxiosResponse = {
    status: 500,
    statusText: "Internal Server Error",
    config: {},
    headers: {},
    data: null
}

const testBreweryResponse: AxiosResponse = createOkResponse([
    {
        "_id": "5e610970768cea0012dce464",
        "id": 7855,
        "name": "Good City Brewing Company",
        "brewery_type": "brewpub",
        "street": "2108 N Farwell Ave",
        "city": "Milwaukee",
        "state": "Wisconsin",
        "postal_code": "53202-1115",
        "country": "United States",
        "longitude": "-87.8889038",
        "latitude": "43.0565468",
        "phone": "4145394173",
        "website_url": "http://www.goodcitybrewing.com",
        "updated_at": "2018-08-24T16:43:18.152Z",
        "tag_list": []
    },
    {
        "_id": "5e610970768cea0012dce468",
        "id": 7897,
        "name": "MobCraft Beer",
        "brewery_type": "proprietor",
        "street": "505 S 5th St",
        "city": "Milwaukee",
        "state": "Wisconsin",
        "postal_code": "53204-1518",
        "country": "United States",
        "longitude": "-87.916937387519",
        "latitude": "43.0261838359198",
        "phone": "6083463003",
        "website_url": "http://www.mobcraftbeer.com",
        "updated_at": "2018-08-24T16:44:20.439Z",
        "tag_list": []
    }
])

const testBreweryList: Brewery[] = [
    {
        id: 7855,
        name: "Good City Brewing Company",
        brewery_type: "brewpub",
        street: "2108 N Farwell Ave",
        city: "Milwaukee",
        state: "Wisconsin",
        postal_code: "53202-1115",
        country: "United States",
        longitude:  -87.8889038,
        latitude: 43.0565468,
        phone: "4145394173",
        website_url: "http://www.goodcitybrewing.com"
    },
    {
        id: 7897,
        name: "MobCraft Beer",
        brewery_type: "proprietor",
        street: "505 S 5th St",
        city: "Milwaukee",
        state: "Wisconsin",
        postal_code: "53204-1518",
        country: "United States",
        longitude:  -87.916937387519,
        latitude: 43.0261838359198,
        phone: "6083463003",
        website_url: "http://www.mobcraftbeer.com"
    }
]

const errorMessage = "An unknown error occurred.";

test("getStates Happy Path", async() => {
    const axios = TypeMoq.Mock.ofType<AxiosInstance>()
    axios.setup(a => a.get("/locations/states"))
        .returns(() => Promise.resolve<AxiosResponse>(
            createOkResponse([
                "Wisconsin",
                "Illinois"
            ])
        ))
    
    let breweryService = new BreweryService(axios.object)

    let states = await breweryService.getStates()

    expect(states).toStrictEqual<string[]>(["Wisconsin", "Illinois"])
})

test("getStates Error Response", async () => {
    expect.assertions(1)

    const axios = TypeMoq.Mock.ofType<AxiosInstance>()
    axios.setup(a => a.get("/locations/states"))
        .returns(() => Promise.resolve<AxiosResponse>(errorResponse))

    let breweryService = new BreweryService(axios.object)

    try{
        await breweryService.getStates()
    }catch(e){
        expect(e).toEqual(errorMessage)
    }
})

test("getCities Happy Path", async() => {
    const axios = TypeMoq.Mock.ofType<AxiosInstance>()
    axios.setup(a => a.get("/locations/Wisconsin/cities"))
        .returns(() => Promise.resolve<AxiosResponse>(
            createOkResponse([
                "Milwaukee",
                "Green Bay"
            ])
        ))
    
    let breweryService = new BreweryService(axios.object)

    let cities = await breweryService.getCities("Wisconsin")

    expect(cities).toStrictEqual<string[]>(["Milwaukee", "Green Bay"])
})

test("getCities Error Response", async() => {
    expect.assertions(1)

    const axios = TypeMoq.Mock.ofType<AxiosInstance>()
    axios.setup(a => a.get("/locations/Wisconsin/cities"))
        .returns(() => Promise.resolve<AxiosResponse>(errorResponse))

    let breweryService = new BreweryService(axios.object)

    try{
        await breweryService.getCities("Wisconsin");
    }
    catch(e){
        expect(e).toEqual(errorMessage)
    }
})

test("getBreweriesForState Happy Path", async() => {
    const axios = TypeMoq.Mock.ofType<AxiosInstance>();
    axios.setup(a => a.get("/breweries/Wisconsin"))
        .returns(() => Promise.resolve(testBreweryResponse))
    
    let breweryService = new BreweryService(axios.object)

    let breweries = await breweryService.getBreweriesForState("Wisconsin")

    expect(breweries).toStrictEqual<Brewery[]>(testBreweryList)
})

test("getBreweriesForState Error Response", async() => {
    expect.assertions(1)

    const axios = TypeMoq.Mock.ofType<AxiosInstance>();
    axios.setup(a => a.get("/breweries/Wisconsin"))
        .returns(() => Promise.resolve(errorResponse))

    let breweryService = new BreweryService(axios.object)

    try{
        await breweryService.getBreweriesForState("Wisconsin")
    }catch(e){
        expect(e).toEqual(errorMessage)
    }
})

test("getBreweriesForCity Happy Path", async() => {
    const axios = TypeMoq.Mock.ofType<AxiosInstance>()
    axios.setup(a => a.get("/breweries/Wisconsin/Milwaukee"))
        .returns(() => Promise.resolve(testBreweryResponse))
    
    const breweryService = new BreweryService(axios.object)

    const breweries = await breweryService.getBreweriesForCity("Wisconsin", "Milwaukee")

    expect(breweries).toStrictEqual<Brewery[]>(testBreweryList)
})

test("getBreweriesForCity Error Response", async() => {
    expect.assertions(1)

    const axios = TypeMoq.Mock.ofType<AxiosInstance>()
    axios.setup(a => a.get("/breweries/Wisconsin/Milwaukee"))
        .returns(() => Promise.resolve(errorResponse))

    let breweryService = new BreweryService(axios.object)

    try{
        await breweryService.getBreweriesForCity("Wisconsin", "Milwaukee")
    }catch(e){
        expect(e).toEqual(errorMessage)
    }
})

test("getBreweriesForLocation Happy Path", async() => {
    let locationTestBreweryResponse: AxiosResponse = JSON.parse(JSON.stringify(testBreweryResponse))
    locationTestBreweryResponse.data[0].distance = "4.1"
    locationTestBreweryResponse.data[1].distance = "1.2"

    let locationTestBreweryList: Brewery[] = JSON.parse(JSON.stringify(testBreweryList))
    locationTestBreweryList[0].distance = 4.1
    locationTestBreweryList[1].distance = 1.2

    const axios = TypeMoq.Mock.ofType<AxiosInstance>();
    axios.setup(a => a.get("/breweries/nearme?lat=10&long=10&dist=10"))
        .returns(() => Promise.resolve(locationTestBreweryResponse))
    
    let breweryService = new BreweryService(axios.object)

    let breweries = await breweryService.getBreweriesForLocation(10, 10, 10)
    
    expect(breweries).toStrictEqual<Brewery[]>(locationTestBreweryList)
})

test("getBreweriesForLocation Error Response", async () => {
    expect.assertions(1)

    const axios = TypeMoq.Mock.ofType<AxiosInstance>()
    axios.setup(a => a.get("/breweries/nearme?lat=10&long=10&dist=10"))
        .returns(() => Promise.resolve(errorResponse))

    let breweryService = new BreweryService(axios.object)

    try{
        await breweryService.getBreweriesForLocation(10, 10, 10)
    }catch(e){
        expect(e).toEqual(errorMessage)
    }

})

test("getBreweriesForSearch Happy Path", async() => {
    const axios = TypeMoq.Mock.ofType<AxiosInstance>();
    axios.setup(a => a.get("/breweries/search?term=test"))
        .returns(() => Promise.resolve(testBreweryResponse))

    let breweryService = new BreweryService(axios.object)

    let breweries = await breweryService.getBreweriesForSearch("test")

    expect(breweries).toStrictEqual<Brewery[]>(testBreweryList)
})

test("getBreweriesForSearch Error Response", async() => {
    expect.assertions(1)

    const axios = TypeMoq.Mock.ofType<AxiosInstance>()
    axios.setup(a => a.get("/breweries/search?term=test"))
        .returns(() => Promise.resolve(errorResponse))
    
    let breweryService = new BreweryService(axios.object)

    try{
        await breweryService.getBreweriesForSearch("test")
    }catch(e){
        expect(e).toEqual(errorMessage)
    }
})