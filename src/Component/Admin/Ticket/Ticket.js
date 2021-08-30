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
        if(window.confirm("Bạn có chắc chắn hủy vé ?")){
            try{
                Display();
                const body = {
                    id : values._id
                }
                const res = await ApiTicket.cancleTicket(body);
                Hidden();
                if(res.data.success){
                    openNotificationSuccess("Thành công" , res.data.message , 3);
        
                     
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
                    openNotificationSuccess("Thành công" , res.data.message , 3);
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
        const n = Math.round(gio/24);
        const m = gio%24;
        const date1 =  new Date(ngay);
        const year = date1.getFullYear();
        const month = date1.getMonth();
        const day = date1.getDate()+n;
        
        return new Date(Date.UTC(year , month , day , m));
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
                          Xem thêm
                      </span>
                  
                  </td>
                  <td>
                   { value.trangthaive === "DAHUY" || value.trangthaive ==='DANGUUTIEN' ? 
                        <span className="box disable">
                            Chỉnh sửa
                        </span>
                   : 
                        <span className="box" onClick={ new Date( Date.UTC(date.getFullYear() , date.getMonth() , date.getDate(), date.getHours())) < newDate(value.trip.ngaydi) ? e=>updateTicket(value) : e=>openNotificationErorr('Thất bại ' , 'Xe có thể đã khởi hành hoặc kết thúc rồi. Không thể  chỉnh sửa' , 3)
                                                    
                         }>
                        Chỉnh sửa  
                      </span>
                      }
                  
                  </td> 
                  <td>
                      { value.trangthaive === "DAHUY" || value.trangthaive ==='DANGUUTIEN'?
                        <span className="box disable">
                            Hủy vé
                        </span>
                      : 
                        <span className="box" onClick={ new Date( Date.UTC(date.getFullYear() , date.getMonth() , date.getDate(), date.getHours())) < newDate(value.trip.ngaydi) ? e=>onClickCancleTicket(value) : e=>openNotificationErorr('Thất bại ' , 'Xe có thể đã khởi hành hoặc kết thúc rồi. Không thể hủy vé' , 3)
                                                    
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
                                <div style={{
                                    display :'flex',
                                    justifyContent : 'space-between',
                                    marginBottom : '8px'
                                }}>
                                    <h3 className="history__title">VÉ XE THUỘC CHUYẾN XE : {slug}</h3>   
                                    <Button type="primary" size="large" onClick={onClickInsert}>
                                           Thêm vé xe
                                    </Button>
                                </div>
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
                                                {/* <th className="table__number"> 
                                                    Số ghế 
                                                </th> */}
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
                                                    Số ghế
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
                                                        Bạn chưa có vé xe nào
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