let hostname = location.hostname;
let host_config = {};

if(hostname === 'localhost')
{
    host_config = {
        baseApi: 'https://b67b-125-26-202-110.ngrok-free.app'
    }
}else
{
    host_config = {
        baseApi: 'https://podsable.com:3998'
    }
}


export const BASE_URL = host_config