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
                openNotificationErorr("Th???t b???i" , res.data.message ,3);
                history.replace({
                    pathname: '/tim-kiem',
                    search: '?step=1',
                    state: state
                })
            }
            
        }
        catch(err){
            console.log(err);
            openNotificationErorr("Th???t b???i" ,"L???i h??? th???ng" ,3);
        }
    }
  
    console.log(state);
    useEffect(()=>{
        if(!token){
            openNotificationErorr('Th???t b???i' , "Vui l??ng ????ng nh???p " ,3);
            history.push('/signin');
        } 
        console.log(state);
        if(!state){
            openNotificationErorr('Th???t b???i' , "Vui l??ng ch???n ?????a ??i???m" ,3);
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
                openNotificationErorr("Th???t b???i" , res.data.message ,3);
               
            }
            
        }
        catch(err){
            console.log(err);
            openNotificationErorr("Th???t b???i" ,"L???i h??? th???ng" ,3);
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

    console.log(state);
    const onClickNext = async()=>{
        

        if(!numberTicketOne){
            openNotificationErorr("Th???t b???i" , `Chuy???n ??i c?? th??? ???? h???t v?? . Vui l??ng quay l???i` ,3);
            return;
            
        }
        if(state.loai == 2 && !numberTicketTwo){
            openNotificationErorr("Th???t b???i" , `Chuy???n v??? c?? th??? ???? h???t v?? . Vui l??ng quay l???i` ,3);
            return;
        }
        let startDate = new Date(state.thogianbatdau);
        let startEnd = new Date(state.thoigianve);
        console.log(state.thoigianve);
        if(new Date() > new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(), hourOne)){
            openNotificationErorr("Th???t b???i" , `Chuy???n v??? xe ??i ???? kh???i h??nh kh??ng th??? ?????t v?? . Vui l??ng quay l???i` ,3);
            return;
        }

        if(state.loai === 2 &&  new Date() > new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(), hourTwo)){
            openNotificationErorr("Th???t b???i" , `Chuy???n v??? xe v??? ???? kh???i h??nh kh??ng th??? ?????t v?? . Vui l??ng quay l???i` ,3);
            return;
        }

    
  
        console.log(new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),hourOne+state.thoigian+1) , new Date(startEnd.getFullYear(),startDate.getMonth(),startDate.getDate(), hourTwo) , )
        if(state.loai === 2 && 
            new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),hourOne + state.thoigian + 2) > new Date(startEnd.getFullYear(),startEnd.getMonth(),startEnd.getDate(), hourTwo)
        ){
            // console.log( state.thoigianbatdau === state.thoigianve ,  state.thoigian , hourOne , hourTwo)
            openNotificationErorr("Th???t b???i" , `Chuy???n v??? xe kh??? h???i kh??ng ph?? h???p th???i gian . Vui l??ng quay l???i` ,3);
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
                    openNotificationErorr("Th???t b???i" , resOne.data.message ,3);
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
                     openNotificationErorr("Th???t b???i" , resOne.data.message + " HO???C " + resTwo.data.message ,3);
                 }
            }
        }catch(err){
            console.log(err);
            Hidden();
            openNotificationErorr("Th???t b???i" , "L???i h??? th???ng hehe" ,3);
        }
    }
    console.log(oneTrip , twoTrip , numberTicketOne);
    return (
        <div>
            <Content>
                <div className="site-layout-content" style={{overflowX:'hidden'}}>
                    <Process isActive={1}></Process>
                    <div className="step_two">
                                <div class="step_two--container">
                                    <div className="step__info">
                                      <div className="header__title">Lo???i v?? : {state.loai === 2 ? "Kh??? h???i"  : "M???t chi???u"}</div>
                                        <div className="info">
                                            <div className="step__info--header">
                                                    <p className="header__date">{state.loai == 2 ? "L?????t ??i "+state.thogianbatdau : state.thogianbatdau }</p>
                                                    <p className="header__route">{state ? `${state.noidi} ??? ${state.noiden}` : 'Kh??ng x??c ?????nh'}</p>
                                            </div>
                                                <div className="step__info--body">
                                                        <div className="mt-10">
                                                            <span class="title__option">Gi??? kh???i h??nh :</span>
                                                            <Select value={hourOne} onChange={onChangeHourOne} style={{ width: '100%' , marginTop : '10px' }}>
                                                                {
                                                                    listHourOne.length > 0 ?
                                                                    listHourOne.map((value,index)=>{
                                                                        return (
                                                                            <Option key={index} value=
                                                                            {value}>{value} gi???</Option>
                                                                        )
                                                                    })
                                                                    :
                                                                    null     
                                                                }
                                                            </Select>
                                                        </div>
                                                        <div className="mt-10">
                                                            <span class="title__option">Bi???n s??? xe :</span>
                                                            <Select value={oneTrip ? oneTrip.car._id : null} style={{ width: '100%' , marginTop : '10px' }}>
                                                                <Option value={oneTrip ? oneTrip.car._id : null}> {oneTrip ? oneTrip.car._id : "Kh??ng x??c ?????nh"} </Option>
                                                            </Select>
                                                        </div>
                                                        <div className="mt-10">
                                                            <span class="title__option">S??? v?? ?????t :</span>
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
                                                                    S??? l?????ng c??n l???i v?? : {numberTicketOne > 0? numberTicketOne+" v?? ": 'Kh??ng x??c ?????nh'}
                                                                </p>
                                                                <p className="info__title">
                                                                    Qu??ng ???????ng : {(state && state.quangduong) ? `${state.quangduong} km` : 'Kh??ng x??c ?????nh'}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                    <p class="info__title">
                                                                    H??nh tr??nh : {(state && state.thoigian) ? `${state.thoigian}h` : 'Kh??ng x??c ?????nh'}
                                                                </p>
                                                                <p class="info__title">
                                                                    Gi?? v??: {(oneTrip) ? formatMoney(oneTrip.giave.toString())+"??/v??" : 'Kh??ng x??c ?????nh'}
                                                                </p>
                                                            </div>
                                                        </div>  
                                                </div>
                                        </div>  
                                        {
                                            (state.loai == 2) ? 
                                            <div className="info">
                                              
                                                <div className="step__info--header">
                                                            <p className="header__date">{state.loai == 2 ? "L?????t v??? "+state.thoigianve : state.thoigianve }</p>
                                                            <p className="header__route">{state ? `${state.noiden} ??? ${state.noidi}` : 'Kh??ng x??c ?????nh'}</p>
                                                    </div>
                                                <div className="step__info--body">
                                                        <div className="mt-10">
                                                        <span class="title__option">Gi??? kh???i h??nh :</span>
                                                            <Select value={hourTwo} onChange={onChangeHourTwo} style={{ width: '100%' , marginTop : '10px' }}>
                                                            {
                                                                listHourTwo.length > 0 ?
                                                                    listHourTwo.map((value,index)=>{
                                                                        return (
                                                                            <Option key={index} value=
                                                                            {value}>{value} gi???</Option>
                                                                        )
                                                                    })
                                                                    :
                                                                    null    
                                                                    } 
                                                            </Select>
                                                        </div>
                                                        <div className="mt-10">
                                                        <span class="title__option">Bi???n s??? xe :</span>
                                                        <Select value={ twoTrip ? twoTrip.car._id : null} style={{ width: '100%' , marginTop : '10px' }}>
                                                            <Option value={ twoTrip ? twoTrip.car._id : null}> {twoTrip  ? twoTrip.car._id : "Kh??ng x??c ?????nh"} </Option>
                                                        </Select>
                                                        </div>
                                                        <div className="mt-10">
                                                        <span class="title__option">S??? v?? ?????t :</span>
                                                        <InputNumber min={1} max={numberTicketTwo} value={numberTicketTwoEnbale} onChange={onChangeTicketTwo} style={{width : '100%'}}/>
                                                        </div>
                                                        
                                                        <div style={{display : 'flex' , justifyContent : 'space-between'}}>
                                                            <div>
                                                                    <p className="info__title">
                                                                    S??? l?????ng c??n l???i v?? : {(numberTicketTwo) ? numberTicketTwo+ " v??" : 'Kh??ng x??c ?????nh'}
                                                                    </p>
                                                                    <p className="info__title">
                                                                    Qu??ng ???????ng : {(state && state.quangduong) ? `${state.quangduong} km` : 'Kh??ng x??c ?????nh'}

                                                                    </p>
                                                            </div>
                                                            <div>
                                                                    <p class="info__title">
                                                                    Th???i gian ?????n : {(state && state.thoigian) ? `${state.thoigian}h` : 'Kh??ng x??c ?????nh'}
                                                                    </p>
                                                                    <p class="info__title">
                                                                    Gi?? v??: {(twoTrip) ? formatMoney(twoTrip.giave.toString())+"??/v??": 'Kh??ng x??c ?????nh'}
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
                            QUAY L???I    
                        </Button>
                        <Button type="primary" className="btn__next" size="large" onClick={onClickNext} >
                                TI???P T???C
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