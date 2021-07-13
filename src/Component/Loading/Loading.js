import React from 'react';
import {LoadingOutlined } from '@ant-design/icons';
import Modal from '../../Component/User/Modal/Modal';
import '../Loading/Loading.css'

function Loading(props) {
    
    return (
     
        <div className="modal--ant">
                 <div className="modal__overlay--ant"></div>  
                 <div className="loading__body">
                    <LoadingOutlined style={{fontSize: '50px' , color: "#1890ff"} } />
                    <p style={{fontSize:'24px'}}>Loading....</p>
            </div>
        </div>
            
        
    );
}

export default Loading;