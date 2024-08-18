let hostname = location.hostname;
let host_config = {};

if(hostname === 'localhost')
{
    host_config = {
        baseApi: 'https://b876-184-22-35-139.ngrok-free.app'
    }
}else
{
    host_config = {
        baseApi: 'https://b876-184-22-35-139.ngrok-free.app'
    }
}


export const BASE_URL = host_config