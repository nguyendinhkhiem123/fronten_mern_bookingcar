import React, { useEffect, useState } from 'react';
import { Modal , Form , Button , Input , InputNumber , Select} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { openNotificationErorr , openNotificationSuccess} from '../../../Notfication/index';
import * as ApiRoute from '../../../../Api/Route/index';
import useLoading from '../../../HookLoading/HookLoading';
import * as ActionRoute from '../../../../Reducer/route';
const { Option } = Select;
const layout = { 
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

function Modals(props) {
    
    const { isActive  , value} = props;
   
    const handleCancel = ()=>{
        props.onCloseModal();
        props.setValuesNull();
        setKm(1);
        setStatus(false)
    }
    const [ km , setKm] = useState(1);
    const [ status , setStatus ] =  useState(false);
    const [ Loading , Hidden , Display] = useLoading();
    const dispatch = useDispatch();
    const onFinish = async(values)=>{
        
        if(values.noidi.toLowerCase().trim() === values.noiden.toLowerCase().trim()){
            openNotificationErorr('Thất bại' , 'Nơi đi nơi đến phải khác nhau. Vui lòng chọn lại' ,3);
            return
        }
        if( isActive ){
            // props.onClickInsert(values);
            try{
                Display();
                const res = await ApiRoute.insertRoute(values);
                Hidden() 
                if(res.data.success){
                    openNotificationSuccess('Thành công' , res.data.message ,3);
                    dispatch(ActionRoute.addNewRoute({
                        newRoute : res.data.body.newRoute,
                        newRouteRes :res.data.body.newRouteReverse
                    }))
                    props.setValuesNull();
                    props.onCloseModal();
                    setKm(1);
                    setStatus(false)
                }
                else{
                    openNotificationErorr('Thất bại' , res.data.message ,3)
                }
            }
            catch(err){
                console.log(err);
            }
            
        }
       else{
        //    props.onClickUpdate(values);
           try{
            Display();
            const res = await ApiRoute.updateRoute(values);
            Hidden() 
            console.log(values);
            console.log(res);
            if(res.data.success){
                openNotificationSuccess('Thành công' , res.data.message ,3);
                console.log(res.data.body);
                dispatch(ActionRoute.updateRoute({
                    chuyendi : res.data.body.updateOne._id,
                    chuyenve : res.data.body.updateTwo._id,
                    value : values
                })) 
              
                props.setValuesNull();
                props.onCloseModal();
                setKm(1);
                setStatus(false)
            }
            else{
                openNotificationErorr('Thất bại' , res.data.message ,3)
            }
        }
        catch(err){
            console.log(err);
        }
       }
       

    }
    const onFinishFailed =()=>{

    }
    const onChangeKm = (e)=>{
        // const key = km;
        // key > Math.round(e/70) ? setKm(key) : setKm(Math.round(e/70));
        setKm(Math.round(e/70));
    }
    const getCheckRoute = async(id)=>{   
        if(id){
            try{
                Display();
                const res = await ApiRoute.checkRoute({
                    id : id
                });
                Hidden()   
                console.log(res);
                if(res.data.success){
                    console.log(res.data.body);
                    setStatus(res.data.body);
                }
                else{
                    openNotificationErorr('Thất bại' , res.data.message ,3)
                }
            }
            catch(err){
                console.log(err);
            }
        }
      
    };
    useEffect(()=>{
        if(value.quanduong){
            const quangduong = Math.round(value.quangduong/70);
            setKm(quangduong);
        }   
    },[value]);
    useEffect(()=>{
     getCheckRoute(value._id)
    },[value])

    return (
        <Modal title={isActive ? "Thêm tuyến đường " : "Sửa tuyến đường"}  
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
                isActive ? 
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
                           label="Ký hiệu tuyến"
                           name="matuyen"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                          
                       >    
                           <Input 
                                //  defaultValue={currentUser.hovaten}
                                //   value={currentUser.hovaten}
                            allowClear/>
                       </Form.Item>     
                       <Form.Item
                           label="Nơi đi"
                           name="noidi"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                         
                       >
                           <Input 
                                //  defaultValue={currentUser.hovaten}
                                //   value={currentUser.hovaten}
                            allowClear/>
                       </Form.Item>     
                       <Form.Item
                           label="Nơi đến"
                           name="noiden"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                         
                       >
                           <Input 
                                //  defaultValue={currentUser.hovaten}
                                //   value={currentUser.hovaten}
                            allowClear/>
                       </Form.Item>     
                       <Form.Item
                           label="Quãng đường"
                           name="quangduong"
                           rules={[ { 
                                        required: true, 
                                        message: "Không được bỏ trống !. Vui lòng nhập lại"    
                                     },
                                ]}
                           hasFeedback
                        
                       >
                           <InputNumber min={100} step={10} onChange={onChangeKm} allowClear style={{width : '100%'}} />
                       </Form.Item>     
                       <Form.Item
                           label="Thời gian hành trình"
                           name="thoigian"
                           rules={[ { 
                                        required: true, 
                                        message: "Không được bỏ trống !. Vui lòng nhập lại"    
                                     },
                                    //  {
                                    //      min : 1,
                                    //      message : "Không hợp lệ . Vui lòng chọn lại"
                                    //  },
                                    //  {
                                    //      max : 1 ,
                                    //      message : "Không hợp lệ. vui lòng chọn lại"
                                    //  }
                                ]}
                           hasFeedback
                          
                       >
                           <InputNumber min={km} allowClear style={{width : '100%'}}/>
                       </Form.Item >     
                       {/* <div className="ant-row ant-form-item ant-form-item-has-feedback ant-form-item-has-success" style={{rowGap : '0px'}}>
                        <div className="ant-col ant-col-8 ant-form-item-label">
                            <label className="ant-form-item-required" title="Nơi đến">Nơi đến</label>
                        </div>
                        <div className="ant-col ant-col-16 ant-form-item-control">
                            <div className="ant-form-item-control-input-content">
                                <div className="ant-input-number" style={{width : '100%'}}>
                                    <InputNumber name="thoigian" readOnly value={km} style={{width : '100%'}}/>
                                </div>
                            </div>
                        </div>

                    </div> */}
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
                           label="id"
                           name="id"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={value._id}
                          
                       >
                           <Input readOnly disabled
                                //  defaultValue={currentUser.hovaten}
                                //   value={currentUser.hovaten}
                            allowClear/>
                        </Form.Item>  
                        {
                            status === false ?
                           <>
                               <Form.Item
                                    label="Ký hiệu tuyến"
                                    name="matuyen"
                                    rules={[{ required: true, 
                                                message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                                
                                            }]}
                                    hasFeedback
                                    initialValue={value.matuyen}
                                    
                                >
                                     <Input />
                                </Form.Item>     
                                <Form.Item
                                    label="Nơi đi"
                                    name="noidi"
                                    rules={[{ required: true, 
                                                message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                                
                                            }]}
                                    hasFeedback
                                    initialValue={value.noidi}
                                >
                                       
                                        <Input allowClear/> 
                                </Form.Item>     
                                <Form.Item
                                    label="Nơi đến"
                                    name="noiden"
                                    rules={[{ required: true, 
                                                message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                                
                                            }]}
                                    hasFeedback
                                    initialValue={value.noiden}
                                >
                                   
                                        <Input allowClear/> 
                                    
                                </Form.Item>    
                            </> 
                            :

                            <>
                                    <Form.Item
                                    label="Ký hiệu tuyến"
                                    name="matuyen"
                                    rules={[{ required: true, 
                                                message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                                
                                            }]}
                                    hasFeedback
                                    initialValue={value.matuyen}
                                    
                                >
                                   <Input disabled/>
                                
                                </Form.Item>     
                                <Form.Item
                                    label="Nơi đi"
                                    name="noidi"
                                    rules={[{ required: true, 
                                                message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                                
                                            }]}
                                    hasFeedback
                                    initialValue={value.noidi}
                                >
                                    <Input disabled/>
                                </Form.Item>     
                                <Form.Item
                                    label="Nơi đến"
                                    name="noiden"
                                    rules={[{ required: true, 
                                                message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                                
                                            }]}
                                    hasFeedback
                                    initialValue={value.noiden}
                                >
                                   <Input disabled/>
                                
                                </Form.Item>    
                            </>

                        }
                      
                      <Form.Item
                           label="Trạng thái"
                           name="trangthai"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                          initialValue= {value.trangthai}
                       > 
                       <Select value={value.trangthai} readOnly>
                           <Option value={true}>
                                Hoạt động
                           </Option>
                           <Option value={false}>
                                Tạm dừng
                           </Option>
                       </Select>
                        </Form.Item>   
                   <Form.Item
                       label="Quãng đường"
                       name="quangduong"
                       rules={[ { 
                                    required: true, 
                                    message: "Không được bỏ trống !. Vui lòng nhập lại"    
                                 },
                            ]}
                       hasFeedback
                       initialValue={value.quangduong}
                   >
                       <InputNumber min={100} step={10} onChange={onChangeKm} allowClear style={{width : '100%'}} />
                   </Form.Item>     
                   
                   <Form.Item
                       label="Thời gian hành trình"
                       name="thoigian"
                       rules={[ { 
                                    required: true, 
                                    message: "Không được bỏ trống !. Vui lòng nhập lại"    
                                 },
                            ]}
                       hasFeedback
                       initialValue={value.thoigian}
                   >
                       <InputNumber min={km} allowClear style={{width : '100%'}} />
                   </Form.Item>     
                   
                </Form>
            }
                {Loading}
           </Modal>
    );
}

export default Modals;