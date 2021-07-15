import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout , Button , Row , Col ,Select } from 'antd';
import { RightOutlined ,LeftOutlined } from '@ant-design/icons'

import '../BookStepTwo/BookStepTwo.css';
import Process from '../../Process/Process';
import {openNotificationErorr} from '../../../Notfication/index';
const { Option } = Select;
const {  Content } = Layout;
function BookStepThree(props) {
    const location = useLocation();
    const history = useHistory();
    const state = location.state;
    console.log(state);
    const [ oneTicket , setOneTicket ] = useState([]);
    const [ twoTicket , setTwoTicket ] = useState([]);
    const [ oneNumberTicket , setOneNumberTicket ] = useState(0);
    const [ twoNumberTicket , setTwoNumberTicket ] = useState(0);
    const [ numOneCar , setNumOneCar] = useState([]);
    const [ numTwoCar , setNumTwoCar] = useState([]);
    useEffect(()=>{
        if(!state){     
            openNotificationErorr('Thất bại' , 'Vui lòng chọn đi theo trình tự' ,3);
            history.push('/');
        }
        else{
            if(state.loai === 1){
                setOneTicket(state.danhsachvedi);
                setOneNumberTicket(state.sovedi);
            }
            else{
                setTwoTicket(state.danhsachveve);
                setTwoNumberTicket(state.soveve);
            }
        }
    },[])
    
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

            domCarTwo[20+values-1].classList.remove('chose');
            domCarTwo[20+values-1].classList.add('null');
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
                domCarTwo[20+values-1].classList.remove('null');
                domCarTwo[20+values-1].classList.add('chose');
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

    const onClickNext= ()=>{
        if(numOneCar.length === 0 ){
            openNotificationErorr('Thất bại' , `Hãy chọn số ghế !` ,3)
            return;
        }
        if(state.loai === 2 && numTwoCar.length ===0){
            openNotificationErorr('Thất bại' , `Hãy chọn số ghế !` ,3)
            return;
        }
    }
    return (
        <div>
            <Content>
                <div className="site-layout-content" style={{overflowX:'hidden'}}>
                    <Process isActive={2}></Process>
                    <div className="step_two">
                           <div className="step_two--conatiner">
                                    <div class="step__body">
                                        <div className="step__body--header"><p>Sơ đồ ghế đi</p></div>
                                        <div className="step__body--body">
                                            <div className="body__build">
                                                <p className="step__info--header">TẦNG 1</p>
                                                <Row gutter={[8,8]}>
                                                    {
                                                        oneTicket.length > 0 ?
                                                        oneTicket.map((value,index)=>{
                                                            return (
                                                                <Col span={6}>
                                                                    <div class="body__number">{value.soghe}</div>
                                                                    <div class={`body__number--status ${value.thoigiandat === null? "null" : "active"}`}
                                                                        onClick={value.thoigiandat === null ? e=>onClickOneNumber(value.soghe) : null}
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
                                                <span class="status active"></span>
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
                                                    <div style={{marginTop:'10px' , textAlign:'left' , fontWeight : '700' , color:'#1890ff'}}>{ state?  formatMoney((state.sovedi*state.giave).toString())  : '0đ'}</div>
                                                </div>
                                        </div>
                                    </div>
                            </div> 
                            {   (!state) ?
                                 <div className="step_two--conatiner">
                                        <div class="step__body">
                                            <div className="step__body--header"><p>Sơ đồ ghế về</p></div>
                                            <div className="step__body--body">
                                                <div className="body__build">
                                                    <p className="step__info--header">TẦNG 1</p>
                                                    <Row gutter={[8,8]}>
                                                    {
                                                       twoTicket.length > 0 ?
                                                       twoTicket.map((value,index)=>{
                                                            return (
                                                                <Col span={6}>
                                                                    <div class="body__number">{value.soghe}</div>
                                                                    <div class={`body__number--status ${value.thoigiandat === null? "null" : "active"}`}
                                                                        onClick={value.thoigiandat === null ? e=>onClickTwoNumber(value.soghe) : null}
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
                                                    <span class="status active"></span>
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
                                                        Tổng tiền
                                                        <div style={{marginTop:'10px' , textAlign:'left' , fontWeight : '700' , color:'#1890ff'}}>500đ</div>
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
            </Content>
        </div>
    );
}

export default BookStepThree;