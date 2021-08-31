import React from 'react';
import {Result , Button} from 'antd';
import  {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
function NotFound(props) {
    const history = useHistory();
    const isAdmin = useSelector(state => state.isAdmin);
    const role = localStorage.getItem('role');
    const onClick =()=>{
        if(role == 2 && isAdmin){
          history.replace("/admin/tuyen-duong") 
        }
        else if(role == 1 && isAdmin){
          history.replace("/admin/lich-trinh");
        }
        else{
          history.replace("/");
        }
        
    }
    return (
        <Result style={{height : '100vh' , marginTop : '30vh'}}
        title="Trang không tồn tại hoặc bạn không có quyền đề truy cập"
        extra={
          <Button type="primary" key="console" onClick={onClick}>
            Quay lại
          </Button>
        }
      />
    )
    
}

export default NotFound;