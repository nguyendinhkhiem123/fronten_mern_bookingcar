import AxiosClient from '../../Axios/ClientAxios';


export const getHourTrip = (body)=>{
    return AxiosClient.get("trip/gethourstrip" , { params:  body  }
    )
};

export const getTicketHourTrip = (body)=>{
    return AxiosClient.get("trip/gettickerhourtrip" , { params:  body  }
    )
}
export const getAllTrip= ()=>{
    return AxiosClient.get("trip/getall")
}


export const updateStatusTrip = (body)=>{
    return AxiosClient.post("trip/updatestatustrip" , body)
}
export const cancleTrip= (body)=>{
    return AxiosClient.post("trip/cancletrip" , body
    )
}
export const getCarOfTrip = (body)=>{
    return AxiosClient.post("trip/getcar" , body)
}

export const InsertTrip = (body)=>{
    return AxiosClient.post("trip/insert" , body)
}
export const updateTrip = (body)=>{
    return AxiosClient.post("trip/updatetrip" , body)
}

export const deleteTrip = (body)=>{
    return AxiosClient.post("trip/deletetrip" , body)
}