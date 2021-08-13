import React, { useState } from "react";
import { Form, Input, Button, Modal} from "antd";
// import axios from '../../axios/index';
import { useHistory  , Link} from "react-router-dom";
import '../SignIn/SignIn.css';
import Logo from '../../img/futas.jpeg';
import { FacebookFilled , GooglePlusOutlined , UserOutlined ,LockOutlined } from '@ant-design/icons';
import * as ApiAuthencation from '../../Api/Authencation/index';
import useLoading from '../../Component/HookLoading/HookLoading';
import { useDispatch } from "react-redux";
import * as ActionToken from '../../Reducer/Token';
import * as ActionIsAdmin from '../../Reducer/isAdminReducer';
import { openNotificationSuccess , openNotificationErorr } from '../../Component/Notfication/index';
import * as ApiUser from '../../Api/User/index'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
function SignIn(props) {
    const history = useHistory();
    const dispatch = useDispatch()
    const [Loading , Hidden , Display] = useLoading();
    const [modal , setModal] = useState();
    const onFinish = async (values) => {
        try{
  
              Display();
              const res = await ApiAuthencation.login(values);
              Hidden();
              console.log(res.data);
              if(res.data.success){
                  
                  localStorage.setItem('accessToken' , res.data.body.tokenAccess);
                  localStorage.setItem('refreshToken' , res.data.body.tokenRefresh); 
                  openNotificationSuccess('Thành công',res.data.message, 3);
                  
                  console.log(res);
                  if(res.data.body.vaitro === 0) {
                     history.replace('/');
                     dispatch(ActionToken.addToken());
                  }
                  else{
                    history.replace('/admin/tuyen-duong');
                    dispatch(ActionToken.addToken());
                    dispatch(ActionIsAdmin.isAdmin());
                  }
              }
              else{
                openNotificationErorr('Thất bại', res.data.message , 3);
              }
        }catch(err){
            Hidden();
            console.log(err)
            openNotificationErorr('Thất bại', 'Lỗi hệ thống' , 3);
        }
      
         
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };

    const showModal = ()=>{
        setModal(true);
    }
    const hiddenModal = ()=>{
        setModal(false);
    }
    const onFinishModal = async (value)=>{
        try{
  
            Display();
            hiddenModal();
            const res = await ApiUser.forgotPassword(value);
            Hidden();
            console.log(res);
            if(res.data.success){
             
                openNotificationSuccess('Thành công',res.data.message, 3)
            }
            else{
                hiddenModal();
                Hidden();
              openNotificationErorr('Thất bại', res.data.message , 3);
            }
      }catch(err){
          Hidden();
          openNotificationErorr('Thất bại', 'Lỗi hệ thống' , 3);
      }
    

    }
    const onFinishFailedModal = (e)=>{
        console.log(e);
    }
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
                    <h3 className="header__title">Đăng nhập</h3>
                </div>
                <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{margin :  "auto"}}
                preserve={false}
                >
                    <Form.Item
                        label="Tài khoản"
                        name="taikhoan"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                  
                               }]}
                        hasFeedback
                        
                    >
                        <Input allowClear
                            prefix={<UserOutlined className="site-form-item-icon" />}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="matkhau"
                        rules={[{ required: true, message: "Không được bỏ trống !. Vui lòng nhập lại" }]}
                        hasFeedback
                    >
                        <Input.Password  allowClear
                            prefix={<LockOutlined  className="site-form-item-icon" /> }
                        />

                    </Form.Item>
                    <div {...tailLayout} className="responsive-form footer__btn">
                        <Button type="primary" htmlType="submit" className="btn">
                                Xác nhận
                        </Button>
                        <p className="forgot__password" onClick={showModal}>Quên mật khẩu ?</p>
                        <Button type="dashed" className="btn" icon={ <FacebookFilled />}> 
                                Đăng nhập bằng facebook
                        </Button>
                        <Button type="dashed" className="btn" icon={<GooglePlusOutlined />}> 
                                Đăng nhập bằng google
                        </Button> 
                    </div>
                </Form>
            </div>
        </div>
        <div className="footer">
            <p className="text__footer">Bạn chưa có tài khoản?</p>
            <Link className="text__footer primary" style={{textAlign : 'center'}} to="/signup">
                <p>Đăng kí miễn phí ngay!</p></Link>
        </div>
        {
        modal ?
        
        <Modal title= "Quên mật khẩu"
                visible={modal} 
                onCancel={hiddenModal} 
                footer={[
                    <Button type="primary" htmlType="submit" form="my_form">
                             Xác nhận
                    </Button>
                ]}
                >
                <Form
                id="my_form"
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinishModal}
                onFinishFailed={onFinishFailedModal}
                style={{margin :  "auto"}}
                preserve={true}
                >
                    <Form.Item
                            label="Tài khoản"
                            name="taikhoan"
                            
                            rules={[{ required: true, message: "Không được bỏ trống !. Vui lòng nhập lại" }
                            ]}
                            hasFeedback
                        >
                        <Input allowClear />

                        </Form.Item>
                    </Form> 
            </Modal>
        :null
            }
        {Loading}
    </div>
    );
}

export default SignIn;