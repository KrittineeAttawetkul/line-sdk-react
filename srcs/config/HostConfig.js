let hostname = location.hostname;
let host_config = {};

const ngrokUrl = 'https://b951-118-175-205-86.ngrok-free.app' 

if (hostname === 'localhost') {
    host_config = {
        baseApi: ngrokUrl,
        suburl:'/nilecon-hr'
    }
} else {
    host_config = {
        baseApi: ngrokUrl,
        suburl:'/nilecon-hr'
    }
}


export const BASE_URL = host_config