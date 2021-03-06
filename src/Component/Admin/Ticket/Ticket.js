import React, { useEffect } from 'react';
import { Layout , Button } from 'antd';
import '../Ticket/Ticket.css';
import Carousels from '../../Carousel/Carousel';
import * as ApiTicket from '../../../Api/Ticket/index';
import useLoading from '../../HookLoading/HookLoading';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { openNotificationSuccess , openNotificationErorr} from '../../Notfication/index';
import * as actionTicket from '../../../Reducer/ticketUser';
import Modal from './Modal/ModalInfo';
import ModalUpIn from './Modal/ModalUpIn';
import { useRouteMatch } from 'react-router-dom';
const { Content } = Layout; 
function Ticket(props) {
   
    const [listTicket , setListTicket] = useState([]);
    const [ Loading , Hidden , Display] = useLoading();
    const route =  useSelector(state => state.route)
    const [ isModalMore , setIsModalMore ] = useState(false);
    const [ inforModal , setInforModal ] = useState({});
    const [ isModalInup , setIsModalInup] = useState(false);
    const [ valueOne , setValueOne ] = useState(0);
    const match = useRouteMatch();
    const slug = match.params.slug;
    const date = new Date();
    const fetchTicketOfTrip = async(value)=>{
        try{
            Display();
            const res =await ApiTicket.getTicketOfTrip(value);
            console.log(res)            
            Hidden();
            if(res.data.success){
                setListTicket(res.data.body.listTicket);
              
            }
        }
        catch(err){
            Hidden();
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchTicketOfTrip(slug);
    }, [])
    const closeModalInfo = ()=>{
        setIsModalMore(false);
        setInforModal({});
    }
    const openModalInfo = (value)=>{
        setIsModalMore(true);
        setInforModal(value);
     }

    const onCloseModalUpIN = ()=>{
        setIsModalInup(false);
        setInforModal({});
    }
    const onClickInsert = ()=>{
        setIsModalInup(true);
        setValueOne(0)
    }
    const updateTicket = (value)=>{
         setIsModalInup(true);
         setValueOne(1);
        setInforModal(value);
    }
    const insertTicket = (value)=>{
        const list = [...listTicket];
        list.push(value)
        setListTicket(list);
    }
    const propsUpdateTicket =(values)=>{
        const list = [...listTicket];
        let index = -1; 
        list.forEach((value , ink)=>{
            if(value._id === values._id) index = ink
        } )
     
        list[index] = values;
        setListTicket(list);
    }
    const onClickCancleTicket = async(values)=>{
        if(window.confirm("B???n c?? ch???c ch???n h???y v?? ?")){
            try{
                Display();
                const body = {
                    id : values._id
                }
                const res = await ApiTicket.cancleTicket(body);
                Hidden();
                if(res.data.success){
                    openNotificationSuccess("Th??nh c??ng" , res.data.message , 3);
        
                     
                        const newTicket =  res.data.body
                        const list = [...listTicket];
                        let index = -1; 
                        list.forEach((value , ink)=>{
                            if(value._id === newTicket._id) index = ink
                        } )
                        list[index] = newTicket;
                        setListTicket(list);

                   
                  
                }
                else{
                    openNotificationSuccess("Th??nh c??ng" , res.data.message , 3);
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

    const newDate = (ngay , gio=0)=>{
        
        const date1 =  new Date(ngay);
        const year = date1.getFullYear();
        const month = date1.getMonth();
        const day = date1.getDate()
        
        return new Date(Date.UTC(year , month , day ,gio ));
    }
    if(ticketResult.length > 0 ){
        listResult = ticketResult.map((value,index)=>{
            return   <tbody key={index}>
                  <tr className={index % 2 !== 0 ? "table__head--body" : "table__head--body active"} >
                  <td className="table__mave">
                          {value._id}
                  </td>
                  <td className="table__date">
                      {value.thoigiandat?.slice(0,10)}                                      
                  </td>
                  {/* <td className="table__number"> 
                      {value.soghe}
                  </td> */}
                  <td className="table__di">
                      {
                          route.length > 0 ?
                          (route.filter((valueOne)=>{
                              return valueOne._id === value.trip.route
                          }))[0]?.noidi
                          : null
                      }
                  </td>
                  <td className="table__den">
                  {  
                          route.length > 0 ?
                          (route.filter((valueOne)=>{
                              return valueOne ._id === value.trip.route
                          }))[0]?.noiden
                          : null
                      } 
                  </td>
                  <td className="table__ngaydi">
                      {value.trip.ngaydi.slice(0,10)}:{value.trip.giodi}h 
                  </td>
                  <td className="table__giokhoihanh">
                          {value.soghe}
                  </td>
                  <td>
                      <span className="box" onClick={e => openModalInfo(value)}> 
                          Xem th??m
                      </span>
                  
                  </td>
                  <td>
                   { value.trangthaive === "DAHUY" || value.trangthaive ==='DANGUUTIEN' || new Date(Date.UTC(date.getFullYear() , date.getMonth() , date.getDate(),date.getHours()+5,date.getMinutes())) >= newDate(value.trip.ngaydi , value.trip.giodi) ? 
                        <span className="box disable">
                            Ch???nh s???a
                        </span>
                   : 
                        <span className="box" onClick={ new Date( Date.UTC(date.getFullYear() , date.getMonth() , date.getDate(), date.getHours())) < newDate(value.trip.ngaydi, value.trip.giodi) ? e=>updateTicket(value) : e=>openNotificationErorr('Th???t b???i ' , 'Xe c?? th??? ???? kh???i h??nh ho???c k???t th??c r???i. Kh??ng th???  ch???nh s???a' , 3)
                                                    
                         }>
                        Ch???nh s???a  
                      </span>
                      }
                  
                  </td> 
                  <td>
                      { value.trangthaive === "DAHUY" || value.trangthaive ==='DANGUUTIEN' || new Date(Date.UTC(date.getFullYear() , date.getMonth() , date.getDate(),date.getHours()+5,date.getMinutes())) >= newDate(value.trip.ngaydi , value.trip.giodi)?
                        <span className="box disable">
                            H???y v??
                        </span>
                      : 
                        <span className="box" onClick={ new Date(Date.UTC(date.getFullYear() , date.getMonth() , date.getDate(),date.getHours()+5,date.getMinutes())) < newDate(value.trip.ngaydi , value.trip.giodi) ? e=>onClickCancleTicket(value) : e=>openNotificationErorr('Th???t b???i ' , 'Kh??ng th??? h???y v??. C?? l??? ???? qua th???i gian h???y v??' , 3)
                                                    
                         }>
                        H???y v?? 
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
                                <div style={{
                                    display :'flex',
                                    justifyContent : 'space-between',
                                    marginBottom : '8px'
                                }}>
                                    <h3 className="history__title">V?? XE THU???C CHUY???N XE : {slug}</h3>   
                                    <Button type="primary" size="large" onClick={onClickInsert}>
                                           Th??m v?? xe
                                    </Button>
                                </div>
                                <div className="container__table">
                                    <table style={{width : '1200px'}}>
                                        <thead>
                                            <tr className="table__head">
                                                <th className="table__mave">
                                                    M?? v??
                                                </th>
                                                <th className="table__date">
                                                    Ng??y ?????t                                                    
                                                </th>
                                                {/* <th className="table__number"> 
                                                    S??? gh??? 
                                                </th> */}
                                                <th className="table__di">
                                                    N??i ??i
                                                </th>
                                                <th className="table__den">
                                                    N??i ?????n
                                                </th>
                                                <th className="table__ngaydi">
                                                    Ng??y ??i
                                                </th>
                                                <th className="table__giokhoihanh">
                                                    S??? gh???
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
                                                        B???n ch??a c?? v?? xe n??o
                                                    </div>
                                                }
                                               
                                            </table>
                                    </div>
                                   
                                </div>    
                        </div>
                </div>
                
                {isModalMore ? <Modal isVisiable={true} inforModal={inforModal} closeModal={closeModalInfo}/>: null}
                {isModalInup ? <ModalUpIn isVisiable={true} id={slug} propsUpdateTicket={propsUpdateTicket}inforModal={inforModal} insertTicket={insertTicket} closeModal={onCloseModalUpIN} value={valueOne}/>: null}
                {Loading}
            </Content>
        </div>
    );
}

export default Ticket;