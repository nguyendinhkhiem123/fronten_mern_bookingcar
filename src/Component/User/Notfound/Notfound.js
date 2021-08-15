import React from 'react';
import {Result , Button} from 'antd';
import  {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
function NotFound(props) {
    const history = useHistory();
    const isAdmin = useSelector(state => state.isAdmin);
    const onClick =()=>{
        
        isAdmin ?  history.replace("/admin/tuyen-duong") :  history.replace("/");
    }
    return (
        <Result style={{height : '100vh' , marginTop : '30vh'}}
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