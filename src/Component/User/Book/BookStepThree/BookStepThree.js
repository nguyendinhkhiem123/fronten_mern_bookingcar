import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout , Button , Row , Col ,Select } from 'antd';
import { RightOutlined ,LeftOutlined } from '@ant-design/icons'
import * as ApiTicket from '../../../../Api/Ticket/index';
import '../BookStepTwo/BookStepTwo.css';
// import '../BookStepThree/BookStepThree.css';
import Process from '../../Process/Process';
import {openNotificationErorr} from '../../../Notfication/index';
import useLoading from '../../../HookLoading/HookLoading';
const { Option } = Select;
const {  Content } = Layout;
function BookStepThree(props) {
    const location = useLocation();
    const history = useHistory();
    const token = useSelector(state => state.token);
    const [Loading , Hidden , Display] =  useLoading();
    const state = location.state;
    console.log(state);
    const [ oneTicket , setOneTicket ] = useState([]);
    const [ twoTicket , setTwoTicket ] = useState([]);
    const [ oneNumberTicket , setOneNumberTicket ] = useState(0);
    const [ twoNumberTicket , setTwoNumberTicket ] = useState(0);
    const [ numOneCar , setNumOneCar] = useState([]);
    const [ numTwoCar , setNumTwoCar] = useState([]);
    const [ oneListBuildOne, setOneListBuildOne ] = useState([]);
    const [ oneListBuildTwo, setOneListBuildTwo ] = useState([]);
    const [ twoListBuildOne, setTwoListBuildOne ] = useState([]);
    const [ twoListBuildTwo, setTwoListBuildTwo ] = useState([]);
   
    useEffect(()=>{

        if(!token){
            openNotificationErorr('Thất bại' , "Vui lòng đăng nhập" ,3);
            history.push('/signin');
        }
        if(!state){     
            openNotificationErorr('Thất bại' , 'Vui lòng chọn đi theo trình tự' ,3);
            history.push('/');
        }
        else{
            fectchAllTicket();
        }
    },[])
    
    const fectchAllTicket = async()=>{
        try{
            Display();
            setOneNumberTicket(state.sovedi);

            let resOne = await ApiTicket.getTicketTrip({trip : state.chuyendi._id});
            console.log(resOne);
        
            if(resOne.data.success){
                const tempOne = [...resOne.data.body]
                
                setOneTicket(resOne.data.body);
                setOneListBuildOne(tempOne.splice(0,20))
                setOneListBuildTwo(tempOne.splice(0,20))
            }
         

            if(state.loai === 2){
               
                setTwoNumberTicket(state.soveve);
                let resTwo = await ApiTicket.getTicketTrip({trip : state.chuyenve._id});
                console.log(resTwo);
                if(resTwo.data.success){
                    const tempTwo = [...resTwo.data.body]
                    setTwoTicket(resTwo.data.body);
                    setTwoListBuildOne(tempTwo.splice(0,20))
                    setTwoListBuildTwo(tempTwo.splice(0,20))
                }
            }  
            Hidden();
        }
        catch(err){

        }
    }
    const formatMoney=(n) =>{
        return n.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }   

    const checkUnque = (arr , values)=>{
        let boolean = false;
        arr.forEach((value ,index)=>{
            if(value == values) 
            {
                boolean = true;
                return;
            }
        })
        return boolean;
    }
    const onClickOneNumber = (values)=>{
        
        const check = checkUnque(numOneCar,values);
        if(check)  // nếu đã chọn rồi
        {
            const numOneCarTemp = [...numOneCar];
            const filterNum = numOneCarTemp.filter((value,index)=>{
                return value !== values;
            })
            const domCarOne = document.querySelectorAll('.body__number--status')

            domCarOne[values-1].classList.remove('chose');
            domCarOne[values-1].classList.add('null');
            setNumOneCar(filterNum);
        }
        else{
            const numOneCarTemp =  [...numOneCar];
            if(numOneCarTemp.length === state.sovedi){
                openNotificationErorr('Thất bại' , `bạn có ${state.sovedi} vé . Không thể chọn số chỗ ngồi vượt quá số vé`)
            }
            else{
                const domCarOne = document.querySelectorAll('.body__number--status');
                numOneCarTemp.push(values);
                domCarOne[values-1].classList.remove('null');
                domCarOne[values-1].classList.add('chose');
                setNumOneCar(numOneCarTemp)
            }
        }
    }

    const onClickTwoNumber = (values)=>{
        
        const check = checkUnque(numTwoCar,values);
        if(check)  // nếu đã chọn rồi
        {
            const numTwoCarTemp = [...numTwoCar];
            const filterNum = numTwoCarTemp.filter((value,index)=>{
                return value !== values;
            })
            const domCarTwo = document.querySelectorAll('.body__number--status')

            domCarTwo[40+values-1].classList.remove('chose');
            domCarTwo[40+values-1].classList.add('null');
            setNumTwoCar(filterNum);
        }
        else{
            const numTwoCarTemp =  [...numTwoCar];
            if(numTwoCarTemp.length === state.soveve){
                openNotificationErorr('Thất bại' , `bạn có ${state.soveve} vé . Không thể chọn số chỗ ngồi vượt quá số vé` ,3)
            }
            else{
                const domCarTwo = document.querySelectorAll('.body__number--status');
                numTwoCarTemp.push(values);
                domCarTwo[40+values-1].classList.remove('null');
                domCarTwo[40+values-1].classList.add('chose');
                setNumTwoCar(numTwoCarTemp)
            }
        }
    }

    const onClickPrev = ()=>{
        console.log('hello')
        history.push({
            pathname : '/chon-gio',
            search : '?step=2',
            state : state
        })
    }

    const onClickNext= async()=>{
        if(numOneCar.length === 0 ){
            openNotificationErorr('Thất bại' , `Hãy chọn số ghế !` ,3)
            return;
        }
        if(state.loai === 2 && numTwoCar.length ===0){
            openNotificationErorr('Thất bại' , `Hãy chọn số ghế !` ,3)
            return;
        }
        
        try{
            Display();
            let bodyOne ={
                chuyendi : state.chuyendi._id ,
                soghedi : numOneCar
            }
            let resOne = await ApiTicket.CheckNumberCar(bodyOne);

            let resTwo = null
            if(state.loai === 2){
                let bodyTwo = {
                    chuyendi : state.chuyenve._id ,
                    soghedi : numTwoCar
                }
                resTwo = await ApiTicket.CheckNumberCar(bodyTwo);
            }

            if(state.loai == 1){
                if(resOne.data.success){
                   

                    let bodyOneResult ={
                        chuyendi : state.chuyendi._id ,
                        soghedi : numOneCar,
                        trangthai : "PENDING"
                    }
                    let updateResult = await ApiTicket.UpdateStatusTicket(bodyOneResult)
                    Hidden();
                    if(updateResult.data.success){
                        history.push({
                            pathname: "/xac-nhan",
                            search : "?step=4",
                            state : {
                                ...state,
                                soghedi : numOneCar
                                
                            }
                        })
                    }   

                }
                else{
                    Hidden();
                    openNotificationErorr("Thất bại" , resOne.data.message ,3);
                }
            }
            else{
                if(resOne.data.success &&  resTwo.data.success ){
                    let bodyOneResult ={
                        chuyendi : state.chuyendi._id ,
                        soghedi : numOneCar,
                        trangthai : "PENDING"
                    }
                    let updateResultOne = await ApiTicket.UpdateStatusTicket(bodyOneResult)


                    let bodyTwoResult ={
                        chuyendi : state.chuyenve._id ,
                        soghedi : numTwoCar,
                        trangthai : "PENDING"
                    }
                    let updateResultTwo = await ApiTicket.UpdateStatusTicket(bodyTwoResult)

                    Hidden();
                    if(updateResultOne.data.success && updateResultTwo.data.success){
                        history.push({
                            pathname: "/xac-nhan",
                            search : "?step=4",
                            state : {
                                ...state,
                                soghedi : numOneCar,
                                sogheve : numTwoCar
                            }
                        })
                    }   
                 }
                 else{
                     Hidden();
                     openNotificationErorr("Thất bại" , resOne.data.message + " HOẶC " + resTwo.data.message ,3);
                 }
            }
        }catch{
            openNotificationErorr("Thất bại" , "Lỗi hệ thống" ,3);
        }
    }

 
    return (
        <div>
            <Content>
                <div className="site-layout-content" style={{overflowX:'hidden'}}>
                    <Process isActive={2}></Process>
                    <div className="step_two">
                           <div className="step_two--container">
                                    <div class="step__body">
                                        <div className="step__body--header"><p>Sơ đồ ghế đi</p></div>
                                        <div className="step__body--body">
                                            <div className="body__build">
                                                <p className="step__info--header">TẦNG 1</p>
                                                <Row gutter={[8,8]}>
                                                    {
                                                        oneListBuildOne.length > 0 ?
                                                        oneListBuildOne.map((value,index)=>{
                                                            return (
                                                                <Col span={6}>
                                                                    <div class="body__number">{value.soghe}</div>
                                                                    <div class={`body__number--status 
                                                                         ${
                                                                            value.trangthaighe === "ACTIVE" && "null"
                                                                        }
                                                                        ${
                                                                            value.trangthaighe === "COMPLETE" && "active"
                                                                        }
                                                                        ${
                                                                            value.trangthaighe === "PENDING" && 'pen'
                                                                        }
                                                                    `}
                                                                        onClick={value.trangthaighe === "ACTIVE" ? e=>onClickOneNumber(value.soghe) : null}
                                                                    ></div>
                                                                </Col>
                                                            )
                                                        })
                                                        : null
                                                    }
                                                </Row>
                                            </div>
                                            <div className="body__build">
                                            <p className="step__info--header">TẦNG 2</p>
                                                <Row gutter={[8,8]}>
                                                {
                                                        oneListBuildTwo.length > 0 ?
                                                        oneListBuildTwo.map((value,index)=>{
                                                            return (
                                                                <Col span={6}>
                                                                    <div class="body__number">{value.soghe}</div>
                                                                    <div class={`body__number--status 
                                                                          ${
                                                                            value.trangthaighe === "ACTIVE" && "null"
                                                                        }
                                                                        ${
                                                                            value.trangthaighe === "COMPLETE" && "active"
                                                                        }
                                                                        ${
                                                                            value.trangthaighe === "PENDING" && 'pen'
                                                                        }
                                                                    `}
                                                                        onClick={value.trangthaighe === "ACTIVE" ? e=>onClickOneNumber(value.soghe) : null}
                                                                    ></div>
                                                                </Col>
                                                            )
                                                        })
                                                        : null
                                                    }
                                                </Row>
                                            </div>
                                        </div>
                                        <div className="step__body--status">
                                            <div style={{display:'flex' , alignItems:'center'  }}>
                                                <div class="status null"></div>
                                                <div>Trống</div>
                                            </div>
                                            <div style={{display:'flex' , alignItems:'center' }}>
                                                <div class="status chose"></div>
                                                <div>Đang chọn</div>
                                            </div>
                                            <div style={{display:'flex' , alignItems:'center'}}>
                                                <div class="status pen"></div>
                                                <div>Đang thanh toán</div>
                                            </div>
                                            <div style={{display:'flex' , alignItems:'center'}}>
                                                <div class="status active"></div>
                                                <div>Đã đặt</div>
                                            </div>
                                        </div>
                                        <div className="step__body--footer">
                                                <div className="info__title">
                                                    Ghế đã chọn : { 
                                                        numOneCar.length > 0 ?
                                                        numOneCar.map((value , index)=>{
                                                            return value +" , ";
                                                        }) :
                                                        'Chưa chọn'
                                                    }
                                                </div>
                                                <div className="info__title">
                                                    Tổng tiền : 
                                                    <div style={{marginTop:'10px' , textAlign:'left' , fontWeight : '700' , color:'#1890ff'}}>{ state?  formatMoney((state.sovedi*state.chuyendi.giave).toString())+'đ' : '0đ'}</div>
                                                </div>
                                        </div>
                                    </div>
                            </div> 
                            {   (state && state.loai == 2) ?
                                 <div className="step_two--conatiner">
                                        <div class="step__body">
                                            <div className="step__body--header"><p>Sơ đồ ghế về</p></div>
                                            <div className="step__body--body">
                                                <div className="body__build">
                                                    <p className="step__info--header">TẦNG 1</p>
                                                    <Row gutter={[8,8]}>
                                                    {
                                                       twoListBuildOne.length > 0 ?
                                                       twoListBuildOne.map((value,index)=>{
                                                            return (
                                                                <Col span={6}>
                                                                    <div class="body__number">{value.soghe}</div>
                                                                    <div class={`body__number--status 
                                                                        ${
                                                                            value.trangthaighe === "ACTIVE" && "null"
                                                                        }
                                                                        ${
                                                                            value.trangthaighe === "COMPLETE" && "active"
                                                                        }
                                                                        ${
                                                                            value.trangthaighe === "PENDING" && 'pen'
                                                                        }
                                                                    `}
                                                                        onClick={value.trangthaighe === "ACTIVE" ? e=>onClickTwoNumber(value.soghe) : null}
                                                                    ></div>
                                                                </Col>
                                                            )
                                                        })
                                                        : null
                                                    }
                                                    </Row>
                                                </div>
                                                <div className="body__build">
                                                <p className="step__info--header">TẦNG 2</p>
                                                    <Row gutter={[8,8]}>
                                                    {
                                                       twoListBuildTwo.length > 0 ?
                                                       twoListBuildTwo.map((value,index)=>{
                                                            return (
                                                                <Col span={6}>
                                                                    <div class="body__number">{value.soghe}</div>
                                                                    <div class={`body__number--status 
                                                                          ${
                                                                            value.trangthaighe === "ACTIVE" && "null"
                                                                        }
                                                                        ${
                                                                            value.trangthaighe === "COMPLETE" && "active"
                                                                        }
                                                                        ${
                                                                            value.trangthaighe === "PENDING" && 'pen'
                                                                        }
                                                                    `}
                                                                        onClick={value.trangthaighe === "ACTIVE" ? e=>onClickTwoNumber(value.soghe) : null}
                                                                    ></div>
                                                                </Col>
                                                            )
                                                        })
                                                        : null
                                                    }
                                                    </Row>
                                                </div>
                                            </div>
                                            <div className="step__body--status">
                                                <div style={{display:'flex' , alignItems:'center'  }}>
                                                    <div class="status null"></div>
                                                    <div>Trống</div>
                                                </div>
                                                <div style={{display:'flex' , alignItems:'center' }}>
                                                    <div class="status chose"></div>
                                                    <div>Đang chọn</div>
                                                </div>
                                                <div style={{display:'flex' , alignItems:'center'}}>
                                                <span class="status pen"></span>
                                                <div>Đang thanh toán</div>
                                                  </div>
                                                <div style={{display:'flex' , alignItems:'center'}}>
                                                    <span class="status active"></span>
                                                    <div>Đã đặt</div>
                                                </div>
                                            </div>
                                            <div className="step__body--footer">
                                                    <div className="info__title">
                                                        Ghế đã chọn : { 
                                                            numTwoCar.length > 0 ?
                                                            numTwoCar.map((value , index)=>{
                                                                return value +" , ";
                                                            }) :
                                                            'Chưa chọn'
                                                    }
                                                    </div>
                                                    <div className="info__title">
                                                        Tổng tiền
                                                        <div style={{marginTop:'10px' , textAlign:'left' , fontWeight : '700' , color:'#1890ff'}}>
                                                            { (state && state.soveve)?  formatMoney((state.soveve*state.chuyenve.giave).toString())+'đ' : '0đ'}
                                                        </div>
                                                    </div>
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

export default BookStepThree;