import React, { useEffect , useState} from 'react';
import { Modal , Form  , Input , Button , Select} from 'antd';
import * as ApiTicket from '../../../../Api/Ticket/index';
import useLoading from '../../../HookLoading/HookLoading';
import { openNotificationSuccess , openNotificationErorr } from '../../../Notfication';
import ModalInsert from '../ChoseSlot/Insert/ChoseSlotInsert';
import ModalUpdate from '../ChoseSlot/Update/ChoseSlotUpdate';
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
    const [ openSlot , setOpenSlot ] = useState(false);
    const [ number , setNumber ] = useState(null);
    const infor = props.inforModal
    const onFinish =async(values)=>{
        if(number === null){
            return 
        }
        else{
            try{
                if(props.value === 0 ) 
                {
                    
                    Display();
                    values.trip = props.id
                    values.soghe = number
                    const res = await ApiTicket.insertTicketOfAdmin(values);
                    Hidden();
                    if(res.data.success){
                        openNotificationSuccess('Thành công' , res.data.message , 3);
                        props.insertTicket(res.data.body);
                        props.closeModal();
                        reset();
                    }
                    else{
                        openNotificationErorr('Thất bại' , res.data.message , 3);
                    }
                   
                }
            
                else{
    
                    if(infor.trangthaive === 'DANGUUTIEN'){
                        openNotificationErorr('Thất bại' , 'Vé đang ưu tiên không thể sửa' , 3);
                    }
                    else{
                        Display();
                        values.trip = props.id
                        values.soghe = number
                        const res = await ApiTicket.updateTicketOfAdmin(values);
                        Hidden();
                        if(res.data.success){
                            openNotificationSuccess('Thành công' , res.data.message , 3);
                            props.propsUpdateTicket(res.data.body);
                            props.closeModal();
                            reset();
                            
                        }
                        else{
                            openNotificationErorr('Thất bại' , res.data.message , 3);
                        }
                    }
                   
                    
                }
            }
            catch(err){
                console.log(err)
            }
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

    const onClickOpen = ()=>{
        setOpenSlot(true);
    }
    const onCloseSlot = ()=>{
        setOpenSlot(false);
    }
    const setNum = (value)=>{
        setNumber(value);
    }
    const reset = ()=>{
        setNumber(null);
    
    }

    const clickCancle = ()=>{
        props.closeModal();
        reset();
    }

    useEffect(()=>{
        if(props.inforModal.soghe){
            setNumber(props.inforModal.soghe);
        }
    },[props.inforModal]);
    return (
        <Modal title={props.value === 0 ? "Thêm vé xe "  : "Chỉnh sửa vé xe"}   visible={true}  onCancel={clickCancle} 
        footer={[
            <Button type="primary" htmlType="submit" form="my_form">
                     Xác nhận
            </Button>,
            <Button type="" htmlType="submit" onClick={clickCancle}>
                    Hủy
            </Button>
            ]}
        
        >   
            {
                props.value === 0 ? 
                <>      
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
{/*                  
                    <Form.Item
                        label="Số ghế"
                        name="soghe"
                        rules={[{ required: true, 
                                  message: "Không được bỏ trống !. Vui lòng nhập lại" ,                        
                               },
                            ]}
                        hasFeedback
                        
            
                    >
                
                    <Input onClick={onClickOpen} placeholder="Ấn để chọn ghế" readOnly style={{
                        cursor  : 'pointer'
                    }}></Input>
                    </Form.Item> */}
                     <div className="ant-row ant-form-item ant-form-item-has-feedback ant-form-item-has-success" style={{rowGap : '0px'}}>
                        <div className="ant-col ant-col-8 ant-form-item-label">
                            <label className="ant-form-item-required">Số ghế</label>
                        </div>
                        <div className="ant-col ant-col-16 ant-form-item-control">
                            <div className="ant-form-item-control-input-content">
                                <div className="ant-input-number" style={{width : '100%', border : 'none'}}>
                                    <Input name="soghe" onClick readOnly value={number ? number : null}
                                     onClick={onClickOpen} placeholder="Ấn để chọn ghế" readOnly style={{
                                        cursor  : 'pointer'
                                    }}
                                    />
                                </div>
                            </div>
                              {
                                        number !== null ?  " ":
                                        <div className="ant-form-item-explain ant-form-item-explain-error">
                                            <div role='alert'>
                                                Không được bỏ trống ! . Vui lòng nhập lại
                                            </div>
                                        </div>
                                    }
                        </div>

                    </div>
                   </Form>
                    {
                        openSlot ?   <ModalInsert 
                        id ={props.id}
                        onCloseSlot={onCloseSlot}
                        setNum = {setNum}
                        num = {number}
                      /> 
                       : null
                   }
                 
                   </>
                   : 
                   <>        
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
                           initialValue={infor.trangthaithanhtoan}
                           >
                            <Select>
                                <Option value={false}>Chưa thanh toán</Option>
                                <Option value={true}>Đã thanh toán</Option>
                         </Select>
                       </Form.Item>
                       <div className="ant-row ant-form-item ant-form-item-has-feedback ant-form-item-has-success" style={{rowGap : '0px'}}>
                        <div className="ant-col ant-col-8 ant-form-item-label">
                            <label className="ant-form-item-required">Số ghế</label>
                        </div>
                        <div className="ant-col ant-col-16 ant-form-item-control">
                            <div className="ant-form-item-control-input-content">
                                <div className="ant-input-number" style={{width : '100%', border : 'none'}}>
                                    <Input name="soghe" onClick readOnly value={number ? number : null}
                                     onClick={onClickOpen} placeholder="Ấn để chọn ghế" readOnly style={{
                                        cursor  : 'pointer'
                                    }}
                                    />
                                </div>
                            </div>
                              {
                                        number !== null ?  " ":
                                        <div className="ant-form-item-explain ant-form-item-explain-error">
                                            <div role='alert'>
                                                Không được bỏ trống ! . Vui lòng nhập lại
                                            </div>
                                        </div>
                                    }
                        </div>

                    </div>
                   </Form>    
                   {
                        openSlot ?   <ModalUpdate
                        id ={props.id}
                        onCloseSlot={onCloseSlot}
                        setNum = {setNum}
                        num = {number}
                      /> 
                       : null
                      }
                    </>
                }
                {Loading}
      </Modal>
    );
}

export default ModalUpIn;