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
