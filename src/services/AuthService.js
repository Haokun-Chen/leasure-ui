import decode from 'jwt-decode';
import axios from 'axios';

export default class AuthService{
    // Initializing important variables
    constructor(domain) {
        this.domain = domain || 'http://localhost:5000' // API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(email, password) {
        // Get a token from api server using the fetch api
        return axios.post(`${this.domain}/login`, {
            email,
            password
        }
        ).then(res => {
            this.setToken(res.headers['x-auth-token']); // Setting the token in localStorage
            return Promise.resolve(res);
        }).catch(res => {
            return Promise.reject(res.response.data);
        })
    }
    
    signup(firstName, lastName, email, password, phone) {
        return axios.post(`${this.domain}/user`, {
            firstName,
            lastName,
            email,
            password,
            phone
        }).then(res => {
            this.setToken(res.headers['x-auth-token']);
            return Promise.resolve(res);
        }).catch(res => {
            return Promise.reject(res.response.data);
        })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // Getting token from localstorage

        // headers['Authorization'] = 'Bearer ' + this.getToken()

        // axios.get(`${this.domain}/user/me`, {
            
        // }
        // ).then(res => {
        //     return 
        // });

        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('x-auth-token', idToken);
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('x-auth-token');
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('x-auth-token');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            const error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}