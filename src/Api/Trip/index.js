import AxiosClient from '../../Axios/ClientAxios';


export const getOneTrip = (body)=>{
    return AxiosClient.get("trip/getonetrip" , { params:  body  }
    )
};

export const getTwoTrip = (body)=>{
    return AxiosClient.get("trip/gettwotrip" , { params:  body  }
    )
};

