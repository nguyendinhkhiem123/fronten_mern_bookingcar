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
    const [ Loading , Hidden , Display] = useLoading(); 
    const [ oneTrip ,  setOneTrip ] = useState([]);
    const [ twoTrip ,  setTwoTrip ] = useState([]);
    const [ hoursOne, setHoursOne] = useState();
    const [ carOne , setCarOne ] = useState();
    const [ hoursTwo, setHoursTwo] = useState();
    const [ carTwo , setCarTwo ] = useState();
    const [ oneTicket , setOneTicket ] = useState([]);
    const [ twoTicket , setTwoTicket ] = useState([]);
    const [ numberTicketOne , setNumberTicketOne] = useState(1);
    const [ numberTicketTwo , setNumberTicketTwo] = useState(1);
    const state = location.state;
    console.log(state);
    const formatMoney=(n) =>{
        return n.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }   
    const getOneTrip = async()=>{
        try{
            Display();
            const body = {
                ngaydi : state.thogianbatdau,
                noidi : state.noidi,
                noiden : state.noiden,
            }
            
            const res = await ApiTrip.getOneTrip(body);
            console.log(res);
            Hidden();
            if(res.data.success){
                setOneTrip(res.data.body.oneTrip);
                setHoursOne(res.data.body.oneTrip[0].giodi);
                setCarOne(res.data.body.oneTrip[0].car._id);
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
            openNotificationErorr("Thất bại" , `Lỗi hệ thống` ,3);
            history.replace({
                pathname: '/tim-kiem',
                search: '?step=1',
                state: state
            })
        }
    }
    const getTwoTrip = async()=>{
        try{
            Display();
            const body = {
                ngaydi : state.thogianbatdau,
                ngayve :  state.thoigianve,
                noidi : state.noidi,
                noiden : state.noiden,

            }
            
            const res = await ApiTrip.getTwoTrip(body);
            console.log(res);
            Hidden();
            if(res.data.success){
                setOneTrip(res.data.body.oneTrip);
                setTwoTrip(res.data.body.twoTrip);
                setHoursOne(res.data.body.oneTrip[0].giodi);
                setCarOne(res.data.body.oneTrip[0].car._id);
                setHoursTwo(res.data.body.twoTrip[0].giodi);
                setCarTwo(res.data.body.twoTrip[0].car._id);
            
            }
            else{
                openNotificationErorr("Thất bại" , res.data.message, 300);
                history.push({
                    pathname: '/tim-kiem',
                    search: '?step=1',
                    state: state
                })
            }
        }
        catch{
            history.push({
                pathname: '/tim-kiem',
                search: '?step=1',
                state: state
            })
        }
    }
    useEffect(()=>{
        if(!state){
            openNotificationErorr('Thất bại' , "Vui lòng chọn địa điểm" ,300);
            history.push('/');
        }
        else{
           
            if(state.loai === 1){
                getOneTrip();
            }
            else{
                getTwoTrip();
            } 
          
        }
      
    },[])

    const getTicketTrip = async(body ,set)=>{
            try{
                const res = await ApiTicket.getTicketTrip(body);
                set(res.data.body)
            }catch(err){
                 console.log(err);
                 openNotificationErorr("Thất bại" , "Lỗi hệ thống" ,300);
            }
    }

    useEffect(()=>{
        const trips = oneTrip.filter((value,index)=>{
            return (value.giodi === hoursOne && value.car._id== carOne)
        })
        
        const body = {
            trip : trips[0]?._id
        }
        getTicketTrip(body,setOneTicket);
    },[hoursOne,carOne])

    useEffect(()=>{
        if(state.loai === 2){
            const trips = twoTrip.filter((value,index)=>{
                return (value.giodi === hoursTwo && value.car._id== carTwo)
            })
            
            const body = {
                trip : trips[0]?._id
            }
            getTicketTrip(body,setTwoTicket);
        }
       
    },[hoursTwo,carTwo])

   


    const unique = (arr)=> {
        let newArr = []
        for (let i = 0; i < arr.length; i++) {
          if (newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i])
          }
        }
        return newArr
      }
    let hoursOneTrip = [];
    let hoursTwoTrip = [];
    oneTrip.forEach((value , index)=>{
        hoursOneTrip.push(value.giodi);
    })

    if(hoursOneTrip.length > 0 ){
        hoursOneTrip = unique(hoursOneTrip)
    }
    const onChangeHoursOne = (value)=>{
        console.log(oneTrip , typeof value , value)
        oneTrip.forEach((valuein , index)=>{
            if(valuein.giodi == value){
                console.log('hello')
                setCarOne(valuein.car._id)
                return;
            }
        })
        setHoursOne(value);
       
    }
    const onChangeCarOne = (value) =>{
        setCarOne(value);
    }
    const carOneFilter = oneTrip.filter((value , index) =>{
        return value.giodi === hoursOne
    })

    /* Khu hoi */
    twoTrip.forEach((value , index)=>{
        hoursTwoTrip.push(value.giodi);
    })

    if(hoursTwoTrip.length > 0 ){
        hoursTwoTrip = unique(hoursTwoTrip)
    }
    const onChangeHoursTwo = (value)=>{
        console.log(twoTrip , typeof value , value)
        twoTrip.forEach((valuein , index)=>{
            if(valuein.giodi == value){
                console.log('hello')
                setCarTwo(valuein.car._id)
                return;
            }
        })
        setHoursTwo(value);
       
    }
    const onChangeCarTwo = (value) =>{
        setCarTwo(value);
    }
    const carTwoFilter = twoTrip.filter((value , index) =>{
        return value.giodi === hoursTwo
    })

    let  filterTicketTwo = [];
    let filterTicketOne  = [];
    if(oneTicket.length > 0){
        filterTicketOne = oneTicket.filter((value,index) =>{
            return value.thoigiandat === null
        })
    }
    if(twoTicket.length > 0){
        filterTicketTwo= twoTicket.filter((value,index) =>{
            return value.thoigiandat === null
        })
    }
    const onChangeTicketOne = (value)=>{
            console.log(value);
           setNumberTicketOne(value) 
    }
    const onChangeTicketTwo = (value)=>{
        setNumberTicketTwo(value) 
    }
    const onClickPrev =()=>{
        history.push({
            pathname: '/tim-kiem',
            search: '?step=1',
            state: state
        })
    }
    const onClickNext = async()=>{

        if(numberTicketOne === null|| numberTicketTwo === null){
            openNotificationErorr("Thất bại" , `Vui lòng nhập số vé !` ,3);
            return;
        }

        if(state.loai ===1){
            try{
                Display();
                const trips = oneTrip.filter((value,index)=>{
                    return (value.giodi === hoursOne && value.car._id== carOne)
                })
                const body = {
                    chuyendi : trips[0]?._id,
                    sovedi : numberTicketOne,
                }
                const res = await ApiTicket.checkNumberTicket(body);
                Hidden();

                if(res.data.success){
                    history.push({
                        pathname: "/chon-ghe",
                        search : "?step=3",
                        state : {
                            ...state,
                            danhsachvedi : oneTicket,
                            sovedi : numberTicketOne,
                            
                        }
                    })
                }

            }
            catch(e){
                Hidden();
                console.log(e);
                openNotificationErorr("Thất bại" , `Lỗi hệ thống` ,3);
            }
        }
        else{
            try{
                Display();
                const trips = oneTrip.filter((value,index)=>{
                    return (value.giodi === hoursOne && value.car._id== carOne)
                })
                const tripsv = twoTrip?.filter((value,index)=>{
                    return (value.giodi === hoursTwo && value.car._id== carTwo)
                })
                const bodyOne= {
                    chuyendi : trips[0]?._id,
                    sovedi : numberTicketOne,
                 

                }
                const bodyTwo ={
                    chuyendi : tripsv[0]?._id,
                    sovedi : numberTicketTwo
                }
                const res = await Promise.all([ApiTicket.checkNumberTicket(bodyOne),ApiTicket.checkNumberTicket(bodyTwo)]);
                if(res.data.success){
                    history.push({
                        pathname: "/chon-ghe",
                        search : "?step=3",
                        state : {
                            ...state,
                            danhsachvedi : oneTicket,
                            sovedi : numberTicketOne,
                            danhsachveve : twoTicket,
                            soveve : numberTicketTwo,
                            
                        }
                    })
                }
                Hidden();
            }
            catch(e){
                Hidden();
                console.log(e);
                openNotificationErorr("Thất bại" , `Lỗi hệ thống` ,3);
            }
        }
    }
    return (
        <div>
            <Content>
                <div className="site-layout-content" style={{overflowX:'hidden'}}>
                    <Process isActive={1}></Process>
                    <div className="step_two">
                                <div class="step_two--container">
                                    <div className="step__info">
                                        <div className="step__info--header">
                                                <p className="header__date">{state ? state.thogianbatdau : 'Không xác định'}</p>
                                                <p className="header__route">{state ? `${state.noidi} ⇒ ${state.noiden}` : 'Không xác định'}</p>
                                        </div>
                                        <div className="step__info--body">
                                                <div className="mt-10">
                                                    Giờ khởi hành :
                                                    <Select value={hoursOne} onChange={onChangeHoursOne} style={{ width: '100%' , marginTop : '10px' }}>
                                                        {
                                                            hoursOneTrip.length > 0 ?
                                                            hoursOneTrip.map((value,index)=>{
                                                                return (
                                                                    <Option key={index} value={value}>{value} giờ</Option>
                                                                )
                                                            })
                                                            :
                                                            null     
                                                        }
                                                    </Select>
                                                </div>
                                                <div className="mt-10">
                                                    Biển số xe :
                                                    <Select value={carOne} onChange={onChangeCarOne} style={{ width: '100%' , marginTop : '10px' }}>
                                                        {
                                                            carOneFilter.length > 0 ?
                                                            carOneFilter.map((value,index)=>{
                                                                return (
                                                                 <Option value={value.car._id}>{value.car.biensoxe}</Option>
                                                                 )
                                                            })
                                                            : null
                                                        }
                                                    </Select>
                                                </div>
                                                <div className="mt-10">
                                                    <p>Số vé đặt :</p>
                                                    <InputNumber min={1} max={filterTicketOne.length} value={numberTicketOne} onChange={onChangeTicketOne} style={{width : '100%    '}}/>
                                                </div>
                                                {/* <p>
                                                    Thời gian về:
                                                    <Select defaultValue="lucy" style={{ width: '100%' , marginTop : '10px' }}>
                                                        <Option value="jack">Jack</Option>
                                                        <Option value="lucy">Lucy</Option>
                                                    </Select>
                                                </p> */}
                                                 <p className="info__title">
                                                    Số lượng vé : {(oneTicket && oneTicket.length) ? oneTicket.length : 'Không xác định'}
                                                </p>
                                                <p className="info__title">
                                                    Số lượng còn lại vé : {(filterTicketOne && filterTicketOne.length ) ? filterTicketOne.length : 'Không xác định'}
                                                </p>
                                                <p className="info__title">
                                                    Quãng đường : {(state && state.quangduong) ? `${state.quangduong} km` : 'Không xác định'}
                                                </p>
                                                <p class="info__title">
                                                     Thời gian đến : {(state && state.thoigian) ? `${state.thoigian}h` : 'Không xác định'}
                                                </p>
                                                <p class="info__title">
                                                     Giá vé: {(state && state.giave) ? formatMoney(state.giave.toString())+"đ/vé" : 'Không xác định'}
                                                </p>
                                        </div>
                                    </div>
                                </div>
                                {   (state && state.loai === 2 ) ?
                                <div class="step_two--container">
                                        <div className="step__info">
                                            <div className="step__info--header">
                                                    <p className="header__date">{state ? state.thogianbatdau : 'Không xác định'}</p>
                                                    <p className="header__route">{state ? `${state.noiden} ⇒ ${state.noidi}` : 'Không xác định'}</p>
                                            </div>
                                            <div className="step__info--body">
                                                     <div className="mt-10">
                                                     Giờ khởi hành :
                                                        <Select value={hoursTwo} onChange={onChangeHoursTwo} style={{ width: '100%' , marginTop : '10px' }}>
                                                            {
                                                                hoursTwoTrip.length > 0 ?
                                                                hoursTwoTrip.map((value,index)=>{
                                                                    return (
                                                                        <Option key={index} value={value}>{value} giờ</Option>
                                                                    )
                                                                })
                                                                : 
                                                                null     
                                                            }
                                                        </Select>
                                                     </div>
                                                    <div className="mt-10">
                                                    Biển số xe :
                                                    <Select value={carTwo} onChange={onChangeCarTwo} style={{ width: '100%' , marginTop : '10px' }}>
                                                        {
                                                            carTwoFilter.length > 0 ?
                                                            carTwoFilter.map((value,index)=>{
                                                                return (
                                                                 <Option value={value.car._id}>{value.car.biensoxe}</Option>
                                                                 )
                                                            })
                                                            : null
                                                        }
                                                    </Select>
                                                    </div>
                                                    <div className="mt-10">
                                                        <p>Số vé đặt :</p>
                                                     <InputNumber min={1} max={filterTicketTwo.length} value={numberTicketTwo} onChange={onChangeTicketTwo} />
                                                      </div>
                                                     <p className="info__title">
                                                         Số lượng vé : {(twoTicket && twoTicket.length) ? twoTicket.length : 'Không xác định'}
                                                     </p>
                                                     <p className="info__title">
                                                          Số lượng còn lại vé : {(filterTicketTwo && filterTicketTwo.length) ? filterTicketTwo.length : 'Không xác định'}
                                                     </p>
                                                    <p className="info__title">
                                                       Quãng đường : {(state && state.quangduong) ? `${state.quangduong} km` : 'Không xác định'}

                                                    </p>
                                                    <p class="info__title">
                                                        Thời gian đến : {(state && state.thoigian) ? `${state.thoigian}h` : 'Không xác định'}
                                                    </p>
                                                    <p class="info__title">
                                                     Giá vé: {(state && state.giave) ? formatMoney(state.giave.toString())+"đ/vé": 'Không xác định'}
                                                </p>
                                            </div>
                                        </div>
                                  
                                </div>
                                : 
                                null        
                            }
                           
                    </div>
                    <div className="step_two--footer">
                        <Button type="default" size="large" onClick={onClickPrev} >
                            {<LeftOutlined />}
                            QUAY LẠI
                        </Button>
                        <Button type="primary" size="large" onClick={onClickNext} >
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