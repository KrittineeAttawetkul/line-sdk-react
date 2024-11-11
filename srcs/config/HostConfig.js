let hostname = location.hostname;
let host_config = {};

if (hostname === 'localhost') {
    host_config = {
        baseApi: `${import.meta.env.VITE_BASE_API}`,
        suburl: `${import.meta.env.VITE_SUB_URL}`
    }
} else {
    host_config = {
        baseApi: `${import.meta.env.VITE_BASE_API}`,
        suburl: `${import.meta.env.VITE_SUB_URL}`
    }
}


export const BASE_URL = host_config