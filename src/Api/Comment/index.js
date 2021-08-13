
import AxiosClient from '../../Axios/ClientAxios';


export const getComment = ()=>{
    return AxiosClient.get("comment/comment")
    
}

export const getReply = ()=>{
    return AxiosClient.get("comment/Reply")
    
}
export const insertComment = (body)=>{
    return AxiosClient.post("comment/insertcomment" , body)
    
}
export const insertReply = (body)=>{
    return AxiosClient.post("comment/insertreply" , body)
    
}
export const deleteComment = (body)=>{
    return AxiosClient.post("comment/deletecomment" , body)
    
}
export const deleteReply = (body)=>{
    return AxiosClient.post("comment/deletereply" , body)
    
}

