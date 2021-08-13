import React from 'react';
import { Modal , Form , Button , Input , InputNumber , Select} from 'antd';

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
    console.log(value);
    const handleCancel = ()=>{
        props.onCloseModal();
    }

    const onFinish = (values)=>{
        if( isActive ){
            props.onClickInsert(values);
           
        }
       else{
           console.log(values);
           props.onClickUpdate(values);
          
       }
       props.onCloseModal();
    }
    const onFinishFailed =()=>{

    }
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
                           label="Mã tuyến"
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
                           <InputNumber min={0} allowClear style={{width : '100%'}} />
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
                        
                       >
                           <InputNumber min={0} allowClear style={{width : '100%'}} />
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
                           label="id"
                           name="id"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={value._id}
                          
                       >
                           <Input readOnly
                                //  defaultValue={currentUser.hovaten}
                                //   value={currentUser.hovaten}
                            allowClear/>
                        </Form.Item>  
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
                       label="Mã tuyến"
                       name="matuyen"
                       rules={[{ required: true, 
                                 message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                 
                              }]}
                       hasFeedback
                       initialValue={value.matuyen}
                              
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
                       initialValue={value.noidi}
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
                       initialValue={value.noiden}
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
                       initialValue={value.quangduong}
                   >
                       <InputNumber min={0} allowClear style={{width : '100%'}} />
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
                       <InputNumber min={0} allowClear style={{width : '100%'}} />
                   </Form.Item>     
                </Form>
            }
           </Modal>
    );
}

export default Modals;