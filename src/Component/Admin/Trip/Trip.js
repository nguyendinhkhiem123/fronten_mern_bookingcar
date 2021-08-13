import React, { useEffect, useState } from 'react';
import '../Trip/Trip.css';
import {Layout , Button } from 'antd';
import { NotificationFilled, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import Carousels from '../../Carousel/Carousel';
import * as ApiTrip from '../../../Api/Trip/index';
import useLoading from '../../HookLoading/HookLoading';
import Modal from '../Trip/Modal/Modal';
import { openNotificationSuccess , openNotificationErorr } from '../../Notfication';
const { Content } = Layout
function Trip(props) {
    let result = [];
    const [ trip , setTrip ] = useState([]);
    const [ Loading , Hidden , Display ] = useLoading();
    const [ search , setSearch ] = useState("");
    const [ isDisplayModal , setIsDisplayModal] = useState(false);
    const [ value ,  setValue ] = useState(0);
    const [ tripValue , setTripValue] = useState(null);
    const date = new Date();
    const onClickInsert = ()=>{{
        setValue(0)
        onOpenModal()
    }}
    const onClickUpdate = (value)=>{
        setTripValue(value)
        setValue(1);
        onOpenModal();
    }
    const onCloseModal = ()=>{
        setIsDisplayModal(false)
    }
    const onOpenModal = ()=>{
        setIsDisplayModal(true)
    }
    const formatMoney=(n) =>{
        return n.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }   
    const onChangeSearch = (e)=>{
        setSearch(e.target.value)
    }
    const fetchAllTrip = async()=>{
        try{
            Display()
            const res = await ApiTrip.getAllTrip();
            Hidden();
            console.log(res)
            if(res.data.success){
                setTrip(res.data.body.newTrip)
            }
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchAllTrip()
    }, [])
    console.log(tripValue);
    const newDate = (ngay , gio=0)=>{
        const n = Math.floor(gio/24);
        const m = gio%24;
        const date1 =  new Date(ngay);
        const year = date1.getFullYear();
        const month = date1.getMonth();
        const day = date1.getDate()+n;
        
        return new Date(Date.UTC(year , month , day , m));
    }


    const updateTrip  = async(e)=>{
        if(window.confirm('Bạn có chắc chắn đã đến giờ đã cập nhật ?')){
            try{
                Display();
                const res = await ApiTrip.updateStatusTrip({
                    trip : e
                });
                Hidden();
                if(res.data.success){

                    openNotificationSuccess('Thành công' , res.data.message , 3);
                    const listTrip = [...trip];
                    let index = -1; 
                    listTrip.forEach((value,inde)=>{
                        if(value._id === e) index = inde
                    })

                    listTrip[index] = res.data.body;
                    setTrip(listTrip);

                }
                else{
                    openNotificationSuccess('Thất bại' , res.data.message , 3);
                }
            }catch(err){
                Hidden();
                console.log(err);
            }
        }
    }
    
    const insertTrip = (values)=>{
        console.log(values);
        const letTrip = [...trip];
        letTrip.push(values);
        setTrip(letTrip);
    }
    const update = (values)=>{
        const listTrip = [...trip];
        let index = -1; 
        listTrip.forEach((value,inde)=>{
            if(value._id === values._id) index = inde
        })
        listTrip[index] = values;
        setTrip(listTrip);
    }
    const canelTrip = async(e)=>{
        if(window.confirm('Bạn có chắc chắn muốn hủy chuyến này ?' )){
            try{
                Display();
                const res = await ApiTrip.cancleTrip({
                    trip : e
                });
                Hidden();
                if(res.data.success){
    
                    openNotificationSuccess('Thành công' , res.data.message , 3);
                    const listTrip = [...trip];
                    let index = -1; 
                    listTrip.forEach((value,inde)=>{
                        if(value._id === e) index = inde
                    })
    
                    listTrip[index].trangthai = "DAHUY";
                    setTrip(listTrip);

                    console.log(listTrip , index);
    
                }
                else{
                    openNotificationSuccess('Thất bại' , res.data.message , 3);
                }
            }catch(err){
                Hidden();
                console.log(err);
            }
        }
    }

    if(trip.length> 0){
        trip.sort((a, b)=>{
            return new Date(a.ngaydi) < new Date(b.ngaydi) ? 1 : -1
        })
    }

    if(trip.length > 0){
        result = (trip.filter(value=>{
            return value.route?.matuyen.toLowerCase().indexOf(search.toLowerCase()) !== -1
        })
                )  
                        .map((value,index)=>{
                    return (
                        <tbody key={index}>
                            <tr className={index%2===0 ?"tr__head active" : "tr__head"}>
                                       <td className="t__date">
                                               {value.ngaydi.slice(0,10)
                                               }
                                            </td>
                                            <td className="t__hour">
                                                {value.giodi} giờ
                                            </td>
                                            <td className="t__price">
                                             
                                                {formatMoney(value.giave.toString())} đ
                                            </td>
                                            <td className="t__route">
                                                {value.route.matuyen} 
                                            </td>
                                            <td className="t__start">
                                               {value.route.noidi}
                                            </td>
                                            <td className="t__car">
                                                {value.car.biensoxe}
                                            </td>
                                            <td  className="t__numberticket">
                                                {value.car.soluongghe} vé
                                            </td>
                                            <td>
                                                <span className="box" onClick={ value.trangthai === 'DAHUY' ? null : e=>updateTrip(value._id)}>
                                                    {
                                                       value.trangthai === 'DANGDOI' ? "Đang đợi" : ""
                                                    }
                                                    {
                                                       value.trangthai === 'HOANTHANH' ? "Hoàn thành" : ""
                                                    } 
                                                    { 
                                                       value.trangthai === 'DANGKHOIHANH' ? "khởi hành" : ""
                                                    }
                                                    {
                                                        value.trangthai === 'DAHUY' ? "Đã hủy" : ""
                                                    }
                                                </span>
                                            </td>
                                          
                                            <td>
                                                 <Link className="box"  to={`lich-trinh/${value._id}`}>
                                                    Vé xe
                                                 </Link>
                                            </td>
                                            <td>
                                                <span className="box" onClick={e=> onClickUpdate(value)}>
                                                    Chỉnh sửa
                                                </span>
                                            </td>
                                            {
                                                value.trangthai === 'DANGDOI'?
                                                <td>
                                                    <span className="box" onClick={ new Date( Date.UTC(date.getFullYear() , date.getMonth() , date.getDate(), date.getHours())) < newDate(value.ngaydi) ? e=>canelTrip(value._id) : e=>openNotificationErorr('Thất bại ' , 'Xe có thể đã khởi hành hoặc kết thúc rồi. Vui lòng cập nhật' , 3)
                                                    
                                                    }>
                                                        Hủy chuyến 
                                                      </span>
                                               </td>
                                               : <td></td>
                                            }
                            </tr>
                        </tbody>
                    )
                  })
    }
    return (
        <div>
        <Content>
            <div className="site-layout-content" style={{overflowX:'hidden'}}>
                <Carousels/>
                <div className="route__container">
                     <div className="route__header">
                        <div className="route__add">
                            <Button type="primary" size="large" onClick={onClickInsert}>
                                    THÊM CHUYẾN XE
                            </Button>
                        </div>
                        <div className="route__search">
                                <input placeholder="Nhập tuyến xe..." className="form__input"  onChange={onChangeSearch}
                                //  onChange={onChangeEnd}
                                 />
                                 <SearchOutlined  className="class__icon" />
                        </div>
                     </div>
                     <div className="route__body">
                            <div className="table__header">
                                <table style={{width : '100%'}}>
                                    <thead>
                                        <tr className="tr__head">
                                            <th className="t__date">
                                                Ngày đi
                                            </th>
                                            <th className="t__hour">
                                                Giờ đi
                                            </th>
                                            <th className="t__price">
                                                Giá vé
                                            </th>
                                            <th className="t__route">
                                                Tuyến 
                                            </th>
                                            <th className="t__start">
                                                Nơi bắt đầu
                                            </th>
                                            <th className="t__car">
                                                Mã Xe 
                                            </th>
                                            <th  className="t__numberticket">
                                                Số vé
                                            </th>
                                            <th>    

                                            </th>
                                            <th>
                                            </th>
                                            <th>

                                            </th>
                                            <th>

                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div className="table__body">
                            <table style={{width : '100%'}}>
                                    {result.length > 0 ? 
                                    result :
                                    <div style={{
                                        width : '100%',
                                        backgroundColor : '#f3ccc0',
                                        height :'60px',
                                        textAlign : 'center',
                                        lineHeight : '60px',
                                        fontSize : '20px',
                                        fontWeight : 500,
                                        color : '#fff'
                                    }}>
                                        Không có tuyến xe nào
                                    </div>    
                                }
                                </table>
                            </div>
                     </div>
                </div>
            </div>
            {isDisplayModal ? <Modal
                    onCloseModal={onCloseModal}
                    trip = {trip}
                    insertTrip= {insertTrip}
                    value = {value}
                    tripValue = {tripValue}
                    updateTrip = {update}
                    // onClickInsert = {insertCar}
                    // value = {values}
                    // onClickUpdate = {updateCar}
                    // route = {listRoute}
            /> : null}
        
            {Loading}
        </Content>
        
    </div>
    );
}

export default Trip;