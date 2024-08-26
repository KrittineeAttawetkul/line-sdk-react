let hostname = location.hostname;
let host_config = {};

const ngrokUrl = 'https://937e-180-180-122-99.ngrok-free.app'
const serverUrl = 'https://www.podsland.com:3998'

if (hostname === 'localhost') {
    host_config = {
        baseApi: ngrokUrl,
        suburl: '/nilecon-hr',
        apiurl: serverUrl
    }
} else {
    host_config = {
        baseApi: ngrokUrl,
        suburl: '/nilecon-hr',
        apiurl: serverUrl
    }
}


export const BASE_URL = host_config