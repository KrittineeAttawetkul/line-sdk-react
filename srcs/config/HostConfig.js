let hostname = location.hostname;
let host_config = {};

if(hostname === 'localhost')
{
    host_config = {
        baseApi: 'https://podsable.com:3998'
    }
}else
{
    host_config = {
        baseApi: 'https://podsable.com:3998'
    }
}


export const BASE_URL = host_config