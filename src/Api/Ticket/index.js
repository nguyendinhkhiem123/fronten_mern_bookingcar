import AxiosClient from '../../Axios/ClientAxios';


export const getTicketTrip = (body)=>{
    return AxiosClient.get("ticket/gettickettrip" , { params:  body  }
    )
};

export const checkNumberTicket = (body)=>{
    return AxiosClient.get("ticket/checknumberticket" , { params:  body  }
    )
};
export const UpdateStatusTicket = (body) =>{
    return AxiosClient.post("ticket/updatestausticket" ,body)
}
export const CheckNumberCar = (body) =>{
    return AxiosClient.post("ticket/checknumbercar" ,body)
}

export const checkOutTicket = (body) =>{
    return AxiosClient.post("ticket/checkupdatenumberticket" ,body)
}

export const getTikcetOfUser = ()=>{
    return AxiosClient.get("ticket/getticketofuser");
}
export const cancleTicket = (body)=>{
    return AxiosClient.post("ticket/cancleticket" , body);
}

export const insertTicket = (body)=>{
    return AxiosClient.post("ticket/insertticket" , body);
}


export const getTicketOfTrip = (body)=>{
    return AxiosClient.get(`ticket/getticketoftrip?id=${body}`,);
}

export const getGetSlotCar = (body)=>{
    return AxiosClient.post(`ticket/getslotcar`,body);
}
export const insertTicketOfAdmin = (body)=>{
    return AxiosClient.post(`ticket/insertticketofadmin`,body);
}
export const updateTicketOfAdmin = (body)=>{
    return AxiosClient.post(`ticket/updateticketofadmin`,body);
}
export const deleteTicket = (body)=>{
    return AxiosClient.post(`ticket/deleteticket`,body);
}
