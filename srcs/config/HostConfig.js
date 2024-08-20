let hostname = location.hostname;
let host_config = {};

if (hostname === 'localhost') {
    host_config = {
        baseApi: 'https://cf22-118-175-138-200.ngrok-free.app',
        suburl:'/nilecon-hr'
    }
} else {
    host_config = {
        baseApi: 'https://cf22-118-175-138-200.ngrok-free.app',
        suburl:'/nilecon-hr'
    }
}


export const BASE_URL = host_config