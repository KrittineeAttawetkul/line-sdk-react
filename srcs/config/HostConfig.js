let hostname = location.hostname;
let host_config = {};

if(hostname === 'localhost')
{
    host_config = {
        baseApi: 'https://37e4-184-22-34-185.ngrok-free.app'
    }
}
else if(hostname === '')
{
    host_config = {
        baseApi: ''
    }
}

export const BASE_URL = host_config