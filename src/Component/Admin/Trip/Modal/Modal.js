import React, { useState  , useEffect, useRef} from 'react';
import { Modal , Button  , Form , Select , DatePicker, InputNumber , Input} from 'antd';
import moment from "moment";
import { useSelector } from 'react-redux';
import * as ApiTrip from '../../../../Api/Trip/index';
import { openNotificationSuccess , openNotificationErorr } from '../../../Notfication';
import useLoading from '../../../HookLoading/HookLoading';

const layout = { 
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
const { Option , OptGroup } = Select;
function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}
function Modals(props) {
    const route = useSelector(state => state.route);
    
    const { trip , value , tripValue} = props;
    const [ indexRoute , setIndexRoute ] = useState('');
    const [ start , setStart ] = useState('');
    const [ end , setEnd ] = useState('');
    const [ date , setDate ] = useState('');
    const [ hour , setHour] = useState(0);
    const [ car , setCar ] = useState([])
    const [ Loading , Hidden , Display ] = useLoading();
    const [ check , setCheck ] = useState(false);
    const newDate = (ngay , gio=0)=>{
        const n = Math.floor(gio/24);
        const m = gio%24;
        const date1 =  new Date(ngay);
        const year = date1.getFullYear();
        const month = date1.getMonth();
        const day = date1.getDate()+n;
        
        return new Date(Date.UTC(year , month , day , m));
    }
    const handleCancel = ()=>{
        setStart('')
        setEnd('')
        setIndexRoute('');
        setDate('');
        setHour(0);
        props.onCloseTripValue();
        props.onCloseModal();   
        setCheck(false); 
    }
    const onFinish =async(values)=>{
          
        if(value === 0){
            try{
                const noiden = document.getElementsByName('noiden');
                values.noiden = noiden[0].value
                Display();
                const res = await ApiTrip.InsertTrip(values);
                Hidden();
                if(res.data.success){
                    openNotificationSuccess('Th??nh c??ng' , res.data.message , 3);
                    console.log(res.data.body.newTrip[0])
                    let temp = res.data.body.newTrip[0];
                    props.onCloseModal();
                    props.insertTrip(temp);
                    setStart('')
                    setEnd('')
                    setIndexRoute('');
                    setDate('');
                    setHour(0);
                    setCheck(false);
                    
                } else{
                    openNotificationErorr('Th???t b???i' , res.data.message , 3);
                   
                } 
             
            }catch(err){
                console.log(err);
            }
         
        }
        else{
            try{
                const noiden = document.getElementsByName('noiden2');
                values.noiden = noiden[0].value
                console.log(values);
                const res = await ApiTrip.updateTrip(values);
                console.log(res);
                Hidden();
                if(res.data.success){
                    openNotificationSuccess('Th??nh c??ng' , res.data.message , 3);  
                    props.onCloseModal();
                    props.updateTrip(res.data.body);     
                    setStart('')
                    setEnd('')
                    setIndexRoute('');
                    setDate('');
                    setHour(0);
                    props.onCloseTripValue(); 
                    setCheck(false);  
                }
                else{
                    openNotificationErorr('Th???t b???i' , res.data.message , 3);
                   
                } 
             
            }catch(err){
                console.log(err);
            }
        }      
    }
    const onFinishFailed = (err)=>{
        console.log(err);
    }

    const onChangeDate = (e) =>{
         
        setDate(newDate(e).toDateString());
    }
    const onChangeRoute  = (e)=>{
        setIndexRoute(e);
    }
    const onChangeStart  = (e)=>{
        setStart(e);
    }
    const onChangeEnd  = (e)=>{
        console.log('Change end');
    }
    const onChangeHours = (e)=>{
        setHour(e);
    }
    useEffect(()=>{
        setIndexRoute(tripValue?.route.matuyen);
        setStart(tripValue?.route.noidi)
        setEnd(tripValue?.route.noiden);
        setDate(tripValue?.ngaydi.slice(0,10))
        setHour(tripValue?.giodi);
        console.log('useOne')
    }, [tripValue]);

    useEffect(()=>{ 
        const noiden = document.getElementsByName('noiden');
        const noiden2 = document.getElementsByName('noiden2');
        const getCar = async(body)=>{
            try{
                // Display();
                const res = await ApiTrip.getCarOfTrip(body);
                console.log(res);
                // Hidden();
                if(res.data.success){
                    setCar(res.data.body);
                    console.log(res.data.body)
                }
                
            }catch(err){
                Hidden();
                console.log(err);
            }
        }
        getCar({
            noidi : start ,
            noiden : value === 0 ? noiden[0].value : noiden2[0].value ,
            ngaydi : date ,
            giodi : hour
        })
    }, [start , end , date, hour]);
    // useEffect(()=>{
    //     setCheck(false);
    // })

    useEffect(()=>{
        if(value !==0){
            alert('H?????ng d???n : N???u b???n mu???n s???a c??c thu???c t??nh kh??c gi?? v??. Xin vui l??ng ???n reset r???i ch???n l???i t??? ?????u')
        }
    },[value])
    const onClick = ()=>{
        setCheck(true);
        // setStart('')
        // setEnd('')
        // setIndexRoute('');
        setDate('');
        setHour(0);
    }
    let arrEnd =[]
    arrEnd = route.filter((value,index)=>{
            return value.matuyen === indexRoute && value.noidi.indexOf(start) !== -1
        })
    console.log(indexRoute , start, end , arrEnd);
;
    return (
        <Modal title= {value === 0 ? "Th??m chuy???n xe" : "Ch???nh s??? chuy???n xe"}
        visible={true}
        onCancel={handleCancel} 
        footer={[
            <Button type="primary" htmlType="submit" form="my_form">
                     X??c nh???n
            </Button>,
            <Button type="" htmlType="submit" onClick={handleCancel}>
                    H???y
            </Button>
            ,
            
            ]}
        >
            {
                value === 0 ?
             <Form
                id="my_form"
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{margin :  "auto"}}
                preserve={true}
                >

                    <Form.Item
                           label="K?? hi???u tuy???n"
                           name="Tuy???n"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                           
                       >
                          <Select onChange={onChangeRoute}>
                                {
                                    route.map((value,index)=>{
                                       return  index%2 === 0 ?
                                        ( <Option value={value.matuyen}>{value.matuyen}</Option>)
                                        : null
                                    })
                                }
                          </Select>
                    </Form.Item>        
                  
                    <Form.Item
                           label="N??i ??i"
                           name="noidi"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                       >
                          <Select onChange={onChangeStart}>
                                {
                                    (
                                        route.filter((value,index)=>{
                                            // return value.matuyen === indexRoute && value.noiden.toLowerCase().indexOf(end.toLowerCase()) !== -1
                                            return value.matuyen === indexRoute
                                        })
                                    ).map((value,index)=>{
                                        return <Option value={value.noidi}>{value.noidi}</Option>
                                    })
                                }
                          </Select>
                    </Form.Item>  
                    <div className="ant-row ant-form-item ant-form-item-has-feedback ant-form-item-has-success" style={{rowGap : '0px'}}>
                        <div className="ant-col ant-col-8 ant-form-item-label">
                            <label className="ant-form-item-required" title="N??i ?????n">N??i ?????n</label>
                        </div>
                        <div className="ant-col ant-col-16 ant-form-item-control">
                            <div className="ant-form-item-control-input-content">
                                <div className="ant-input-number" style={{width : '100%'}}>
                                    <Input name="noiden" readOnly value={arrEnd.length === 1 ? arrEnd[0].noiden : ""}/>
                                </div>
                            </div>
                        </div>

                    </div>
            
                    <Form.Item
                        label="Ng??y ??i"
                        name="ngaydi"
                        rules={[{ required: true, 
                                  message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                  
                               }]}
                   
                        hasFeedback
                        
                    >
                        <DatePicker onChange={onChangeDate} style={{width:"100%"}} placeholder="Ch???n ng??y" disabledDate={disabledDate}/>
                    </Form.Item>     
                    <Form.Item
                           label="Gi??? ??i"
                           name="giodi"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                          
                       >
                          <Select onChange={onChangeHours}>
                                <OptGroup label="Bu???i s??ng">
                                    <Option value={8}>8 gi???</Option>
                                    <Option value={9}>9 gi???</Option>
                                    <Option value={10}>10 gi???</Option>
                                </OptGroup>
                                <OptGroup label="Bu???i chi???u">
                                    <Option value={16}>16 gi???</Option>
                                    <Option value={17}>17 gi???</Option>
                                    <Option value={18}>18 gi???</Option>
                                </OptGroup>
                               
                          </Select>
                    </Form.Item> 
                    <Form.Item
                           label="M?? xe"
                           name="car"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                          
                       >
                          <Select>
                              {
                                  car.length > 0 ? 
                                  car.map( ( value , index)=>{
                                      return  <Option key={index} value={value._id}>{value._id}</Option>
                                  })
                                  : null
                              }
                
                          </Select>
                    </Form.Item>  
                    <Form.Item
                           label="Gi?? v??"
                           name="giave"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                          
                       >
                          <InputNumber min="1000" style={{ width : '100%'}} step="1000"></InputNumber>
                    </Form.Item> 
                    {/* <Form.Item
                           label="S??? l?????ng v??"
                           name="soluongve"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                          
                       >
                          <InputNumber min="1" style={{ width : '100%'}} step="1" max="40"></InputNumber>
                    </Form.Item>                               */}
                </Form>
                :
               ""
            }
            {
                value !== 0 && check === false  ?
                <Form
                id="my_form"
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{margin :  "auto"}}
                preserve={true}
                >
                      <Form.Item
                           label="M?? chuy???n"
                           name="id"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?._id}
                       >
                         <Input  disabled readOnly/>
                    </Form.Item>          
                    <Form.Item
                           label="K?? hi???u tuy???n"
                           name="Tuy???n"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?.route.matuyen}
        
                       >
                          <Select  onChange={onChangeRoute} disabled>
                                {
                                    route.map((value,index)=>{
                                       return  index%2 === 0 ?
                                        ( <Option value={value.matuyen}>{value.matuyen}</Option>)
                                        : null
                                    })
                                }
                          </Select>
                    </Form.Item>          
                    <Form.Item
                           label="N??i ??i"
                           name="noidi"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?.route.noidi}
                           
                       >
                          <Select onChange={onChangeStart} disabled>
                                {
                                    (
                                        route.filter((value,index)=>{
                                            return value.matuyen === indexRoute 
                                            // && value.noiden.toLowerCase().indexOf(end.toLowerCase()) !== -1
                                        })
                                    ).map((value,index)=>{
                                        return <Option value={value.noidi}>{value.noidi}</Option>
                                    })
                                }
                          </Select>
                    </Form.Item>    
                    {/* <Form.Item
                           label="N??i ?????n"
                           name="noiden"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?.route.noiden}
                       >
                          <Select onChange={onChangeEnd}>
                                {
                                    (
                                        route.filter((value,index)=>{
                                            return value.matuyen === indexRoute && value.noidi.toLowerCase().indexOf(start.toLowerCase()) !== -1
                                        })
                                    ).map((value,index)=>{
                                        return <Option value={value.noiden}>{value.noiden}</Option>
                                    })
                                }
                          </Select>
                    </Form.Item>     */}
                       <div className="ant-row ant-form-item ant-form-item-has-feedback ant-form-item-has-success" style={{rowGap : '0px'}}>
                        <div className="ant-col ant-col-8 ant-form-item-label">
                            <label className="ant-form-item-required">N??i ?????n</label>
                        </div>
                        <div className="ant-col ant-col-16 ant-form-item-control">
                            <div className="ant-form-item-control-input-content">
                                <div className="ant-input-number" style={{width : '100%'}}>
                                    <Input name="noiden2"  disabled readOnly value={arrEnd.length == 1 ? arrEnd[0].noiden : ""}/>
                                </div>
                            </div>
                        </div>

                    </div>
                    <Form.Item
                        label="Ng??y ??i"
                        name="ngaydi"
                        rules={[{ required: true, 
                                  message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                  
                               }]}
                   
                        hasFeedback
                        initialValue={moment(tripValue?.ngaydi)}
                        
                    >
                        <DatePicker   onClick={onClick} disabled onChange={onChangeDate} style={{width:"100%"}} placeholder="Ch???n ng??y" disabledDate={disabledDate}/>
                    </Form.Item>     
                    <Form.Item
                           label="Gi??? ??i"
                           name="giodi"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?.giodi}
                       >
                          <Select onChange={onChangeHours} disabled>
                                <OptGroup label="Bu???i s??ng">
                                    <Option value={8}>8 gi???</Option>
                                    <Option value={9}>9 gi???</Option>
                                    <Option value={10}>10 gi???</Option>
                                </OptGroup>
                                <OptGroup label="Bu???i chi???u">
                                    <Option value={16}>16 gi???</Option>
                                    <Option value={17}>17 gi???</Option>
                                    <Option value={18}>18 gi???</Option>
                                </OptGroup>
                               
                          </Select>
                    </Form.Item> 
                    <Form.Item
                           label="M?? xe"
                           name="car"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?.car._id}
                       >
                          <Select  disabled onClick={onClick}>
                              <Option value={tripValue?.car._id}>{tripValue?.car._id}</Option>
                              {
                                  car.length > 0 ? 
                                  car.map((value , index)=>{
                                      return   <Option key={index} value={value._id}>{value._id}</Option>
                                  })
                                  : null
                              }
                           
                
                          </Select>
                    </Form.Item>  
                    <Form.Item
                           label="Gi?? v??"
                           name="giave"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?.giave}
                       >
                          <InputNumber min="1000" style={{ width : '100%'}} step="1000"></InputNumber>
                    </Form.Item> 
                    {/* <Form.Item
                           label="S??? l?????ng v??"
                           name="soluongve"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?.soluongve}
                          
                       >
                          <InputNumber min="1" style={{ width : '100%'}} step="1" max="40"></InputNumber>
                    </Form.Item>       
                                            */}
                    <div style={{width : '100%' , display : 'flex',
                        justifyContent : 'flex-end'}}>
                         <Button type="primary" style={{
                        
                    }} 
                    onClick={onClick}
                    >
                        Reset</Button>
                    </div>
                   
                </Form>
                :""
            }
            {
                value !== 0 && check === true ?
                <Form
                id="my_form"
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{margin :  "auto"}}
                preserve={true}
                >
                      <Form.Item
                           label="M?? chuy???n"
                           name="id"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?._id}
                       >
                         <Input  disabled readOnly/>
                    </Form.Item>          
                    <Form.Item
                           label="K?? hi???u tuy???n"
                           name="Tuy???n"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?.route.matuyen}
                       >
                          <Select  onChange={onChangeRoute} disabled >
                                {
                                    route.map((value,index)=>{
                                       return  index%2 === 0 ?
                                        ( <Option value={value.matuyen}>{value.matuyen}</Option>)
                                        : null
                                    })
                                }
                          </Select>
                    </Form.Item>          
                    <Form.Item
                           label="N??i ??i"
                           name="noidi"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?.route.noidi}
                           
                       >
                          <Select onChange={onChangeStart} disabled >
                                {
                                    (
                                        route.filter((value,index)=>{
                                            return value.matuyen === indexRoute 
                                            // && value.noiden.toLowerCase().indexOf(end.toLowerCase()) !== -1
                                        })
                                    ).map((value,index)=>{
                                        return <Option value={value.noidi}>{value.noidi}</Option>
                                    })
                                }
                          </Select>
                    </Form.Item>    
                    {/* <Form.Item
                           label="N??i ?????n"
                           name="noiden"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?.route.noiden}
                       >
                          <Select onChange={onChangeEnd}>
                                {
                                    (
                                        route.filter((value,index)=>{
                                            return value.matuyen === indexRoute && value.noidi.toLowerCase().indexOf(start.toLowerCase()) !== -1
                                        })
                                    ).map((value,index)=>{
                                        return <Option value={value.noiden}>{value.noiden}</Option>
                                    })
                                }
                          </Select>
                    </Form.Item>     */}
                       <div className="ant-row ant-form-item ant-form-item-has-feedback ant-form-item-has-success" style={{rowGap : '0px'}}>
                        <div className="ant-col ant-col-8 ant-form-item-label">
                            <label className="ant-form-item-required">N??i ?????n</label>
                        </div>
                        <div className="ant-col ant-col-16 ant-form-item-control">
                            <div className="ant-form-item-control-input-content">
                                <div className="ant-input-number" style={{width : '100%'}}>
                                    <Input name="noiden2" disabled readOnly value={arrEnd.length == 1 ? arrEnd[0].noiden : ""}/>
                                </div>
                            </div>
                        </div>

                    </div>
                    <Form.Item
                        label="Ng??y ??i"
                        name="ngaydi"
                        rules={[{ required: true, 
                                  message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                  
                               }]}
                   
                        hasFeedback
                      
                        
                    >
                        <DatePicker   onChange={onChangeDate} style={{width:"100%"}} placeholder="Ch???n ng??y" disabledDate={disabledDate}/>
                    </Form.Item>     
                    <Form.Item
                           label="Gi??? ??i"
                           name="giodi"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                          
                       >
                          <Select onChange={onChangeHours} >
                                <OptGroup label="Bu???i s??ng">
                                    <Option value={8}>8 gi???</Option>
                                    <Option value={9}>9 gi???</Option>
                                    <Option value={10}>10 gi???</Option>
                                </OptGroup>
                                <OptGroup label="Bu???i chi???u">
                                    <Option value={16}>16 gi???</Option>
                                    <Option value={17}>17 gi???</Option>
                                    <Option value={18}>18 gi???</Option>
                                </OptGroup>
                               
                          </Select>
                    </Form.Item> 
                    <Form.Item
                           label="M?? xe"
                           name="car"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                          
                       >
                          <Select  >
                              {/* <Option value={tripValue?.car._id}>{tripValue?.car._id}</Option> */}
                              {
                                  car.length > 0 ? 
                                  car.map((value , index)=>{
                                      return   <Option key={index} value={value._id}>{value._id}</Option>
                                  })
                                  : null
                              }
                           
                
                          </Select>
                    </Form.Item>  
                    <Form.Item
                           label="Gi?? v??"
                           name="giave"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?.giave}
                       >
                          <InputNumber min="1000" style={{ width : '100%'}} step="1000"></InputNumber>
                    </Form.Item> 
                    {/* <Form.Item
                           label="S??? l?????ng v??"
                           name="soluongve"
                           rules={[{ required: true, 
                                     message: "Kh??ng ???????c b??? tr???ng !. Vui l??ng nh???p l???i" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?.soluongve}
                          
                       >
                          <InputNumber min="1" style={{ width : '100%'}} step="1" max="40"></InputNumber>
                    </Form.Item>                               */}
                </Form>:
                ""
            }
                {Loading}
           </Modal>
    );
    
}

export default Modals;