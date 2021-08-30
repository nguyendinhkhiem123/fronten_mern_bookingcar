import React from 'react';
import { Layout, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
function Footers(props) {
    return (
        <div 
        style={{
            height : '100px',
            lineHeight : '100px',
            textAlign : 'center',
            fontSize : '20px'
        }}
        >Create by Ng D. Khiem</div>
    );
}

export default Footers;