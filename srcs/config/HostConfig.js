let hostname = location.hostname;
let host_config = {};

if (hostname === 'localhost') {
    host_config = {
        baseApi: 'https://www.podsland.com:3998',
        suburl: '/nilecon-hr'
    }
} else {
    host_config = {
        baseApi: 'https://www.podsland.com:3998',
        suburl: '/nilecon-hr'
    }
}


export const BASE_URL = host_config