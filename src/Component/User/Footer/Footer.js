import React from 'react';
import { Layout, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
function Footers(props) {
    return (
        <Footer style={{ textAlign: 'center'  ,marginTop : '40px',backgroundColor: '#ccc' , color: '#fff' }}>Create by Ng D. Khiem</Footer>
    );
}

export default Footers;