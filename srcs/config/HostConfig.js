let hostname = location.hostname;
let host_config = {};

const ngrokUrl = 'https://704e-49-228-101-140.ngrok-free.app' 

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