import React, { useEffect , useState} from 'react';
import { Modal , Form  , Input , Button , Select} from 'antd';
import * as ApiTicket from '../../../../Api/Ticket/index';
import useLoading from '../../../HookLoading/HookLoading';
import { openNotificationSuccess , openNotificationErorr } from '../../../Notfication';
const { Option , OptGroup } = Select;
const layout = { 
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const formatMoney=(n) =>{
    return n.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}  
function ModalUpIn(props) {
    // const infor = props.inforModal;
    // console.log(infor);
    const [ slot , setSlot ] = useState([]);
    const [ Loading , Display , Hidden] = useLoading();
    const infor = props.inforModal
    const onFinish =async(values)=>{
        try{
            if(props.value === 0 ) // thêm
            {
                Display();
                values.trip = props.id
                const res = await ApiTicket.insertTicketOfAdmin(values);
                Hidden();
                if(res.data.success){
                    openNotificationSuccess('Thành công' , res.data.message , 3);
                    props.insertTicket(res.data.body);
                    
                }
                else{
                    openNotificationErorr('Thất bại' , res.data.message , 3);
                }
                props.closeModal();
            }
        
            else{

                Display();
                values.trip = props.id
                const res = await ApiTicket.updateTicketOfAdmin(values);
                Hidden();
                if(res.data.success){
                    openNotificationSuccess('Thành công' , res.data.message , 3);
                    props.propsUpdateTicket(res.data.body);
                    
                }
                else{
                    openNotificationErorr('Thất bại' , res.data.message , 3);
                }
                props.closeModal();
                
            }
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        const getSlotCar = async(id)=>{
            try{
                const body = {
                    trip : id
                }
                const res = await ApiTicket.getGetSlotCar(body)
                if(res.data.success){
                    setSlot(res.data.body);
                }
            }catch(err){
                console.log(err);
            }
        }
        getSlotCar(props.id)
    }, [])

    console.log(slot)
    return (
        <Modal title={props.value === 0 ? "Thêm vé xe "  : "Chỉnh sửa vé xe"}   visible={true}  onCancel={props.closeModal} 
        footer={[
            <Button type="primary" htmlType="submit" form="my_form">
                     Xác nhận
            </Button>,
            <Button type="" htmlType="submit" onClick={props.closeModal}>
                    Hủy
            </Button>
            ]}
        
        >   
            {
                props.value === 0 ? 
                         
                 <Form
                   id="my_form"
                   {...layout}
                   name="basic"
                   initialValues={{ remember: true }}
                   style={{margin :  "auto"}}
                   preserve={true}
                   onFinish={onFinish}
                   >
                    
                    <Form.Item
                        label="Tên người nhận"
                        name="hovaten"
                        rules={[{ required: true, 
                            message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                            
                         }]}
                        hasFeedback
                        >
                        <Input allowClear/>
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
                    <Form.Item
                        label="Hình thức thanh toán"
                        name="hinhthucthanhtoan"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,                        
                               },
                            ]}
                        hasFeedback
            
                    >
                    <Select>
                        <Option value="OFFLINE">OFFLINE</Option>
                        <Option value="ONLINE">ONLINE</Option>
                    </Select>
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái thanh toán"
                        name="trangthaithanhtoan"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,                        
                               },
                            ]}
                        hasFeedback
            
                    >
                    <Select>
                        <Option value={false}>Chưa thanh toán</Option>
                        <Option value={true}>Đã thanh toán</Option>
                    </Select>
                    </Form.Item>
                    <Form.Item
                        label="Số ghế"
                        name="soghe"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,                        
                               },
                            ]}
                        hasFeedback
            
                    >
                    <Select>
                        {
                            slot.length > 0 ? 
                            slot.map((value,index)=>{
                                return <Option key={index} value={value}>{value}</Option>
                            })
                            : ""

                        }
                       
                        
                    </Select>
                    </Form.Item>
                   </Form> 
                   :         
                   <Form
                   id="my_form"
                   {...layout}
                   name="basic"
                   initialValues={{ remember: true }}
                   style={{margin :  "auto"}}
                   preserve={true}
                   onFinish ={onFinish}
                   >
                        <Form.Item
                           label="id"
                           name="id"
                            initialValue={
                                infor._id
                            }
                       >
                           <Input readOnly/>
                       </Form.Item>
                        <Form.Item
                           label="Tên người nhận"
                           name="hovaten"
                           rules={[{ required: true, 
                            message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                            
                             }]}
                            initialValue={infor? infor.hovaten : " "}
                       >
                           <Input allowClear/>
                       </Form.Item>
                       <Form.Item
                           label="Số điện thoại"
                           name="sdt"
                           initialValue={infor? infor.sdt : " "}
                           rules={[{ required: true, 
                            message: "Không được bỏ trống !. Vui lòng nhập lại" ,                        
                         },
                         {
                             len : 10,
                             pattern: '0[3|5|7|8|9]+[0-9]{8}',
                             message : 'Sai định dạng số điện thoại'
                         }
                      ]}
                           >
                           <Input allowClear/>
                       </Form.Item>
                       <Form.Item
                           label="Email"
                           name="email"
                           initialValue={infor? infor.email : " "}
                           rules={[{ required: true, 
                            message: "Không được bỏ trống !. Vui lòng nhập lại" ,                        
                         },
                         {
                             type:"email",
                             message:"Nhập email phải có @/*/.com"
                         }
                        ]}
                           >
                           <Input allowClear/>
                       </Form.Item>
                       <Form.Item
                           label="Hình thức thanh thoán"
                           name="hinhthucthanhtoan"
                           rules={[{ required: true, 
                            message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                            
                            }]}
                           initialValue={infor.hinhthucthanhtoan? infor.hinhthucthanhtoan: " "}
                           >
                            <Select>
                            <Option value="OFFLINE">OFFLINE</Option>
                            <Option value="ONLINE">ONLINE</Option>
                        </Select>
                       </Form.Item>
                       <Form.Item
                           label="Trạng thái thanh toán"
                           name="trangthaithanhtoan"
                           rules={[{ required: true, 
                            message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                            
                         }]}
                           initialValue={infor.trangthaithanhtoan  === false ? "Chưa thanh toán" : "Đã thanh toán"}
                           >
                            <Select>
                            <Option value={false}>Chưa thanh toán</Option>
                            <Option value={true}>Đã thanh toán</Option>
                         </Select>
                       </Form.Item>
                       <Form.Item
                           label="Số ghế"
                           name="soghe"
                           rules={[{ required: true, 
                            message: "Không được bỏ trống !. Vui lòng nhập lại" ,
                            
                         }]}
                           initialValue={infor.soghe}
                           >
                            <Select allowClear>
                             {
                                slot.length > 0 ? 
                                slot.map((value,index)=>{
                                    return <Option key={index} value={value}>{value}</Option>
                                })
                                : ""
                          
                              }
                         </Select>
                       </Form.Item>
                      
                   </Form>    
                }
                {Loading}
      </Modal>
    );
}

export default ModalUpIn;