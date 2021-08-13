import AxiosClient from '../../Axios/ClientAxios';


export const getStatisticalMoney = (body)=>{
    return AxiosClient.get('/statistical/money', {
        params : body
    })
}


export const getStatisticalTrip = (body)=>{
    return AxiosClient.get('/statistical/trip', {
        params : body
    })
}
export const getStatisticalCar = (body)=>{
    return AxiosClient.get('/statistical/car', {
        params : body
    })
}