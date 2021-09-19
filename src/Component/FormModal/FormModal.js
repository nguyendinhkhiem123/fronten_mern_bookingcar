import React, { useEffect , useState} from 'react';
import '../FormModal/FormModal.css'

import { Form, Input, Button, Checkbox, message ,InputNumber ,DatePicker ,Select , Modal} from "antd";
import moment from "moment";
import useLoading from '../HookLoading/HookLoading';
import { updateUser , changePassword } from '../../Api/User/index';
import { openNotificationErorr , openNotificationSuccess } from '../Notfication/index'
import { addUser  } from '../../Reducer/currentUser';
import { useDispatch } from 'react-redux';
import * as ApiUser from '../../Api/User'
import * as ApiAuth from '../../Api/Authencation';
const Option = {Select}
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
function FormModal(props) {
     
      const [Loading , Hidden , Display] = useLoading();
      const dispatch = useDispatch();
      const [ employee , setEmployee] = useState([]); 
      const { isModalVisible ,  type , currentUser } = props;
      const handleCancel = () => {
            props.onClose();
      };
      const onFinish = async(value) => {
        try{
              console.log(value);
              Display();
              let res =null;
              
              if(type === "#canhan"){
                 res = await updateUser(value);
                 res.data.body.hovaten = value.hovaten;
                 dispatch(addUser(res.data.body));
              }
              else if(type === "#doimatkhau"){
                 res = await changePassword(value);
              }
              else{
                res = await ApiAuth.adminCreateEmployee(value);
              }
              Hidden();   
              console.log(res);
              if(res.data.success){
                  props.onClose()
                  openNotificationSuccess('Thành công',res.data.message, 3)
              }
              else{
                  openNotificationErorr('Thất bại',res.data.message, 3)
              }
            
          }catch(err){
            console.log(err);
            openNotificationErorr('Thất bại', 'Lỗi hệ thống' , 3);
        }
        finally{
            
        }
         
    };
    
    const getEmployee = async()=>{
        try{
            const res = await ApiUser.getEmployeeNoAccount();
            if(res.data.success){
                setEmployee(res.data.body)
            }
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        if(type === "#taotaikhoan"){
            getEmployee();
        }
    } ,[type])
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
  
   
    let title = "";
    if(type){
        if(type === "#canhan"){
            title = "Thông tin cá nhân"
        }
        else if(type === "#doimatkhau"){
            title = "Đổi mật khẩu"
        }
        else{
            title = "Tạo tài khoản"
        }
    }
    console.log(type);
    return (
        <Modal title={title}  
                visible={isModalVisible} 
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
            {type ==="#canhan"  ? 
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
                           initialValue={currentUser.hovaten}
                       >
                           <Input 
                                //  defaultValue={currentUser.hovaten}
                                //   value={currentUser.hovaten}
                            allowClear/>
                       </Form.Item>
                       <Form.Item
                           label="Địa chỉ"
                           name="diachi"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={currentUser.diachi}
                       >
                           <Input 
                               
                            allowClear/>
                       </Form.Item>
                       <Form.Item
                           label="Ngày sinh"
                           name="ngaysinh"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                      
                           hasFeedback
                           initialValue={moment(currentUser.ngaysinh , 'YYYY-MM-DD')}
                       >
                           <DatePicker style={{width:"100%"}} placeholder="Chọn ngày" disabledDate={disabledDate} 
                              
                            //value={currentUser.ngaysinh}
                           allowClear/>
                       </Form.Item>
                       {/* <Form.Item
                           label="Giới tính"
                           name="gender"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
               
                       >
                            <Select>
                                   <Select.Option value="male">Nam</Select.Option>
                                   <Select.Option value="female">Nữ</Select.Option>
                           </Select>
                       </Form.Item> */}
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
                           initialValue={currentUser.sdt} 
                       >
                       <Input 
                      
                        allowClear/>
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
                        initialValue={currentUser.email}   
                    >
                        <Input 
                       value={currentUser.email}   
                        allowClear/>
                    </Form.Item>
                       {/* <div className="footer__btn1" >
                           <Button type="primary" htmlType="submit" className="btn">
                                   Xác nhận
                           </Button>
                       </div> */}
                   </Form> 
             : 
               " "        
            }     
            {
                type === '#doimatkhau' ?
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
                           label="Mật khẩu cũ"
                           name="matkhaucu"
                           
                           rules={[{ required: true, message: "Không được bỏ trống !. Vui lòng nhập lại" }
                               ,
                               {
                                   min:6 ,
                                   message : "Phải có 6 kí tự trở lên"
                               }
                           ]}
                           hasFeedback
                       >
                           <Input.Password allowClear />
   
                       </Form.Item>
                       <Form.Item
                           label="Mật khẩu Mới"
                           name="matkhaumoi"
                           
                           rules={[{ required: true, message: "Không được bỏ trống !. Vui lòng nhập lại" }
                               ,
                               {
                                   min:6 ,
                                   message : "Phải có 6 kí tự trở lên"
                               }
                           ]}
                           hasFeedback
                       >
                           <Input.Password allowClear />
   
                       </Form.Item>
                    </Form> 
                    :""
            }  
            {
                type === "#taotaikhoan" ?
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
                        label="Tài khoản"
                        name="taikhoan"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                  
                               },
                              
                            
                            ]}
                        hasFeedback
            
                    >
                        <Input allowClear/>
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="matkhau"
                        
                        rules={[{ required: true, message: "Không được bỏ trống !. Vui lòng nhập lại" }
                            ,
                            {
                                min:6 ,
                                message : "Phải có 6 kí tự trở lên"
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password allowClear />

                    </Form.Item>
                    <Form.Item
                        label="Nhân viên"
                        name="nhanvien"
                        
                        rules={[{ required: true, message: "Không được bỏ trống !. Vui lòng nhập lại" }
                        ]}
                        hasFeedback
                    >
                       <Select>
                            {
                                employee.length > 0 ? 
                                employee.map(value=>{
                                    return   <Option value={value._id}>{value.hovaten}</Option>
                                }) :""
                              
                            }
                       </Select>

                    </Form.Item>
                </Form> 
                    : ""
            }
             {Loading}
        </Modal>
    );
}

export default FormModal;