

import AxiosClient from '../../Axios/ClientAxios';


export const createClient = (body)=>{
    return AxiosClient.post("auth/create" , body)
}
export const login = (body) =>{
    return AxiosClient.post("auth/login" , body)
}

export const createEmployee = (body) =>{
    return AxiosClient.post("auth/createemployee" , body)
}

export const adminCreateEmployee = (body) =>{
    return AxiosClient.post("auth/admincreateaccount" , body)
}

