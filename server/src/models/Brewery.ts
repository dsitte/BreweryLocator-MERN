//TODO: Use _id instead of id for mongo PK
export class Brewery {
    name?: string;
    breweryType?: string;
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    longitude?: number;
    latitude?: number;
    phone?: string;
    websiteUrl?: string;
    updatedAt?: string;
    distance?: number

    constructor(public id: number) {

    }
}