import AxiosClient from '../../Axios/ClientAxios';


export const getAllRoute = ()=>{
    return AxiosClient.get("route/getallroute" );
}

export const changeStatus = (body)=>{
    return AxiosClient.post("route/changestatus" , body);
}

export const insertRoute = (body)=>{
    return AxiosClient.post("route/insertroute" , body);
}

export const updateRoute = (body)=>{
    return AxiosClient.post("route/updateroute" , body);
}
