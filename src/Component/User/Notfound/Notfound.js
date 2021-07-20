import React from 'react';
import {Result , Button} from 'antd';
import  {useHistory} from 'react-router-dom'
function NotFound(props) {
    const history = useHistory();
    const onClick =()=>{
        history.replace("/")
    }
    return (
        <Result
        title="Trang không tồn tại"
        extra={
          <Button type="primary" key="console" onClick={onClick}>
            Trang chủ
          </Button>
        }
      />
    )
    
}

export default NotFound;