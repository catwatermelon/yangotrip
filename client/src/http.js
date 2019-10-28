import axios from 'axios'
import { Toast } from 'mand-mobile'
import router from './router/index.js'

axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        // Bearer是JWT的认证头部信息
        config.headers.common['Authorization'] = 'Bearer ' + token;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);


axios.interceptors.response.use( 
    response=>{
      // console.log(response)
      return response;
    },
    error => {
        const { status } = error.response;
        console.log(status)
        if( status == 401 ) {
            Toast.failed("Token 失效，请重新登录!");
            localStorage.removeItem('token');
            router.push('/login');
        }
    }
)

export default axios;

  