import React, { useState  , useEffect} from 'react';
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
        props.onCloseModal();
    }
    const onFinish =async(values)=>{
        if(value === 0){
            try{
                Display();
                const res = await ApiTrip.InsertTrip(values);
                Hidden();
                if(res.data.success){
                    openNotificationSuccess('Thành công' , res.data.message , 3);
                    console.log(res.data.body.newTrip[0])
                    props.onCloseModal();
                    props.insertTrip(res.data.body.newTrip[0]);
                }
            }catch(err){
                console.log(err);
            }
        }
        else{
            try{
                console.log(values);
                Display();
                const res = await ApiTrip.updateTrip(values);
                console.log(res);
                Hidden();
                if(res.data.success){
                    openNotificationSuccess('Thành công' , res.data.message , 3);  
                    props.onCloseModal();
                    props.updateTrip(res.data.body);
                }
                else{
                    openNotificationErorr('Thất bại' , res.data.message , 3);
                    props.onCloseModal();
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
        setEnd(e);
    }
    const onChangeHours = (e)=>{
        setHour(e);
    }
    useEffect(()=>{
       
        const getCar = async(body)=>{
            try{
                // Display();
                const res = await ApiTrip.getCarOfTrip(body);
                console.log(res);
                // Hidden();
                if(res.data.success){
                    setCar(res.data.body);
                }
                
            }catch(err){
                Hidden();
                console.log(err);
            }
        }
        getCar({
            noidi : start ,
            noiden : end ,
            ngaydi : date ,
            giodi : hour
        })
    }, [start , end , date, hour]);
    console.log(tripValue , car)
    return (
        <Modal title= {value === 0 ? "Thêm tuyến xe" : "Chỉnh sử tuyến xe"}
        visible={true}
        onCancel={handleCancel} 
        footer={[
            <Button type="primary" htmlType="submit" form="my_form">
                     Xác nhận
            </Button>,
            <Button type="" htmlType="submit" onClick={handleCancel}>
                    Hủy
            </Button>
            ]}
        >
            {
                value === 0?
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
                           label="Mã tuyến"
                           name="Tuyến"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
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
                           label="Nơi đi"
                           name="noidi"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                          
                       >
                          <Select onChange={onChangeStart}>
                                {
                                    (
                                        route.filter((value,index)=>{
                                            return value.matuyen === indexRoute && value.noiden.toLowerCase().indexOf(end.toLowerCase()) !== -1
                                        })
                                    ).map((value,index)=>{
                                        return <Option value={value.noidi}>{value.noidi}</Option>
                                    })
                                }
                          </Select>
                    </Form.Item>    
                    <Form.Item
                           label="Nơi đến"
                           name="noiden"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                          
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
                    </Form.Item>    
                    <Form.Item
                        label="Ngày đi"
                        name="ngaydi"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                  
                               }]}
                   
                        hasFeedback
                        
                    >
                        <DatePicker onChange={onChangeDate} style={{width:"100%"}} placeholder="Chọn ngày" disabledDate={disabledDate}/>
                    </Form.Item>     
                    <Form.Item
                           label="Giờ đi"
                           name="giodi"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                          
                       >
                          <Select onChange={onChangeHours}>
                                <OptGroup label="Buổi sáng">
                                    <Option value={8}>8 giờ</Option>
                                    <Option value={9}>9 giờ</Option>
                                    <Option value={10}>10 giờ</Option>
                                </OptGroup>
                                <OptGroup label="Buổi chiều">
                                    <Option value={16}>16 giờ</Option>
                                    <Option value={17}>17 giờ</Option>
                                    <Option value={18}>18 giờ</Option>
                                </OptGroup>
                               
                          </Select>
                    </Form.Item> 
                    <Form.Item
                           label="Mã xe"
                           name="car"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                          
                       >
                          <Select>
                              {
                                  car.length > 0 ? 
                                  car.map( ( value , index)=>{
                                      return   <Option key={index} value={value._id}>{value.biensoxe}</Option>
                                  })
                                  : null
                              }
                
                          </Select>
                    </Form.Item>  
                    <Form.Item
                           label="Giá vé"
                           name="giave"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                          
                       >
                          <InputNumber min="1000" style={{ width : '100%'}} step="1000"></InputNumber>
                    </Form.Item> 
                    <Form.Item
                           label="Số lượng vé"
                           name="soluongve"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                          
                       >
                          <InputNumber min="1" style={{ width : '100%'}} step="1" max="40"></InputNumber>
                    </Form.Item>                              
                </Form>
                :
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
                           label="ID tuyến"
                           name="id"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?._id}
                       >
                         <Input readOnly/>
                    </Form.Item>          
                    <Form.Item
                           label="Mã tuyến"
                           name="Tuyến"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?.route.matuyen}
                           
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
                           label="Nơi đi"
                           name="noidi"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?.route.noidi}
                       >
                          <Select onChange={onChangeStart}>
                                {
                                    (
                                        route.filter((value,index)=>{
                                            return value.matuyen === indexRoute && value.noiden.toLowerCase().indexOf(end.toLowerCase()) !== -1
                                        })
                                    ).map((value,index)=>{
                                        return <Option value={value.noidi}>{value.noidi}</Option>
                                    })
                                }
                          </Select>
                    </Form.Item>    
                    <Form.Item
                           label="Nơi đến"
                           name="noiden"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
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
                    </Form.Item>    
                    <Form.Item
                        label="Ngày đi"
                        name="ngaydi"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                  
                               }]}
                   
                        hasFeedback
                        initialValue={moment(tripValue?.ngaydi)}
                        
                    >
                        <DatePicker onChange={onChangeDate} style={{width:"100%"}} placeholder="Chọn ngày" disabledDate={disabledDate}/>
                    </Form.Item>     
                    <Form.Item
                           label="Giờ đi"
                           name="giodi"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?.giodi}
                       >
                          <Select onChange={onChangeHours}>
                                <OptGroup label="Buổi sáng">
                                    <Option value={8}>8 giờ</Option>
                                    <Option value={9}>9 giờ</Option>
                                    <Option value={10}>10 giờ</Option>
                                </OptGroup>
                                <OptGroup label="Buổi chiều">
                                    <Option value={16}>16 giờ</Option>
                                    <Option value={17}>17 giờ</Option>
                                    <Option value={18}>18 giờ</Option>
                                </OptGroup>
                               
                          </Select>
                    </Form.Item> 
                    <Form.Item
                           label="Mã xe"
                           name="car"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?.car._id}
                       >
                          <Select>
                              {
                                  car.length > 0 ? 
                                  car.map( ( value , index)=>{
                                      return   <Option key={index} value={value._id}>{value.biensoxe}</Option>
                                  })
                                  : null
                              }
                
                          </Select>
                    </Form.Item>  
                    <Form.Item
                           label="Giá vé"
                           name="giave"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?.giave}
                       >
                          <InputNumber min="1000" style={{ width : '100%'}} step="1000"></InputNumber>
                    </Form.Item> 
                    <Form.Item
                           label="Số lượng vé"
                           name="soluongve"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={tripValue?.soluongve}
                          
                       >
                          <InputNumber min="1" style={{ width : '100%'}} step="1" max="40"></InputNumber>
                    </Form.Item>                              
                </Form>
            }
                {Loading}
           </Modal>
    );
    
}

export default Modals;