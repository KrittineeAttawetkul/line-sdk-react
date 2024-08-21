let hostname = location.hostname;
let host_config = {};

if (hostname === 'localhost') {
    host_config = {
        baseApi: 'https://0934-49-228-101-140.ngrok-free.app',
        suburl:'/nilecon-hr'
    }
} else {
    host_config = {
        baseApi: 'https://0934-49-228-101-140.ngrok-free.app',
        suburl:'/nilecon-hr'
    }
}


export const BASE_URL = host_config