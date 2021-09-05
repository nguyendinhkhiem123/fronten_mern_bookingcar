import React, { useEffect } from 'react';
import { Layout } from 'antd';
import '../History/History.css';
import Carousels from '../../Carousel/Carousel';
import * as ApiTicket from '../../../Api/Ticket/index';
import useLoading from '../../HookLoading/HookLoading';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { openNotificationSuccess , openNotificationErorr } from '../../Notfication/index';
import * as actionTicket from '../../../Reducer/ticketUser';
import Modal from './Modal/ModalInfo';
const { Content } = Layout; 
function History(props) {
   
    const listTicket = useSelector(state => state.listTicket);
    const [ Loading , Hidden , Display] = useLoading();
    const dispatch = useDispatch();
    const route =  useSelector(state => state.route)
    const [ isModal , setIsModal ] = useState(false);
    const [ inforModal , setInforModal ] = useState({});
    const date = new Date();
    const fetchTicketOfUser = async()=>{
        try{
            Display();
            const res =await ApiTicket.getTikcetOfUser();
            Hidden();
            if(res.data.success){
                const array = res.data.body;
                dispatch(actionTicket.addTicket(array))
            }
        }
        catch(err){
            Hidden();
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchTicketOfUser();
    }, [])
    const closeModal = ()=>{
        setIsModal(false);
        setInforModal({});
    }
    const openModal = (value)=>{
        setIsModal(true);
        setInforModal(value);
    }
    const onClickCancleTicket = async(value)=>{
        if(window.confirm("Bạn có chắc chắn hủy vé ?")){
            try{
                Display();
                const body = {
                    id : value._id
                }
                const res = await ApiTicket.cancleTicket(body);
                Hidden();
                if(res.data.success){
                    openNotificationSuccess("Thành công" ,res.data.message , 3);
                    dispatch(actionTicket.removeOneTicket(value._id))
                }
            }
            catch(err){
    
            }
        }
       
    }
    let listResult = [];
    let ticketResult = [...listTicket]
    if(ticketResult.length > 0){
        ticketResult.sort((a, b)=>{
            return new Date(a.thoigiandat) < new Date(b.thoigiandat) ? 1 : -1
        })
    }
    console.log(listTicket);
    const newDate = (ngay , gio=0)=>{
       
        const date1 =  new Date(ngay);
        const year = date1.getFullYear();
        const month = date1.getMonth();
        const day = date1.getDate();
        
        return new Date(Date.UTC(year , month , day , gio));
    }
    if(ticketResult.length > 0 ){
        listResult = ticketResult.map((value,index)=>{
            return   <tbody key={index}>
                  <tr className={index % 2 !== 0 ? "table__head--body" : "table__head--body active"} >
                  <td className="table__mave">
                          {value._id}
                  </td>
                  <td className="table__date">
                      {value.thoigiandat.slice(0,10)}                                      
                  </td>
                  <td className="table__number"> 
                      {value.soghe}
                  </td>
                  <td className="table__di">
                      {
                          route.length > 0 ?
                          (route.filter((valueOne)=>{
                              return valueOne._id === value.trip.route
                          }))[0].noidi
                          : null
                      }
                  </td>
                  <td className="table__den">
                  {  
                          route.length > 0 ?
                          (route.filter((valueOne)=>{
                              return valueOne ._id === value.trip.route
                          }))[0].noiden
                          : null
                      } 
                  </td>
                  <td className="table__ngaydi">
                      {value.trip.ngaydi.slice(0,10)} 
                  </td>
                  <td className="table__giokhoihanh">
                          {value.trip.giodi}h
                  </td>
                  <td>
                      <span className="box" onClick={e => openModal(value)}> 
                          Xem thêm
                      </span>
                  
                  </td>
                
                  <td>
                  {
                      new Date( Date.UTC(date.getFullYear() , date.getMonth() , date.getDate(), date.getHours() + 5 , date.getMinutes() )) >= newDate(value.trip.ngaydi , value.trip.giodi) ?
                     <span className="box disable">
                         Hủy vé
                     </span>
                     :
                     <span className="box" onClick={ new Date(Date.UTC(date.getFullYear() , date.getMonth() , date.getDate(), date.getHours()+5,date.getMinutes())) < newDate(value.trip.ngaydi , value.trip.giodi) ? e=>onClickCancleTicket(value) : e=>openNotificationErorr('Thất bại ' , 'Không thể hủy vé' , 3)
                                                    
                     }>
                         Hủy vé
                      </span>
                  }
                  </td> 
              </tr>
          </tbody>
      })
    }
 
    return (
        <div>
            <Content>
                <div className="site-layout-content" style={{overflowX:'hidden'}}>
                        <Carousels/>
                        <div className="conatiner__history">
                                <h3 className="history__title">LỊCH SỬ ĐẶT VÉ</h3>   
                                <div className="container__table">
                                    <table style={{width : '1200px'}}>
                                        <thead>
                                            <tr className="table__head">
                                                <th className="table__mave">
                                                    Mã vé
                                                </th>
                                                <th className="table__date">
                                                    Ngày đặt                                                    
                                                </th>
                                                <th className="table__number"> 
                                                    Số ghế 
                                                </th>
                                                <th className="table__di">
                                                    Nơi đi
                                                </th>
                                                <th className="table__den">
                                                    Nơi đến
                                                </th>
                                                <th className="table__ngaydi">
                                                    Ngày đi
                                                </th>
                                                <th className="table__giokhoihanh">
                                                    Giờ khởi hành
                                                </th>
                                                <th>
                                                  
                                                </th>
                                                <th>
                                                
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div className="table__content">
                                            <table style={{width : '100%'}}>
                                                {
                                                    listResult.length > 0  ?
                                                      listResult
                                                    : 
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
                                                        Bạn chưa có vé xe nào
                                                    </div>
                                                }
                                               
                                            </table>
                                    </div>
                                   
                                </div>    
                        </div>
                </div>
                {isModal ? <Modal isVisiable={isModal} inforModal={inforModal} closeModal={closeModal}/>: null}
                {Loading}
            </Content>
        </div>
    );
}

export default History;