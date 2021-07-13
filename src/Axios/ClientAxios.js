import axios from 'axios';

const REACT_APP_API_URL = 'http://localhost:4000';

const axiosClient = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },

});

axiosClient.interceptors.request.use((config) => {
  const getLocalToken = localStorage.getItem('accessToken');
  if (getLocalToken) {
    config.headers.Authorization = `Bearer ${getLocalToken}`;
  }
  return config;
}, function error() {
  return Promise.reject(error);
});

axiosClient.interceptors.response.use((response) => {
//   if (response && response.data) {
//     return response.data;
//   }
  return response;
}, (error) => {
    return new Promise((resolve) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('refreshToken')
        if (error.response && error.response.status === 401 && error.config  && refreshToken) {
          console.log(error.config);
          const response = fetch("http://localhost:4000/auth/token", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refreshToken: refreshToken,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
               originalRequest.headers.Authorization = "Bearer " + res.body.tokenAccess
               console.log(res);
               console.log(error.config);
               localStorage.removeItem('accessToken')
               localStorage.setItem('accessToken',res.body.tokenAccess)
              return axios(originalRequest)
            })
            .catch(error =>{
                // console.log(error);
                // localStorage.removeItem('accessToken');
                // localStorage.removeItem('refreshToken');
                // alert("Hết phiên đăng nhập");
                window.location = "/dang-xuat";

                return error
                
            })
           resolve(response);
        }
  
        return Promise.reject(error)
      })
});


export default axiosClient;