import AxiosClient from '../../Axios/ClientAxios';


export const getAllRoute = (body)=>{
    return AxiosClient.get("route/getallroute" );
}
