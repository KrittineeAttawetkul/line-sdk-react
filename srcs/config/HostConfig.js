let hostname = location.hostname;
let host_config = {};

if(hostname === 'localhost')
{
    host_config = {
        baseApi: 'https://5d54-118-175-206-107.ngrok-free.app'
    }
}else
{
    host_config = {
        baseApi: 'https://5d54-118-175-206-107.ngrok-free.app'
    }
}


export const BASE_URL = host_config