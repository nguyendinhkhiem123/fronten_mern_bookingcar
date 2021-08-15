import React from 'react';
import { useEffect , useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout , Button ,Select , InputNumber} from 'antd';
import { RightOutlined ,LeftOutlined, CodeSandboxCircleFilled } from '@ant-design/icons'
import '../BookStepTwo/BookStepTwo.css';
import Process from '../../Process/Process';
import {openNotificationErorr} from '../../../Notfication/index';
import useLoading  from '../../../HookLoading/HookLoading';
import * as ApiTrip from '../../../../Api/Trip/index';
import * as ApiTicket from '../../../../Api/Ticket/index';
const { Option } = Select;
const {  Content } = Layout;
function BookStepTwo(props) {
    const location = useLocation();
    const history = useHistory();
    const token = useSelector(state => state.token);
    const [ Loading , Hidden , Display] = useLoading(); 
    const [ listHourOne , setListHourOne] = useState([]);
    const [ hourOne , setHourOne]  = useState(0);
    const [ numberTicketOne , setNumberTicketOne] = useState(0);
    const [ numberTicketOneEnbale , setNumberTicketOneEnbale] = useState(1);
    const [ oneTrip , setOneTrip] =  useState();


    const [ listHourTwo , setListHourTwo] = useState([]);
    const [ hourTwo , setHourTwo]  = useState(0);
    const [ numberTicketTwo , setNumberTicketTwo] = useState(0);
    const [ numberTicketTwoEnbale , setNumberTicketTwoEnbale] = useState(1);
    const [ twoTrip , setTwoTrip] =  useState();
    const state = location.state;


    const formatMoney=(n) =>{
        return n.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }   

    const getHourTrip = async()=>{
        try{
            Display();
            let body = {
                loai  : state.loai,
                ngaydi : state.thogianbatdau,
                noidi : state.noidi,
                noiden : state.noiden,
            }
            if(state.loai === 2){
                body = {
                    ...body ,
                    ngayve : state.thoigianve
                }
            }
            console.log(body);
            const res = await ApiTrip.getHourTrip(body);
            console.log(res);
            Hidden();
            if(res.data.success){
                
                    setHourOne(res.data.body.hoursOne[0]);
                    setListHourOne(res.data.body.hoursOne);

                    setHourTwo(res.data.body.hoursTwo.length > 0 ? res.data.body.hoursTwo[0] : 0);
                    setListHourTwo(res.data.body.hoursTwo.length > 0 ? res.data.body.hoursTwo : []);
                   
            }
            else{
                openNotificationErorr("Thất bại" , res.data.message ,3);
                history.replace({
                    pathname: '/tim-kiem',
                    search: '?step=1',
                    state: state
                })
            }
            
        }
        catch(err){
            console.log(err);
            openNotificationErorr("Thất bại" ,"Lỗi hệ thống" ,3);
        }
    }
  
    console.log(state);
    useEffect(()=>{
        if(!token){
            openNotificationErorr('Thất bại' , "Vui lòng đăng nhập " ,3);
            history.push('/signin');
        } 
        if(!state){
            openNotificationErorr('Thất bại' , "Vui lòng chọn địa điểm" ,3);
            history.push('/');
        }
        else{
            getHourTrip(); 
        }
      
    },[])
  
    const getTicketHoursTrip  = async(body ,setNum , setTrip)=>{
        try{
            Display();
          
            console.log(body);
            const res = await ApiTrip.getTicketHourTrip(body);
            console.log(res , hourOne );
            Hidden();
            if(res.data.success){
                setNum(res.data.body.numberTicket);
                setTrip(res.data.body.Trip);
            }
            else{
                openNotificationErorr("Thất bại" , res.data.message ,3);
               
            }
            
        }
        catch(err){
            console.log(err);
            openNotificationErorr("Thất bại" ,"Lỗi hệ thống" ,3);
        }
    }
   
    useEffect(()=>{
        let body = {
            ngaydi : state.thogianbatdau,
            noidi : state.noidi,
            noiden : state.noiden,
            giodi  : hourOne,
        }
        hourOne !== 0 ? getTicketHoursTrip(body ,setNumberTicketOne, setOneTrip) : console.log("hello");
    }, [hourOne])

    useEffect(()=>{
        let body = {
            ngaydi : state.thoigianve,
            noidi : state.noiden,
            noiden : state.noidi,
            giodi  : hourTwo,
        }
        hourTwo !== 0 ? getTicketHoursTrip(body,setNumberTicketTwo, setTwoTrip) : console.log("hello");
    }, [hourTwo])
    
    console.log(numberTicketOne);
    const onChangeHourOne =(value)=>{
        setHourOne(value)
    }
    const onChangeHourTwo  = (value)=>{
        setHourTwo(value)
    }
    const onChangeTicketOne =(value)=>{
        setNumberTicketOneEnbale(value);
    }
    const onChangeTicketTwo = (value)=>{
        setNumberTicketTwoEnbale(value);
    }
    const onClickPrev =()=>{
        history.push({
            pathname: '/tim-kiem',
            search: '?step=1',
            state: state
        })
    }
    const onClickNext = async()=>{
        
        if(!numberTicketOne){
            openNotificationErorr("Thất bại" , `Chuyến có thể đã hết vé . Vui lòng quay lại` ,3);
            console.log("Hello1");
            return;
            
        }
        if(state.loai == 2 && !numberTicketTwo){
            console.log("Hello1");
            openNotificationErorr("Thất bại" , `Chuyến có thể đã hết vé . Vui lòng quay lại` ,3);
            return;
        }
        try{
            Display();
            let bodyOne ={
                chuyendi : oneTrip?._id ,
                sovedi : numberTicketOne
            }
            let resOne = await ApiTicket.checkNumberTicket(bodyOne);
            let resTwo = null
            if(state.loai === 2){
                let bodyTwo = {
                    chuyendi : twoTrip?._id ,
                     sovedi : numberTicketTwo
                }
                resTwo = await ApiTicket.checkNumberTicket(bodyTwo);
            }

            if(state.loai == 1){
                if(resOne.data.success){
                   history.push({
                        pathname: "/chon-ghe",
                        search : "?step=3",
                        state : {
                            ...state,
                            chuyendi : oneTrip,
                            sovedi : numberTicketOneEnbale,
                            
                        }
                    })
                }
                else{
                    Hidden();
                    openNotificationErorr("Thất bại" , resOne.data.message ,3);
                }
            }
            else{
                if(resOne.data.success &&  resTwo.data.success ){
                    history.push({
                         pathname: "/chon-ghe",
                         search : "?step=3",
                         state : {
                             ...state,
                             chuyendi : oneTrip,
                             sovedi : numberTicketOneEnbale,
                             chuyenve : twoTrip,
                             soveve : numberTicketTwoEnbale
                             
                         }
                     })
                 }
                 else{
                     Hidden();
                     openNotificationErorr("Thất bại" , resOne.data.message + " HOẶC " + resTwo.data.message ,3);
                 }
            }
        }catch(err){
            console.log(err);
            Hidden();
            openNotificationErorr("Thất bại" , "Lỗi hệ thống hehe" ,3);
        }
    }
    console.log(oneTrip , twoTrip);
    return (
        <div style={{height : '100vh' }}>
            <Content>
                <div className="site-layout-content" style={{overflowX:'hidden'}}>
                    <Process isActive={1}></Process>
                    <div className="step_two">
                                <div class="step_two--container">
                                    <div className="step__info">
                                      <div className="header__title">Loại vé : {state.loai === 2 ? "Khứ hồi"  : "Một chiều"}</div>
                                        <div className="info">
                                            <div className="step__info--header">
                                                    <p className="header__date">{state.loai == 2 ? "Lượt đi "+state.thogianbatdau : state.thogianbatdau }</p>
                                                    <p className="header__route">{state ? `${state.noidi} ⇒ ${state.noiden}` : 'Không xác định'}</p>
                                            </div>
                                                <div className="step__info--body">
                                                        <div className="mt-10">
                                                            <span class="title__option">Giờ khởi hành :</span>
                                                            <Select value={hourOne} onChange={onChangeHourOne} style={{ width: '100%' , marginTop : '10px' }}>
                                                                {
                                                                    listHourOne.length > 0 ?
                                                                    listHourOne.map((value,index)=>{
                                                                        return (
                                                                            <Option key={index} value=
                                                                            {value}>{value} giờ</Option>
                                                                        )
                                                                    })
                                                                    :
                                                                    null     
                                                                }
                                                            </Select>
                                                        </div>
                                                        <div className="mt-10">
                                                            <span class="title__option">Biển số xe :</span>
                                                            <Select value={oneTrip ? oneTrip.car.biensoxe : null} style={{ width: '100%' , marginTop : '10px' }}>
                                                                <Option value={oneTrip ? oneTrip.car.biensoxe : null}> {oneTrip ? oneTrip.car.biensoxe : "Không xác định"} </Option>
                                                            </Select>
                                                        </div>
                                                        <div className="mt-10">
                                                            <span class="title__option">Số vé đặt :</span>
                                                            <InputNumber 
                                                                min={1} 
                                                                max={numberTicketOne} 
                                                                value={numberTicketOneEnbale}
                                                                onChange={onChangeTicketOne} 
                                                                style={{width : '100%'}}
                                                            />
                                                        </div>
                                                        <div style={{display : 'flex' , justifyContent:"space-between"}}>
                                                            <div>
                                                                    <p className="info__title">
                                                                    Số lượng còn lại vé : {numberTicketOne > 0? numberTicketOne+" vé ": 'Không xác định'}
                                                                </p>
                                                                <p className="info__title">
                                                                    Quãng đường : {(state && state.quangduong) ? `${state.quangduong} km` : 'Không xác định'}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                    <p class="info__title">
                                                                    Hành trình : {(state && state.thoigian) ? `${state.thoigian}h` : 'Không xác định'}
                                                                </p>
                                                                <p class="info__title">
                                                                    Giá vé: {(oneTrip) ? formatMoney(oneTrip.giave.toString())+"đ/vé" : 'Không xác định'}
                                                                </p>
                                                            </div>
                                                        </div>  
                                                </div>
                                        </div>  
                                        {
                                            (state.loai == 2) ? 
                                            <div className="info">
                                              
                                                <div className="step__info--header">
                                                            <p className="header__date">{state.loai == 2 ? "Lượt về "+state.thoigianve : state.thoigianve }</p>
                                                            <p className="header__route">{state ? `${state.noiden} ⇒ ${state.noidi}` : 'Không xác định'}</p>
                                                    </div>
                                                <div className="step__info--body">
                                                        <div className="mt-10">
                                                        <span class="title__option">Giờ khởi hành :</span>
                                                            <Select value={hourTwo} onChange={onChangeHourTwo} style={{ width: '100%' , marginTop : '10px' }}>
                                                            {
                                                                listHourTwo.length > 0 ?
                                                                    listHourTwo.map((value,index)=>{
                                                                        return (
                                                                            <Option key={index} value=
                                                                            {value}>{value} giờ</Option>
                                                                        )
                                                                    })
                                                                    :
                                                                    null    
                                                                    } 
                                                            </Select>
                                                        </div>
                                                        <div className="mt-10">
                                                        <span class="title__option">Biển số xe :</span>
                                                        <Select value={ twoTrip ? twoTrip.car.biensoxe : null} style={{ width: '100%' , marginTop : '10px' }}>
                                                            <Option value={ twoTrip ? twoTrip.car.biensoxe : null}> {twoTrip  ? twoTrip.car.biensoxe : "Không xác định"} </Option>
                                                        </Select>
                                                        </div>
                                                        <div className="mt-10">
                                                        <span class="title__option">Số vé đặt :</span>
                                                        <InputNumber min={1} max={numberTicketTwo} value={numberTicketTwoEnbale} onChange={onChangeTicketTwo} style={{width : '100%'}}/>
                                                        </div>
                                                        
                                                        <div style={{display : 'flex' , justifyContent : 'space-between'}}>
                                                            <div>
                                                                    <p className="info__title">
                                                                    Số lượng còn lại vé : {(numberTicketTwo) ? numberTicketTwo+ " vé" : 'Không xác định'}
                                                                    </p>
                                                                    <p className="info__title">
                                                                    Quãng đường : {(state && state.quangduong) ? `${state.quangduong} km` : 'Không xác định'}

                                                                    </p>
                                                            </div>
                                                            <div>
                                                                    <p class="info__title">
                                                                    Thời gian đến : {(state && state.thoigian) ? `${state.thoigian}h` : 'Không xác định'}
                                                                    </p>
                                                                    <p class="info__title">
                                                                    Giá vé: {(twoTrip) ? formatMoney(twoTrip.giave.toString())+"đ/vé": 'Không xác định'}
                                                                    </p>
                                                            </div>
                                                        </div>
                                                </div>
                                         </div>  : null
                                        }
                                    </div>
                                </div>
                           
                    </div>
                    <div className="step_two--footer">
                        <Button type="default" size="large" onClick={onClickPrev} >
                            {<LeftOutlined />}
                            QUAY LẠI    
                        </Button>
                        <Button type="primary" className="btn__next" size="large" onClick={onClickNext} >
                                TIẾP TỤC
                                {<RightOutlined />}
                        </Button>
                    </div>
                </div>         
                {Loading}     
            </Content>
        </div>
    );
}

export default BookStepTwo;