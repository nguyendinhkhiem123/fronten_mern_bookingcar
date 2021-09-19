import React from 'react';
import { Modal , Form , Button , Input , InputNumber , Select , DatePicker} from 'antd';
import moment from 'moment';
const { Option } = Select;
const layout = { 
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
}
function Modals(props) {
    
    const { isActive  , value} = props;
    console.log(value);
    const handleCancel = ()=>{
        props.onCloseModal();
    }

    const onFinish = (values)=>{
        if( isActive ){
            props.onClickInsert(values);
           
        }
       else{
           props.onClickUpdate(values);
          
       }
    //    props.onCloseModal();
    }
    const onFinishFailed =()=>{

    }
    return (
        <Modal title={isActive ? "Thêm nhân viên " : "Sửa thông tin nhân viên"}  
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
                        label="Họ và tên"
                        name="hovaten"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                  
                               }]}
                        hasFeedback
            
                    >
                        <Input  allowClear/>
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="diachi"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                  
                               }]}
                        hasFeedback
            
                    >
                        <Input  allowClear/>
                    </Form.Item>
                    <Form.Item
                        label="Ngày sinh"
                        name="ngaysinh"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                  
                               }]}
                   
                        hasFeedback
                        
                    >
                        <DatePicker style={{width:"100%"}} placeholder="Chọn ngày" disabledDate={disabledDate}/>
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="sdt"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,                        
                               },
                               {
                                   len : 10,
                                   pattern: '0[3|5|7|8|9]+[0-9]{8}',
                                   message : 'Sai định dạng số điện thoại'
                               }
                            ]}
                        hasFeedback
            
                    >
                    <Input   allowClear/>
                    </Form.Item>
                    <Form.Item
                        label="email"
                        name="email"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,                        
                               },
                               {
                                   type:"email",
                                   message:"Nhập email phải có @/*/.com"
                               }
                            ]}
                        hasFeedback
            
                    >
                    <Input allowClear/>
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
                        label="Mã nhân viên"
                        name="id"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                  
                               }]}
                        hasFeedback
                        initialValue={value._id}
                    >
                        <Input  readOnly/>
                    </Form.Item>
                    <Form.Item
                        label="Họ và tên"
                        name="hovaten"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                  
                               }]}
                        hasFeedback
                        initialValue={value.hovaten}
                    >
                        <Input  allowClear/>
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="diachi"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                  
                               }]}
                        hasFeedback
                        initialValue={value.diachi}
                    >
                        
                        <Input  allowClear/>
                    </Form.Item>
                    <Form.Item
                        label="Ngày sinh"
                        name="ngaysinh"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                  
                               }]}
                   
                        hasFeedback
                        initialValue={moment(value.ngaysinh , 'YYYY-MM-DD')}
                    >
                        <DatePicker style={{width:"100%"}} placeholder="Chọn ngày" disabledDate={disabledDate}/>
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="sdt"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,                        
                               },
                               {
                                   len : 10,
                                   pattern: '0[3|5|7|8|9]+[0-9]{8}',
                                   message : 'Sai định dạng số điện thoại'
                               }
                            ]}
                        hasFeedback
                        initialValue={value.sdt}
                    >
                    <Input   allowClear/>
                    </Form.Item>
                    <Form.Item
                        label="email"
                        name="email"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,                        
                               },
                               {
                                   type:"email",
                                   message:"Nhập email phải có @/*/.com"
                               }
                            ]}
                        hasFeedback
                        initialValue={value.email}
                    >
                    <Input allowClear/>
                    </Form.Item>
                </Form>
            }
           </Modal>
    );
}

export default Modals;