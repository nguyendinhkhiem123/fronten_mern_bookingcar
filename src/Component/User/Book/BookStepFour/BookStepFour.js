import React, { useEffect, useState } from 'react';
import Process from '../../Process/Process';
import {LeftOutlined} from '@ant-design/icons'
import { Layout , Row , Col , Form , Input , Button , Select } from 'antd';
import { openNotificationErorr , openNotificationSuccess} from '../../../Notfication/index';
import { useHistory, useLocation , Prompt } from 'react-router-dom';
import { useSelector  , } from 'react-redux';
import '../BookStepTwo/BookStepTwo.css';
import '../BookStepFour/BookStepFour.css';
import Payment from '../../../Payment/Payment'
import useLoading from '../../../HookLoading/HookLoading'
import * as ApiTicket from '../../../../Api/Ticket/index';
import Paypal from '../../../Payment/Payment';
const {  Content  } = Layout;
const { Option } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
function BookStepFour(props) {
    const location = useLocation();
    const history = useHistory();
    const state = location.state;
    const token = useSelector(state => state.token);
    const currentUser = useSelector(state => state.currentUser);
    const [ Loading , Hidden , Display] = useLoading();
    const [ isDisplayPayment ,  setIsDisplayPayment] = useState(false);
    const [ paymentData, setPaymentData] = useState({
        sdt  :  currentUser.sdt ,
        hovaten : currentUser.hovaten
    })
    const [ time , setTime ] =  useState(true);
  
    useEffect(()=>{
        if(!state){
            openNotificationErorr('Thất bại' , 'Vui lòng đi theo trình tự' ,3);
            history.push('/');
        }
        else{
            if(token){
                console.log(currentUser);
            }
            else{
                openNotificationErorr('Thất bại' , 'Vui lòng đăng nhập' ,3);
                history.replace('/signin');
            }
        }
    }, [])

  
    const ChangeStatus = async(body)=>{
        try{
          
            const res = await ApiTicket.UpdateStatusTicket(body);
            return res; 
        }catch(err){    
            Hidden();

        }
    }

    useEffect(()=>{
        
        let timeOut = setTimeout(async()=>{
            let bodyOne ={
                trangthai : "ACTIVE",
                chuyendi : state.chuyendi._id,
                soghedi : state.soghedi
            }
            let bodyTwo = {
                trangthai : "ACTIVE",
                chuyendi : state.chuyenve?._id,
                soghedi : state.sogheve
            }
            Display();
            let resOne = await ChangeStatus(bodyOne);
            let resTwo = state.loai === 2 ? await ChangeStatus(bodyTwo)  : null
            if(resOne.data.success || (state.loai == 2 && !resTwo) && resTwo.data.success ) {
                openNotificationErorr('Thất bại' , 'Đã quá thời gian thanh toán !.  Vui lòng làm lại từ đầu' ,3);
                history.replace('/');
   
            }
            
        },120000)
        return async ()=>{
            

          
         clearTimeout(timeOut);
               
        }
    },[])
    
    const formatMoney=(n) =>{
        return n.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }  
    const onChanegPayment =(e)=>{
        setPaymentData({
            ...paymentData,
            [e.target.name] : e.target.value
        })
    }
    const checkoutTicket = async(values)=>{
        let body = {
            loai : state.loai,
            hinhthuc : values.hinhthuc,
            sdt : values.sdt,
            hovaten :  values.hovaten,
            soghedi : state.soghedi,
            chuyendi : state.chuyendi

        }
        if(state.loai === 2){
            body = {
                ...body ,
                chuyenve : state.chuyenve,
                sogheve : state.sogheve
            }
          
        }
        try{
            Display();
            const res = await ApiTicket.checkOutTicket(body);
            Hidden();
            if(res.data.success){
                history.replace("/thanh-cong")
                openNotificationSuccess('Thành công' , res.data.message ,3);
            }
            else{
                openNotificationErorr('Thất bại' , res.data.message ,3);
            }
        }
        catch(err){
            Hidden();
            console.log(err);
            openNotificationErorr('Thất bại' ,'Lỗi hệ thống',3);
        }
    }
    const onFinish = (values)=>{
        if(values.hinhthuc === 'OFFLINE'){
            console.log('hello');
            checkoutTicket(values)
        }
        else{
            checkoutTicket  (values)
        }   
    }
    const onClickPrev = async()=>{
        let bodyOne ={
            trangthai : "ACTIVE",
            chuyendi : state.chuyendi._id,
            soghedi : state.soghedi
        }
        let bodyTwo = {
            trangthai : "ACTIVE",
            chuyendi : state.chuyenve?._id,
            soghedi : state.sogheve
        }
        Display();
        let resOne = await ChangeStatus(bodyOne);
        let resTwo = state.loai === 2 ? await ChangeStatus(bodyTwo)  : null
        if(resOne.data.success || (state.loai == 2 && !resTwo) && resTwo.data.success ) {
            history.push({
                pathname : "/chon-ghe",
                search : '?step=3',
                state : state
            })
        }
       
    }
    const onChange = (value)=>{
        value === "OFFLINE" ? setIsDisplayPayment(false) : setIsDisplayPayment(true);
    }
    const Sum =   ((state && state.sovedi) ? state.chuyendi.giave*state.sovedi : 0)
                    +
                    ((state && state.soveve) ? state.chuyenve.giave*state.soveve : 0)

    console.log(state);
    return (
        <div>
            <Content>
                <Process isActive={3}/>
                    <div className="site-layout-content" style={{overflowX:'hidden'}}>
        
                            <div className="step_two">
                                <div class="step_two--container">
                                    <div className="step__info">
                                        <div className="step__info--header">
                                                <p className="header__date">BẠN ĐÃ ĐẶT CHUYẾN XE ĐI</p>
                                                <p className="header__date">{state.loai === 2 ? "Lượt đi "+state.thogianbatdau : state.thogianbatdau }</p>
                                                <p className="header__route">{state ? `${state.noidi} ⇒ ${state.noiden}` : 'Không xác định'}</p>
                                        </div>
                                        <div className="step__info--body">
                                            <div style={{display : 'flex'  , justifyContent : 'space-between'}}>
                                                <div>
                                                    <p className="info__title">
                                                        Số lượng vé đã đặt : {(state && state.sovedi) ? `${state.sovedi} vé` : 'Không xác định'}
                                                    </p>
                                                    <p className="info__title">
                                                        Ghế : {(state && state.soghedi) ? 
                                                            state.soghedi.map(value =>{
                                                                return value+ " , "
                                                            })
                                                        : 'Không xác định'}
                                                    </p>
                                                    <p className="info__title">
                                                       Quãng đường : {(state && state.quangduong) ? `${state.quangduong} km` : 'Không xác định'}
                                                      </p>
                                                </div>
                                                <div>
                                                    <p class="info__title">
                                                        Giá vé : {(state && state.chuyendi.giave) ? formatMoney(state.chuyendi.giave.toString())+"đ/vé" : 'Không xác định'}
                                                    </p>
                                                    <p class="info__title">
                                                        Tổng tiền : {(state && state.chuyendi.giave) ? formatMoney((state.chuyendi.giave*state.sovedi).toString())+"đ" : 'Không xác định'}
                                                    </p>    
                                                    <p class="info__title">
                                                     Thời gian đến : {(state && state.thoigian) ? `${state.thoigian}h` : 'Không xác định'}
                                                    </p>           
                                                </div>
                                            </div>
                                               
                                               
                                              
                                               
                                        </div>
                                    </div>
                                </div>
                                { (state && state.loai === 2) ?
                                <div class="step_two--container">
                                        <div className="step__info">
                                            <div className="step__info--header">
                                                     <p className="header__date">BẠN ĐÃ ĐẶT CHUYẾN XE VỀ</p>
                                                    <p className="header__date">{state.loai === 2 ? "Lượt về "+state.thoigianve : state.thoigianve }</p>
                                                    <p className="header__route">{state ? `${state.noiden} ⇒ ${state.noidi}` : 'Không xác định'}</p>
                                            </div>
                                            <div className="step__info--body">
                                                <div style={{display : 'flex'  , justifyContent : 'space-between'}}>
                                                    <div>
                                                        <p className="info__title">
                                                            Số lượng vé đã đặt : {(state && state.soveve) ? `${state.soveve} vé` : 'Không xác định'}
                                                        </p>
                                                        <p className="info__title">
                                                            Ghế : {(state && state.sogheve) ? 
                                                                state.sogheve.map(value =>{
                                                                    return value+ " , "
                                                                })
                                                            : 'Không xác định'}
                                                         </p>
                                                            
                                                            <p className="info__title">
                                                            Quãng đường : {(state && state.quangduong) ? `${state.quangduong} km` : 'Không xác định'}
                                                            </p>
                                                    </div>
                                                    <div>
                                                         <p class="info__title">
                                                          Giá vé: {(state && state.chuyenve.giave) ? formatMoney(state.chuyenve.giave.toString())+"đ/vé": 'Không xác định'}
                                                             </p>
                                                             <p class="info__title">
                                                            Tổng tiền : {(state && state.chuyenve.giave) ? formatMoney((state.chuyenve.giave*state.soveve).toString())+"đ" : 'Không xác định'}
                                                            </p>  
                                                            <p class="info__title">
                                                                Thời gian đến : {(state && state.thoigian) ? `${state.thoigian}h` : 'Không xác định'}
                                                            </p>
                                                            
                                                    </div>
                                                </div>
                                                
                                        
                                                    
                                            </div>
                                        </div>
                                </div>
                                : 
                                null        
                                 }
                                <div className="step_two--container">
                                                <div className="step__info">
                                                    <div className="step__info--header">
                                                        <p className="header__date">THÔNG TIN KHÁCH HÀNG</p>
                                                    </div>
                                                    <div className="step__info--body">

                                               
                                                    <Form
                                                    {...layout}
                                                    name="basic"
                                                    initialValues={{ remember: true }}
                                                    onFinish={onFinish}
                                                    // onFinishFailed={onFinishFailed}
                                                    style={{margin :  "auto"}}
                                                    preserve={false}
                                                    >
                                                            <Form.Item
                                                                label="Họ và tên"
                                                                name="hovaten"
                                                                rules={[{ required: true, 
                                                                        message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                                                        
                                                                    }]}
                                                                initialValue={currentUser.hovaten}
                                                                hasFeedback
                                                                
                                                            >
                                                                <Input onChange={onChanegPayment} allowClear/>
                                                                
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="Địa chỉ"
                                                                name="diachi"
                                                                rules={[{ required: true, 
                                                                        message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                                                        
                                                                    }]}
                                                                hasFeedback
                                                                initialValue={currentUser.diachi}
                                                            >
                                                                <Input allowClear/>
                                                                
                                                            </Form.Item>
                                                                <Form.Item
                                                                    label="Số điện thoại"
                                                                    name="sdt"
                                                                    rules={[{ required: true, 
                                                                            message: "Không được bỏ trống !. Vui lòng nhập lại" ,                        
                                                                        },
                                                                        {
                                                                            len : 10,
                                                                            pattern: '0[3|5|7|8|9]+[0-9]{8}',
                                                                            message : 'Sai định dạng số điện thoại'
                                                                        }
                                                                        ]}
                                                                        initialValue={currentUser.sdt}
                                                                    hasFeedback
                                                        
                                                                >
                                                                <Input onChange={onChanegPayment}  allowClear/>
                                                                </Form.Item>
                                                                <Form.Item
                                                                    label="email"
                                                                    name="email"
                                                                    rules={[{ required: true, 
                                                                            message: "Không được bỏ trống !. Vui lòng nhập lại" ,                        
                                                                        },
                                                                        {
                                                                            type:"email",
                                                                            message:"Nhập email phải có @/*/.com"
                                                                        }
                                                                        ]}
                                                                    initialValue={currentUser.email}
                                                                    hasFeedback
                                                        
                                                                >
                                                                <Input allowClear/>
                                                                </Form.Item>
                                                                <Form.Item
                                                                    label="Hình thức thanh toán"
                                                                    name="hinhthuc"
                                                                    rules={[{ required: true, 
                                                                            message: "Không được bỏ trống !. Vui lòng nhập lại" ,                        
                                                                        },
                                                                        ]}
                                                                    hasFeedback
                                                                    initialValue="OFFLINE"
                                                        
                                                                >
                                                                <Select  onChange={onChange} defaultValue="OFFLINE">
                                                                    <Option value="OFFLINE">Thanh toán khi lên xe</Option>
                                                                    <Option value="ONLINE">Thanh toán qua Paypal</Option>
                                                                </Select>
                                                                </Form.Item>
                                                            <div style={{textAlign : 'right' , fontWeight : 500 , fontSize : '16px'}}>
                                                                Tổng cộng : <span style={{fontWeight : 300}}>
                                                                    {
                                                                        formatMoney((
                                                                          Sum
                                                                        ).toString()+"đ")
                                                                    }
                                                                    </span>             

                                                            </div>
                                                            <div  className="responsive-form footer__btn">
                                                            
                                                                <Button type="primary" htmlType="submit" className="btn">
                                                                        Đặt vé
                                                                </Button>
                                                            
                                                                        
                                                                        
                                                            </div>
                                                        </Form>   
                                                    </div>
                                                </div>
                                              </div>
                                </div>
                            <div className="step_two--footer">
                                <Button type="default" size="large" onClick={onClickPrev} >
                                    {<LeftOutlined />}
                                    QUAY LẠI
                                </Button>
                            </div>                               
                        </div>
                        {Loading}
                      
            </Content>
        </div>
    );
    
}

export default BookStepFour;