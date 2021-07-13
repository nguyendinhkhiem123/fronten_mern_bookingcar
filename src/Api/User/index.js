import AxiosClient from '../../Axios/ClientAxios';


export const getOneUser = ()=>{
    return AxiosClient.get("user/getone");
}
export const updateUser =(body)=>{
    return AxiosClient.post("user/update" , body) 
}

export const changePassword = (body)=>{
    return AxiosClient.post("user/changepassword" , body) 
}
export const forgotPassword = (body)=>{
    return AxiosClient.post("user/forgotpassword" , body) 
}