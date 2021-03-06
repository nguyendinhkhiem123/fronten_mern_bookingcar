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
import * as ApiTicket from '../../../Api/Ticket/index';
const { Content } = Layout
function Trip(props) {
    let result = [];
    const [ trip , setTrip ] = useState([]);
    const [ Loading , Hidden , Display ] = useLoading();
    const [ search , setSearch ] = useState("");
    const [ isDisplayModal , setIsDisplayModal] = useState(false);
    const [ value ,  setValue ] = useState(0);
    const [ tripValue , setTripValue] = useState(null);
    const [ listNumberTicket , setListNumberTicket ] = useState([]);
    const date = new Date();
    const onClickInsert = ()=>{{
        setValue(0)
        onOpenModal()
    }}
    
    const onCloseTripValue = ()=>{
        setTripValue(null)
    }
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
            const res = await Promise.all([ApiTrip.getAllTrip(),ApiTicket.getAllTicket()]);
            Hidden();
            console.log(res)
            if(res[0].data.success && res[1].data.success){
                setTrip(res[0].data.body.newTrip)
                setListNumberTicket(res[1].data.body.listTicket);
            }
            
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchAllTrip()
    }, [])
    console.log(tripValue);
    const newDate = (ngay , gio=0)=>{
        const date1 =  new Date(ngay);
        const year = date1.getFullYear();
        const month = date1.getMonth();
        const day = date1.getDate()
        return new Date(Date.UTC(year , month , day , gio));
    }
    const updateTrip  = async(e)=>{
        if(window.confirm('B???n c?? ch???c ch???n ???? ?????n gi??? ???? c???p nh???t ?')){
            try{
                Display();
                const res = await ApiTrip.updateStatusTrip({
                    trip : e
                });
                Hidden();
                if(res.data.success){

                    openNotificationSuccess('Th??nh c??ng' , res.data.message , 3);
                    const listTrip = [...trip];
                    let index = -1; 
                    listTrip.forEach((value,inde)=>{
                        if(value._id === e) index = inde
                    })

                    listTrip[index] = res.data.body;
                    setTrip(listTrip);

                }
                else{
                    openNotificationSuccess('Th???t b???i' , res.data.message , 3);
                }
            }catch(err){
                Hidden();
                console.log(err);
            }
        }
    }
    
    const insertTrip = (values)=>{
        console.log('values',values);
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
        if(window.confirm('B???n c?? ch???c ch???n mu???n h???y chuy???n n??y ?' )){
            try{
                Display();
                const res = await ApiTrip.cancleTrip({
                    trip : e
                });
                Hidden();
                if(res.data.success){
    
                    openNotificationSuccess('Th??nh c??ng' , res.data.message , 3);
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
                    openNotificationSuccess('Th???t b???i' , res.data.message , 3);
                }
            }catch(err){
                Hidden();
                console.log(err);
            }
        }
    }

    const onClickDelete = async(values)=>{
        if(window.confirm('B???n c?? ch???c ch???n mu???n x??a chuy???n n??y ?' )){
            try{
                Display();
                const res = await ApiTrip.deleteTrip({
                    id : values._id
                });
                Hidden();
                if(res.data.success){
                    openNotificationSuccess('Th??nh c??ng' , res.data.message , 3);
                    const listTrip = [...trip];
                    const lastTrip = listTrip.filter((value,inde)=>{
                        return value._id !== values._id
                    })
    
                 
                    setTrip(lastTrip);

                  
                }
                else{
                    openNotificationSuccess('Th???t b???i' , res.data.message , 3);
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
            return (value.route?.matuyen.trim().toLowerCase().indexOf(search.toLowerCase()) !== -1
             || 
             value.route?.noidi.trim().toLowerCase().indexOf(search.toLowerCase()) !== -1
            )
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
                                                {value.giodi} gi???
                                            </td>
                                            {/* <td className="t__price">
                                             
                                                {formatMoney(value.giave.toString())} ??
                                            </td> */}
                                            <td className="t__route">
                                                {value.route.matuyen} 
                                            </td>
                                            <td className="t__start">
                                               {value.route.noidi}
                                            </td>
                                            <td className="t__car">
                                                {value.car._id}
                                            </td>
                                            <td  className="t__numberticket">
                                                {
                                                   listNumberTicket.length > 0 ? 
                                                    (
                                                        listNumberTicket.filter((valuex =>{
                                                            return valuex.trip._id === value._id
                                                        }))
                                                    ).length 
                                                    : 0
                                                }  v??
                                            </td>
                                            <td>
                                                <span className="box" onClick={ value.trangthai === 'DAHUY' ? null : e=>updateTrip(value._id)}>
                                                    {
                                                       value.trangthai === 'DANGDOI' ? "??ang ?????i" : ""
                                                    }
                                                    {
                                                       value.trangthai === 'HOANTHANH' ? "Ho??n th??nh" : ""
                                                    } 
                                                    { 
                                                       value.trangthai === 'DANGKHOIHANH' ? "kh???i h??nh" : ""
                                                    }
                                                    {
                                                        value.trangthai === 'DAHUY' ? "???? h???y" : ""
                                                    }
                                                </span>
                                            </td>
                                          
                                            <td>
                                                 <Link className="box"  to={`lich-trinh/${value._id}`}>
                                                    V?? xe
                                                 </Link>
                                            </td>
                                            <td>
                                                <span className="box" onClick={e=> onClickDelete(value)}>
                                                    X??a chuy???n
                                                </span>
                                            </td>
                                            {
                                               new Date( Date.UTC(date.getFullYear() , date.getMonth() , date.getDate(), date.getHours() , date.getMinutes())) >= newDate(value.ngaydi , value.giodi) || value.trangthai !== 'DANGDOI'?
                                               <td>
                                                    <span className="box disable">
                                                         Ch???nh s???a
                                                    </span>
                                                   
                                                </td>:
                                                <td>
                                                <span className="box" onClick={
                                                    new Date( Date.UTC(date.getFullYear() , date.getMonth() , date.getDate(), date.getHours() , date.getMinutes())) >= newDate(value.ngaydi , value.giodi)?
                                                    e=>openNotificationErorr('Th???t b???i' , 'Kh??ng th??? ch???nh s???a chuy???n xe ???? kh???i h??nh ho???c ho??n th??nh r???i', 3)
                                                  
                                                    : 
                                                     e=> onClickUpdate(value)
                                                }>
                                                    Ch???nh s???a
                                                </span>
                                                </td> 
                                            }
                                          
                                          
                                            {
                                                new Date( Date.UTC(date.getFullYear() , date.getMonth() , date.getDate(), date.getHours() , date.getMinutes())) >= newDate(value.ngaydi , value.giodi) || value.trangthai !== 'DANGDOI'?
                                             
                                                <td>
                                                   <span className="box disable" >
                                                       H???y chuy???n
                                                   </span>
                                               </td>
                                               :
                                               <td>
                                               <span className="box" 
                                               onClick={
                                                new Date( Date.UTC(date.getFullYear() , date.getMonth() , date.getDate(), date.getHours() , date.getMinutes())) < newDate(value.ngaydi , value.giodi)?  
                                                e=>canelTrip(value._id) 
                                                :
                                                e=>openNotificationErorr('Th???t b???i' , 'Kh??ng th??? h???y chuy???n xe ???? kh???i h??nh ho???c ho??n th??nh r???i', 3)
                                            }
                                               >
                                                   H???y chuy???n 
                                                 </span>
                                          </td>
                                            }
                            </tr>
                        </tbody>
                    )
                  })
    }
    console.log(new Date(Date.UTC(2021,1,2,2)) > new Date(Date.UTC(2021,1,1,25)))
    return (
        <div>
        <Content>
            <div className="site-layout-content" style={{overflowX:'hidden'}}>
                <Carousels/>
                <div className="route__container">
                     <div className="route__header">
                        <div className="route__add">
                            <Button type="primary" size="large" onClick={onClickInsert}>
                                    TH??M CHUY???N XE
                            </Button>
                        </div>
                        <div className="route__search">
                                <input placeholder="Nh???p m?? tuy???n , n??i ??i" className="form__input"  onChange={onChangeSearch}
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
                                                Ng??y ??i
                                            </th>
                                            <th className="t__hour">
                                                Gi??? ??i
                                            </th>
                                            {/* <th className="t__price">
                                                Gi?? v??
                                            </th> */}
                                            <th className="t__route">
                                                Tuy???n 
                                            </th>
                                            <th className="t__start">
                                                N??i b???t ?????u
                                            </th>
                                            <th className="t__car">
                                                M?? Xe 
                                            </th>
                                            <th  className="t__numberticket">
                                                ???? b??n
                                            </th>
                                            <th>    

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
                                        Kh??ng c?? chuy???n xe n??o
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
                    onCloseTripValue = {onCloseTripValue}
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