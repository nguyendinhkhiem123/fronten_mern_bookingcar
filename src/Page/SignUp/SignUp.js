import React from "react";
import { Form, Input, Button, Checkbox, message ,InputNumber ,DatePicker ,Select} from "antd";
import moment from "moment";
// import axios from '../../axios/index';
import { Link, useHistory } from "react-router-dom";
// import Logo from '../../img/logo.png'
import Logo from '../../img/futas.jpeg';
// import {FacebookFilled , GooglePlusOutlined } from '@ant-design/icons';
import * as ApiAuthencation from '../../Api/Authencation/index';
import useLoading from '../../Component/HookLoading/HookLoading';
import '../SignUp/SignUp.css'
import { openNotificationSuccess , openNotificationErorr } from '../../Component/Notfication/index';
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
function SiginUp(props) {

  const history = useHistory();

  const [Loading , Hidden , Display] = useLoading();
  const onFinish = async (value) => {
      try{


            Display();
            console.log(value);
            const body = {
                taikhoan : value.taikhoan,
                matkhau  : value.matkhau,
                hovaten : value.hovaten,
                diachi :  value.diachi,
                email : value.email,
                sdt : value.sdt,
                ngaysinh : value.ngaysinh,
                hinhanh : '',
            }
            const res = await ApiAuthencation.createClient(body);

            Hidden();
        
            
            if(res.data.success){
                openNotificationSuccess('Thành công',res.data.message, 3)
                history.replace("/signin");
            }
            else{
                openNotificationErorr('Thất bại',res.data.message, 3)
            }
              
        }catch(err){
          console.log(err);
          openNotificationErorr('Thất bại', 'Lỗi hệ thống' , 3);
      }
       
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
        <div className="header">
             <Link to="/" style={{ display : 'block' , margin:'auto'}}>
                   <img src={Logo} className="header__logo"/>
                   </Link> 
        </div>
        <div className="body">
            <div className="body__body">
                <div className="body_header">
                    <h3 className="header__title">Đăng kí tài khoản</h3>
                </div>
                <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{margin :  "auto"}}
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
                        label="Nhập lại mật khẩu"
                        name="passwordagain"
                        rules={[
                                {   required: true, 
                                    message: "Không được bỏ trống !. Vui lòng nhập lại" 
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      if (!value || getFieldValue('matkhau') === value) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject(new Error('Mật khẩu không khớp'));
                                    },
                                  }),
                            ]}
                        hasFeedback
                    >
                        <Input.Password allowClear/>

                    </Form.Item>
                    <div className="footer__btn1" >
                        <Button type="primary" htmlType="submit" className="btn">
                                Xác nhận
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
        {Loading}                 
    </div>
  );
}

export default SiginUp;
