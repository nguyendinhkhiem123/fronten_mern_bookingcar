import React from 'react';
import {Result, Button} from 'antd';
import  {useHistory} from 'react-router-dom';

function Success(props) {

    const history = useHistory();
    const onClick =()=>{
        history.replace("/")
    }
    return (  
        <Result
            status="success"
            title="Đặt vé thành công"
            subTitle="Cám ơn quý khách đã tin tưởng chúng tôi"
            extra={[
            <Button type="primary" key="console" onClick={onClick}>
                về trang chủ
            </Button>
          ]}/>
    )

}

export default Success;