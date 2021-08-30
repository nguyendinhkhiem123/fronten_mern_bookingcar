import React from 'react';
import { Modal , Form , Button , Input , InputNumber , Select} from 'antd';
import { useSelector } from 'react-redux';

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
        <Modal title={isActive ? "Thêm thông tin xe " : "Sửa thông tin xe"}  
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
                           label="Biển số xe"
                           name="biensoxe"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                          
                       >
                           <Input 

                            allowClear/>
                       </Form.Item>     
                       <Form.Item
                           label="Số lượng ghế"
                           name="noidi"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                       >
                           <Select>
                               <Option value={16}>16</Option>
                               <Option value={32}>32</Option>
                               <Option value={40}>40</Option>
                           </Select>
                           {/* <InputNumber style={{width : '100%'}}
                                //  defaultValue={currentUser.hovaten}
                                //   value={currentUser.hovaten}
                                readOnly
                            allowClear/> */}
                       </Form.Item>     
                       {/* <Form.Item
                           label="Tuyến hoạt động"
                           name="route"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                         
                       >
                          <Select>
                              {
                                  props.route.length > 0 ? 
                                  props.route.map((values,index)=>{
                                      return (
                                          <Option key={index} value={values.id}>{values.matuyen}</Option>
                                      )
                                  }) : 
                                  null
                              }
                          </Select>
                       </Form.Item>        */}
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
                           label="Biển số xe"
                           name="biensoxe"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                            initialValue={value.biensoxe}
                       >
                           <Input 

                            allowClear/>
                       </Form.Item>     
                       <Form.Item
                           label="Số lượng ghế"
                           name="soluongghe"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={value.soluongghe}
                       >
                           {/* <InputNumber style={{width : '100%'}}
                                //  defaultValue={currentUser.hovaten}
                                //   value={currentUser.hovaten}
                                readOnly
                            allowClear/> */}
                            <Select>
                               <Option value={16}>16</Option>
                               <Option value={32}>32</Option>
                               <Option value={40}>40</Option>
                           </Select>
                       </Form.Item>     
                       <Form.Item
                           label="Trạng thái"
                           name="trangthai"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                           initialValue={value.trangthai}
                       >
                          <Select>
                                <Option value={true}>Đang hoạt động</Option>
                                <Option value={false}>Tạm dừng</Option>
                          </Select>
                       </Form.Item>          
                </Form>
            }
           </Modal>
    );
}

export default Modals;