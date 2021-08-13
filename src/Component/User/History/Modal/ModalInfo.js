import React from 'react';
import { Modal , Form  , Input} from 'antd'
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
function ModalInfo(props) {
    const infor = props.inforModal;
    console.log(infor);
    return (
        <Modal title="Thông tin thêm của tuyến xe" visible={props.isVisiable} onOk={props.closeModal} onCancel={props.closeModal} >
                 <Form
                   id="my_form"
                   {...layout}
                   name="basic"
                   initialValues={{ remember: true }}
                   style={{margin :  "auto"}}
                   preserve={true}
                   >
                        <Form.Item
                           label="Tên người nhận"
                           name="hovaten"
                            initialValue={infor? infor.hovaten : " "}
                       >
                           <Input readOnly/>
                       </Form.Item>
                       <Form.Item
                           label="Số điện thoại"
                           name="sdt"
                           initialValue={infor? infor.sdt : " "}
                           >
                           <Input readOnly/>
                       </Form.Item>
                       <Form.Item
                           label="Email"
                           name="email"
                           initialValue={infor? infor.email : " "}
                           >
                           <Input readOnly/>
                       </Form.Item>
                       <Form.Item
                           label="Gía vé"
                           name="giave"
                           initialValue={infor.trip? formatMoney(infor.trip.giave.toString())+"đ" : " "}
                           >
                           <Input readOnly/>
                        </Form.Item>
                       <Form.Item
                           label="Hình thức thanh thoán"
                           name="hinhthuc"
                           initialValue={infor.hinhthucthanhtoan? infor.hinhthucthanhtoan: " "}
                           >
                           <Input readOnly/>
                       </Form.Item>
                       <Form.Item
                           label="Trạng thái"
                           name="staus"
                           initialValue={infor.trangthai  === false ? "Chưa thanh toán" : "Đã thanh toán"}
                           >
                           <Input readOnly/>
                       </Form.Item>
                   </Form> 
      </Modal>
    );
}

export default ModalInfo;