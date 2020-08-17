import Axios from 'axios'

const baseURL =
    process.env.NODE_ENV == 'development' ?
    'http://127.0.0.1' :
    'http://121.36.37.117'
const serUrl = baseURL + ':818';
export const mobileUrl = `${baseURL}/mobileb/index/`;
export const imageStaticUrl = `${serUrl}/public/image/`;

const axios = Axios.create({
    baseURL: serUrl
})

export default axios