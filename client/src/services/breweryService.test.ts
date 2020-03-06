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

test("Test", async () => {
    const mock = TypeMoq.Mock.ofType<AxiosInstance>()
    mock.setup(ai => ai.get(TypeMoq.It.isAnyString())).returns(() => new Promise<AxiosResponse>((res, rej) => { res(createOkResponse("This is a test")); }));

    const resp = await mock.object.get("test");

    expect(resp.data).toBe("This is a test");
})

test("onCitySelected Happy Path", async() => {
    const axios = TypeMoq.Mock.ofType<AxiosInstance>()
    axios.setup(a => a.get("/breweries/Wisconsin/Milwaukee"))
        .returns(() => 
            new Promise<AxiosResponse>(resolve => {
                resolve(createOkResponse([
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
                ]))
            })
        )
    
    const breweryService = new BreweryService(axios.object)

    const breweries = await breweryService.getBreweriesForCity("Wisconsin", "Milwaukee")

    expect(breweries).toStrictEqual<Brewery[]>([
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
    ])
})