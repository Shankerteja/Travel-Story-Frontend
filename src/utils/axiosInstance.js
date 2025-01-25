import { BASE_URL } from "./constants";
import axios from 'axios'
const axoisInstance=axios.create({
    baseURL:BASE_URL,
    timeout:10000,
    headers:{
        "Content-type":'application/json'
    }
})

axoisInstance.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem('token')
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default axoisInstance