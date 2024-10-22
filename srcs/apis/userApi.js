import axios from 'axios';
import { BASE_URL } from '../config/HostConfig';

export const USER_ACTION = {
    getDummy,
    getCardByUserId,
    getQrByUserId,
    Register,
    getProfile,
    transferPoint,
    historyTransfer,
    balanceRanking,
    allReward,
    getRewardByReward_id,
    RewardRedeem,
};

function getCardByUserId(payload) {
    return new Promise(async resolve => {
        axios.post(`${BASE_URL.baseApi}/api/member`, payload)
            .then(res => {
                console.log('API getCardByUserId', res);
                resolve(res.data);
            })
            .catch(err => {
                console.log('------- getCardByUserId Error--------');
                console.log('Error: ', err);
            })
    })
}

function getQrByUserId(payload) {
    return new Promise(async resolve => {
        axios.post(`${BASE_URL.baseApi}/api/qr`, payload)
            .then(res => {
                console.log('API getQrByUserId', res);
                resolve(res.data);
            })
            .catch(err => {
                console.log('------- getQrByUserId Error--------');
                console.log('Error: ', err);
            })
    })
}

function Register(payload) {
    return new Promise(async resolve => {
        axios.post(`${BASE_URL.baseApi}/api/register`, payload)
            .then(res => {
                console.log('API Register', res);
                resolve(res.data);
            })
            .catch(err => {
                console.log('------- checkTel Error--------');
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

function getProfile(payload) {
    return new Promise(async resolve => {
        axios.post(`${BASE_URL.baseApi}/api/getprofile`, payload)
            .then(res => {
                console.log('API getProfile', res);
                resolve(res.data);
            })
            .catch(err => {
                console.log('------- getProfile Error--------');
                console.log('Error: ', err);
            })
    })
}

function transferPoint(payload) {
    return new Promise(async resolve => {
        axios.post(`${BASE_URL.baseApi}/api/transfer`, payload)
            .then(res => {
                console.log('API transferPoint', res);
                resolve(res.data);
            })
            .catch(err => {
                console.log('------- transferPoint Error--------');
                console.log('Error: ', err);
            })
    })
}

function historyTransfer(payload) {
    return new Promise(async resolve => {
        axios.post(`${BASE_URL.baseApi}/api/history`, payload)
            .then(res => {
                console.log('API historyTransfer', res);
                resolve(res.data);
            })
            .catch(err => {
                console.log('------- historyTransfer Error--------');
                console.log('Error: ', err);
            })
    })
}

function balanceRanking(payload) {
    return new Promise(async resolve => {
        axios.post(`${BASE_URL.baseApi}/api/ranking`, payload)
            .then(res => {
                console.log('API balanceRanking', res);
                resolve(res.data);
            })
            .catch(err => {
                console.log('------- balanceRanking Error--------');
                console.log('Error: ', err);
            })
    })
}

function allReward(payload) {
    return new Promise(async resolve => {
        axios.post(`${BASE_URL.baseApi}/api/allreward`, payload)
            .then(res => {
                console.log('API allReward', res);
                resolve(res.data);
            })
            .catch(err => {
                console.log('------- allReward Error--------');
                console.log('Error: ', err);
            })
    })
}

function getRewardByReward_id(payload) {
    return new Promise(async resolve => {
        axios.post(`${BASE_URL.baseApi}/api/getreward`, payload)
            .then(res => {
                console.log('API getreward', res);
                resolve(res.data);
            })
            .catch(err => {
                console.log('------- getreward Error--------');
                console.log('Error: ', err);
            })
    })
}

function RewardRedeem(payload) {
    return new Promise(async resolve => {
        axios.post(`${BASE_URL.baseApi}/api/redeem`, payload)
            .then(res => {
                console.log('API RewardRedeem', res);
                resolve(res.data);
            })
            .catch(err => {
                console.log('------- RewardRedeem Error--------');
                console.log('Error: ', err);
            })
    })
}
