
import '../Insert/ChoseSlotInsert.css'; 
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout , Button , Row , Col ,Select , Modal } from 'antd';
import * as ApiTicket from '../../../../../Api/Ticket/index';
import {openNotificationErorr} from '../../../../Notfication/index';
import useLoading from '../../../../HookLoading/HookLoading';

function ChoseSlotInsert(props) {

    const location = useLocation();
    const history = useHistory();
    const token = useSelector(state => state.token);
    const [Loading , Hidden , Display] =  useLoading();
    const [ oneTicket , setOneTicket ] = useState([]);
    const [ numOneCar , setNumOneCar] = useState([]);
    const [ oneListBuildOne, setOneListBuildOne ] = useState([]);
    const [ oneListBuildTwo, setOneListBuildTwo ] = useState([]);
    const [ oneSlotOne , setOneSlotOne] = useState(0);
    const [ oneSlotTwo , setOneSlotTwo] = useState(0);


    
    useEffect(()=>{
        fectchAllTicket(props.id);
    },[props.id])
    
    console.log(props.num);
    const fectchAllTicket = async(id)=>{

        if(id){
            try{
                Display();
                // setOneNumberTicket(1);
                let resOne = await ApiTicket.getTicketTrip({trip : id});
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
                Hidden();
            }
            catch(err){
                console.log(err);
            }
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
            if(numOneCarTemp.length === 1){
                openNotificationErorr('Thất bại' , `bạn có ${1} vé . Không thể chọn số chỗ ngồi vượt quá số vé`)
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

    let oneTicketOne = [];
    let oneTicketTwo = [];
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
    const handleOk = ()=>{
        if(numOneCar.length === 0){
            openNotificationErorr('Thất bại' , 'Vui lòng chọn số ghế' ,3);
        }
        else{
            props.setNum(numOneCar[0]);
            props.onCloseSlot()
        }
        
    }
    const handleCancel = ()=>{
        props.onCloseSlot();
    }

    useEffect(()=>{
        if(props.num){
            const list = [];
            list.push(props.num)
            setNumOneCar(list);
        }
    },[props.num])
    return (
        <Modal title="Sơ đồ ghế" visible={true} onOk={handleOk} onCancel={handleCancel} width={700}>
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
                                                                        props.num !== null && props.num == index +1 ? 
                                                                        <div class="body__number--status chose"
    
                                                                            onClick={e=>onClickOneNumber(index+1)}
                                                                         ></div> : 
                                                                        
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
                                                                         props.num !== null && props.num == index+oneSlotOne+1 ? 
                                                                         <div class="body__number--status chose"
     
                                                                             onClick={e=>onClickOneNumber(index+oneSlotOne+1)}
                                                                          ></div> : 
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
                                    </div>
                            </div>  
                    </div>   
                    {Loading}        
        </Modal>
    );
}

export default ChoseSlotInsert;