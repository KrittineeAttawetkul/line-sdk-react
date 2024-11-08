let hostname = location.hostname;
let host_config = {};

if (hostname === 'localhost') {
    host_config = {
        baseApi: 'https://line-sdk.onrender.com',
        // suburl: process.env.SUB_URL

        // baseApi: process.env.BASE_API,
        // suburl: process.env.SUB_URL
    }
} else {
    host_config = {
        baseApi: process.env.BASE_API,
        suburl: process.env.SUB_URL
    }
}


export const BASE_URL = host_config