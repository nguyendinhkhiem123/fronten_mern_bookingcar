import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout , Button , Row , Col ,Select } from 'antd';
import { RightOutlined ,LeftOutlined } from '@ant-design/icons'
import * as ApiTicket from '../../../../Api/Ticket/index';
// import '../BookStepTwo/BookStepTwo.css';
import '../BookStepThree/BookStepThree.css';
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
    const [ oneSlotOne , setOneSlotOne] = useState(0);
    const [ oneSlotTwo , setOneSlotTwo] = useState(0);
    const [ twoSlotOne , setTwoSlotOne] = useState(0);
    const [ twoSlotTwo , setTwoSlotTwo] = useState(0);
    useEffect(()=>{

        if(!token){
            openNotificationErorr('Thất bại' , "Vui lòng đăng nhập" ,3);
            history.push('/signin');
        }
        console.log(state);
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
                const tempOne = [];
                for(let i = 0 ; i < resOne.data.body.number ; i++){
                    tempOne.push(i);
                }
                setOneTicket(resOne.data.body.listTicket);
                setOneSlotOne(Math.round(resOne.data.body.number/2))
                setOneSlotTwo(Math.floor(resOne.data.body.number/2))
                setOneListBuildOne(tempOne.slice(0,Math.round(resOne.data.body.number/2)));
                setOneListBuildTwo(tempOne.slice(0,Math.floor(resOne.data.body.number/2)));
            }
         

            if(state.loai === 2){
               
                setTwoNumberTicket(state.soveve);
                let resTwo = await ApiTicket.getTicketTrip({trip : state.chuyenve._id});
                console.log(resTwo);
                if(resTwo.data.success){
                    const tempTwo = [];
                    for(let i = 0 ; i < resTwo.data.body.number ; i++){
                        tempTwo.push(i);
                    }
                
                    setTwoTicket(resTwo.data.body.listTicket);
                    setTwoSlotOne(Math.round(resTwo.data.body.number/2))
                    setTwoSlotTwo(Math.floor(resTwo.data.body.number/2))
                    setTwoListBuildOne(tempTwo.slice(0,Math.round(resTwo.data.body.number/2)))
                    setTwoListBuildTwo(tempTwo.slice(0,Math.floor(resTwo.data.body.number/2)))
                }
            }  
            
            Hidden();
        }
        catch(err){
            console.log(err);
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

            domCarTwo[oneSlotOne+oneSlotTwo+values-1].classList.remove('chose');
            domCarTwo[oneSlotOne+oneSlotTwo+values-1].classList.add('null');
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
                console.log(values , domCarTwo , oneSlotOne + oneSlotTwo);
                domCarTwo[oneSlotOne+oneSlotTwo+values-1].classList.remove('null');
                domCarTwo[oneSlotOne+oneSlotTwo+values-1].classList.add('chose');
                setNumTwoCar(numTwoCarTemp)
            }
        }
    }

    console.log(oneSlotOne , oneSlotTwo , twoSlotOne , twoSlotTwo);
    const onClickPrev = ()=>{
        console.log('hello')
        history.push({
            pathname : '/chon-gio',
            search : '?step=2',
            state : state
        })
    }

    const onClickNext= async()=>{
        console.log(numOneCar,numTwoCar)
        if(numOneCar.length === 0   ){
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
                chuyendi : state.chuyendi._id,
                sovedi : numOneCar.length
            }     
            let resOne = await ApiTicket.checkNumberTicket(bodyOne);
          
            let resTwo = null
            if(state.loai === 2){
                
                let bodyTwo = {
                     chuyendi : state.chuyenve._id ,
                     sovedi :  numTwoCar.length
                } 
                resTwo = await ApiTicket.checkNumberTicket(bodyTwo);
            }
           

            if(state.loai == 1){
                if(resOne.data.success){
                    let bodyOneCar ={
                        chuyendi : state.chuyendi._id ,
                        soghedi : numOneCar
                    }
                    let resOneCar = await ApiTicket.CheckNumberCar(bodyOneCar);
                    if(resOneCar.data.success){
                        let bodyOneResult ={
                            chuyendi : state.chuyendi._id ,
                            soghedi : numOneCar,
                       
                        }
                        let updateResult = await ApiTicket.insertTicket(bodyOneResult) // Tạo vé có trạng thái là đang ưu tiên
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
                        openNotificationErorr("Thất bại" , resOneCar.data.message ,3);
                    }
                }
                else{
                    Hidden();
                    openNotificationErorr("Thất bại" , resOne.data.message ,3);
                }
            }
            else{
                if(resOne.data.success &&  resTwo.data.success ){
                    let bodyOneCar ={
                        chuyendi : state.chuyendi._id ,
                        soghedi : numOneCar
                    }
                    let resOneCar = await ApiTicket.CheckNumberCar(bodyOneCar);
                  
                    let bodyTwoCar = {
                             chuyendi : state.chuyenve._id ,
                             soghedi :  numTwoCar    
                    }
                      
                    let resTwoCar = await ApiTicket.CheckNumberCar(bodyTwoCar);
                    
                    if(resOneCar.data.success &&  resTwoCar.data.success ){
                        let bodyOneResult ={
                            chuyendi : state.chuyendi._id ,
                            soghedi : numOneCar,
                          
                        }
                        let updateResultOne = await ApiTicket.insertTicket(bodyOneResult) // Tạo vé có trạng thái là đang ưu tiên
    
    
                        let bodyTwoResult ={
                            chuyendi : state.chuyenve._id ,
                            soghedi : numTwoCar,
                        }
                        let updateResultTwo = await ApiTicket.insertTicket(bodyTwoResult) /// Tạo vé có trạng thái là đang ưu tiên
    
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
                         openNotificationErorr("Thất bại" , resOneCar.data.message + " HOẶC " + resTwoCar.data.message ,3);
                     }
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
        }  //kIỂM TRA LẠI SỐ VÉ CÒN ĐỦ HAY KHÔNG

        // try{
        //     Display();
        //     let bodyOne ={
        //         chuyendi : state.chuyendi._id ,
        //         soghedi : numOneCar
        //     }
        //     let resOne = await ApiTicket.CheckNumberCar(bodyOne);

        //     let resTwo = null
        //     if(state.loai === 2){
        //         let bodyTwo = {
        //             chuyendi : state.chuyenve._id ,
        //             soghedi : numTwoCar
        //         }
        //         resTwo = await ApiTicket.CheckNumberCar(bodyTwo);
        //     }

        //     if(state.loai == 1){
        //         if(resOne.data.success){
        //             let bodyOneResult ={
        //                 chuyendi : state.chuyendi._id ,
        //                 soghedi : numOneCar,
                   
        //             }
        //             let updateResult = await ApiTicket.insertTicket(bodyOneResult) // Tạo vé có trạng thái là đang ưu tiên
        //             Hidden();
        //             if(updateResult.data.success){
        //                 history.push({
        //                     pathname: "/xac-nhan",
        //                     search : "?step=4",
        //                     state : {
        //                         ...state,
        //                         soghedi : numOneCar
                                
        //                     }
        //                 })
        //             }   

        //         }
        //         else{
        //             Hidden();
        //             openNotificationErorr("Thất bại" , resOne.data.message ,3);
        //         }
        //     }
        //     else{
        //         if(resOne.data.success &&  resTwo.data.success ){
        //             let bodyOneResult ={
        //                 chuyendi : state.chuyendi._id ,
        //                 soghedi : numOneCar,
                      
        //             }
        //             let updateResultOne = await ApiTicket.insertTicket(bodyOneResult) // Tạo vé có trạng thái là đang ưu tiên


        //             let bodyTwoResult ={
        //                 chuyendi : state.chuyenve._id ,
        //                 soghedi : numTwoCar,
        //             }
        //             let updateResultTwo = await ApiTicket.insertTicket(bodyTwoResult) /// Tạo vé có trạng thái là đang ưu tiên

        //             Hidden();
        //             if(updateResultOne.data.success && updateResultTwo.data.success){
        //                 history.push({
        //                     pathname: "/xac-nhan",
        //                     search : "?step=4",
        //                     state : {
        //                         ...state,
        //                         soghedi : numOneCar,
        //                         sogheve : numTwoCar
        //                     }
        //                 })
        //             }   
        //          }
        //          else{
        //              Hidden();
        //              openNotificationErorr("Thất bại" , resOne.data.message + " HOẶC " + resTwo.data.message ,3);
        //          }
        //     }
        // }catch{
        //     openNotificationErorr("Thất bại" , "Lỗi hệ thống" ,3);
        // } // KIỂM TRA GHẾ CÓ BỊ TRÙNG HAY KHÔNG 
    }

    let oneTicketOne = [];
    let oneTicketTwo = [];
    let twoTicketOne = [];
    let twoTicketTwo = [];
    console.log(oneTicket);
    if(oneTicket.length > 0){
        oneTicket.forEach((value,index)=>{
            if(value.soghe > oneSlotOne){
                oneTicketTwo.push(value)
            }
            else{
                oneTicketOne.push(value);
            }
        })
    }
    if(twoTicket.length > 0){
        twoTicket.forEach((value,index)=>{
            if(value.soghe > twoSlotOne){
                twoTicketTwo.push(value)
            }
            else{
                twoTicketOne.push(value);
            }
        })
    }
    
    const checkTicket = (arr , index)=>{
        if(arr.length > 0){
            for(let i = 0 ; i < arr.length ; i++){
                if(arr[i].soghe === index ) {
                   
                    return i;
                }
            }
        }

        return -1
    }
    return (
        <div >
            <Content>
                <div className="site-layout-content" style={{overflowX:'hidden'}}>
                    <Process isActive={2}></Process>
                    <div className="step_two">
                           <div className="step_two--container">
                                    <div class="step__body">
                                        <div className="step__body--header"><p class="book__title">Sơ đồ ghế đi</p></div>
                                        <div className="step__body--body">
                                            <div className="body__build">
                                                <p className="step__info--header">TẦNG 1</p>
                                                <Row gutter={[8,8]}>
                                                    {
                                                        oneListBuildOne.length > 0 ?
                                                        oneListBuildOne.map((value,index)=>{
                                                            return (
                                                                <Col span={6}>
                                                                    <div class="body__number">{index + 1}</div>
                                                                    {
                                                                        (checkTicket(oneTicketOne , index+1) > -1) ? 
                                                                        <div class={`body__number--status 
                        
                                                                            ${
                                                                                oneTicketOne[checkTicket(oneTicketOne , index+1)].trangthaive === "DADAT" && "active"
                                                                            }
                                                                            ${
                                                                                oneTicketOne[checkTicket(oneTicketOne , index+1)].trangthaive  === "DANGUUTIEN" && 'pen'
                                                                            }
                                                                       `}
                                                                       
                                                                        ></div>
                                                                        : 
                                                                        <div class="body__number--status null"
                                                                        
                                                                            onClick={e=>onClickOneNumber(index+1)}
                                                                        ></div>


                                                                    }
                                                                    
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
                                                                    <div class="body__number">{index+oneSlotOne+1}</div>
                                                                   {
                                                                       (checkTicket(oneTicketTwo , index+oneSlotOne+1) > -1) ? 
                                                                       <div class={`body__number--status 
                       
                                                                           ${
                                                                               oneTicketTwo[checkTicket(oneTicketTwo , index+oneSlotOne+1)].trangthaive === "DADAT" && "active"
                                                                           }
                                                                           ${
                                                                               oneTicketTwo[checkTicket(oneTicketTwo , index+oneSlotOne+1)].trangthaive  === "DANGUUTIEN" && 'pen'
                                                                           }
                                                                      `}
                                                                      
                                                                       ></div>
                                                                       : 
                                                                       <div class="body__number--status null"
                                                                       
                                                                           onClick={e=>onClickOneNumber(index+oneSlotOne+1)}
                                                                       ></div>
                                                                   }
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
                                                    <div style={{marginTop:'10px' , textAlign:'left' , fontWeight : '700' , color:'#ef5222'}}>{ state?  formatMoney((state.sovedi*state.chuyendi.giave).toString())+'đ' : '0đ'}</div>
                                                </div>
                                        </div>
                                    </div>
                            </div> 
                            {   (state && state.loai == 2) ?
                                 <div className="step_two--container">
                                        <div class="step__body">
                                            <div className="step__body--header"><p class="book__title">Sơ đồ ghế về</p></div>
                                            <div className="step__body--body">
                                                <div className="body__build">
                                                    <p className="step__info--header">TẦNG 1</p>
                                                    <Row gutter={[8,8]}>
                                                    {
                                                       twoListBuildOne.length > 0 ?
                                                       twoListBuildOne.map((value,index)=>{
                                                            return (
                                                                <Col span={6}>
                                                                    <div class="body__number">{index+1}</div>
                                                                    {
                                                                        (checkTicket(twoTicketOne , index+1) > -1) ? 
                                                                        <div class={`body__number--status 
                        
                                                                            ${
                                                                                twoTicketOne[checkTicket(twoTicketOne , index+1)].trangthaive === "DADAT" && "active"
                                                                            }
                                                                            ${
                                                                                twoTicketOne[checkTicket(twoTicketOne , index+1)].trangthaive  === "DANGUUTIEN" && 'pen'
                                                                            }
                                                                       `}
                                                                       
                                                                        ></div>
                                                                        : 
                                                                        <div class="body__number--status null"
                                                                        
                                                                            onClick={e=>onClickTwoNumber(index+1)}
                                                                        ></div>
                                                                    }
                                            
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
                                                                    <div class="body__number">{index+twoSlotOne+1}</div>
                                                                    {
                                                                        (checkTicket(twoTicketTwo , index+twoSlotOne+1) > -1) ? 
                                                                        <div class={`body__number--status 
                        
                                                                            ${
                                                                                twoTicketTwo[checkTicket(twoTicketTwo , index+twoSlotOne+1)].trangthaive === "DADAT" && "active"
                                                                            }
                                                                            ${
                                                                                twoTicketTwo[checkTicket(twoTicketTwo , index+twoSlotOne+1)].trangthaive  === "DANGUUTIEN" && 'pen'
                                                                            }
                                                                       `}
                                                                       
                                                                        ></div>
                                                                        : 
                                                                        <div class="body__number--status null"
                                                                        
                                                                            onClick={e=>onClickTwoNumber(index+twoSlotOne+1)}
                                                                        ></div>
                                                                    }
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
                                                        <div style={{marginTop:'10px' , textAlign:'left' , fontWeight : '700' , color:'#ef5222'}}>
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
                        <Button type="primary" size="large"  className="btn__next" onClick={onClickNext} >
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