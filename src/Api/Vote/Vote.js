
import AxiosClient from '../../Axios/ClientAxios';


export const getVote = ()=>{
    return AxiosClient.get("vote/getvote")
    
}

export const getStatc = ()=>{
    return AxiosClient.get("vote/getstatic")
    
}
export const insertVote = (body)=>{
    return AxiosClient.post("vote/insert" , body)
    
}

export const deleteVote = (body)=>{
    return AxiosClient.post("vote/delete" , body)
    
}


