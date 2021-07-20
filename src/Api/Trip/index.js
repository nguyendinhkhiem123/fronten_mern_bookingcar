import AxiosClient from '../../Axios/ClientAxios';


export const getHourTrip = (body)=>{
    return AxiosClient.get("trip/gethourstrip" , { params:  body  }
    )
};

export const getTicketHourTrip = (body)=>{
    return AxiosClient.get("trip/gettickerhourtrip" , { params:  body  }
    )
}
