import AxiosClient from '../../Axios/ClientAxios';


export const getTicketTrip = (body)=>{
    return AxiosClient.get("ticket/gettickettrip" , { params:  body  }
    )
};

export const checkNumberTicket = (body)=>{
    return AxiosClient.get("ticket/checknumberticket" , { params:  body  }
    )
};
