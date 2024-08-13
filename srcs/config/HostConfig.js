let hostname = location.hostname;
let host_config = {};

if(hostname === 'localhost')
{
    host_config = {
        baseApi: 'https://e6a8-182-52-129-170.ngrok-free.app'
    }
}else
{
    host_config = {
        baseApi: 'https://e6a8-182-52-129-170.ngrok-free.app'
    }
}


export const BASE_URL = host_config