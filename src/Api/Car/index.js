import AxiosClient from '../../Axios/ClientAxios';


export const getAllCar = ()=>{
    return AxiosClient.get("car/getall" )
}
export const changeStatus = (body)=>{
    return AxiosClient.post("car/changestatus" ,body)
}

export const insertCar = (body)=>{
    return AxiosClient.post("car/insert" ,body)
}

export const updateCar = (body)=>{
    return AxiosClient.post("car/updatecar" ,body)
}

export const deleteCar = (body)=>{
    return AxiosClient.post("car/deletecar" ,body)
}

