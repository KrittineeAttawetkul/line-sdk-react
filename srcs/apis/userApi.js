import axios from 'axios';
import { BASE_URL } from '../config/HostConfig';

export const USER_ACTION = {
    getUserByUserId,
    getDummy
};

function getUserByUserId(user_id) {
    return new Promise(async resolve => {
        axios.get(BASE_URL.baseApi+'/api/users/'+user_id, {})
            .then(res => {
                console.log(res);
                resolve(res.data);
            })
            .catch(err => {
                console.log('------- Get User Data --------');
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