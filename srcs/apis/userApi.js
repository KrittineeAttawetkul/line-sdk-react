import axios from 'axios'
import { BASE_URL } from '../config/HostConfig'

export const USER_ACTION = {
    GetQr
}

function GetQr(reqData) {
    return new Promise(async resolve => {
        axios.get(BASE_URL.baseApi+'/api/getallusers')
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            console.log('------- Get All Users API --------');
            console.log('Error: ', err);
        })
    })
}