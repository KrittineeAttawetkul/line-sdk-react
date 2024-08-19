let hostname = location.hostname;
let host_config = {};

if (hostname === 'localhost') {
    host_config = {
        baseApi: 'https://5415-182-52-129-144.ngrok-free.app',
        suburl:'/nilecon-hr'
    }
} else {
    host_config = {
        baseApi: 'https://5415-182-52-129-144.ngrok-free.app',
        suburl:'/nilecon-hr'
    }
}


export const BASE_URL = host_config