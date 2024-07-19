import axios from 'axios';
import { BASE_URL } from '../config/HostConfig';

export const USER_ACTION = {
    getUserByUserId,
    getDummy
};

function getUserByUserId(payload) {
    return new Promise(async resolve => {
        axios.post(BASE_URL.baseApi + '/api/users', payload, {
            headers: {
                "ngrok-skip-browser-warning": "69420"
            }
        })
            .then(res => {
                console.log(res);
                resolve(res.data);
            })
            .catch(err => {
                console.log('------- getUserByUserId Error--------');
                console.log('Error: ', err);
            })
    })
}

function getDummy() {
    return new Promise(async resolve => {
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(res => {
                resolve(res.data);
                console.log('dummy: ', res);
            })
    })
}