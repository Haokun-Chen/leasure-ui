import axios from 'axios';

export default class ListingsService {
    constructor (domain) {
        this.domain = domain || 'http://localhost:5000' // API server domain
        this.get = this.get.bind(this)
    }

    get(location, checkin, checkout) {
        return axios.get(`${this.domain}/listings?checkin=${checkin.format("YYYY-MM-DD")}&checkout=${checkout.format("YYYY-MM-DD")}`)
        .then(res => {
            return Promise.resolve(res);
        }).catch(res => {
            return Promise.reject(res.response.data);
        })
    }

    post(token, title, rooms, baths, bathType, rent, description, moveInDate, moveOutDate) {
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': token
        }
        return axios.post(`${this.domain}/listings`, {
            title,
            rooms,
            baths,
            bathType,
            rent,
            description,
            moveInDate,
            moveOutDate
        },  {headers: headers})
        .then(res => {
            return Promise.resolve(res);
        }).catch(res => {
            return Promise.reject(res.response.data);
        })
    }
}