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

export const getEmployee = ()=>{
    return AxiosClient.get("user/getemployee");
}

export const updateStatusEmployee = (body)=>{
    return AxiosClient.post("user/updatestatusemployee",body);
}

export const updateEmployee = (body)=>{
    return AxiosClient.post("user/updateemployee",body);
}

export const insertEmployee = (body)=>{
    return AxiosClient.post("user/insertemployee",body);
}
export const getEmployeeNoAccount = ()=>{
    return AxiosClient.get("user/getemployeenoaccount",);
}

