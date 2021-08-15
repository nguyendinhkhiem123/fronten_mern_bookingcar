import React, { useState  , useEffect} from 'react';
import { Modal , Button  , Form , Select , Input} from 'antd';
import { openNotificationSuccess , openNotificationErorr } from '../../Notfication/index';
import useLoading from '../../HookLoading/HookLoading';

const layout = { 
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
const { Option , OptGroup } = Select;
const { TextArea } = Input;
function Modals(props) {
    
    const [Loading , Hidden , Display ] = useLoading();
    const handleCancel = ()=>{
        props.onCloseModal();
    }
    const onFinish =async(values)=>{
        props.insertVote(values);
    }
   
 
    return (
        <Modal title="Thêm đánh giá"
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
           
             <Form
                id="my_form"
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                style={{margin :  "auto"}}
                preserve={true}
                >

                    <Form.Item
                           label="Số sao"
                           name="sosao"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                           
                       >
                       <Select>
                           <Option value={1}>1</Option>
                           <Option value={2}>2</Option>
                           <Option value={3}>3</Option>
                           <Option value={4}>4</Option>
                           <Option value={5}>5</Option>
                       </Select>
                        
                    </Form.Item>          
                    <Form.Item
                           label="Mô tả"
                           name="mota"
                           rules={[{ required: true, 
                                     message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                                     
                                  }]}
                           hasFeedback
                           
                       >
                       <TextArea rows={2}></TextArea>
                    </Form.Item>    
                </Form>
                {Loading}
           </Modal>
    );
    
}

export default Modals;