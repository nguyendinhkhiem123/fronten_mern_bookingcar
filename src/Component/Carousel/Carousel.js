import React from 'react';
import { Carousel } from 'antd';


const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
const img = {
    width : '100%'
}
function Carousels(props) {

    return (
        <Carousel  autoplay style={{marginTop : '40px'}}>
            <div>
                <img style={img} src="https://cdn.vato.vn/google-storage/facecar-29ae7.appspot.com/office/requirement/3324f4e0-b206-11eb-95a2-ab62bc6a0b71-1620702526254.png"/>
            </div>
            <div>
                <img style={img} src="https://cdn.vato.vn/google-storage/facecar-29ae7.appspot.com/office/requirement/44befa20-abbc-11eb-95a2-ab62bc6a0b71-1620011066050.jpg"/>
            </div>
            <div>
                <img style={img} src="https://cdn.vato.vn/google-storage/facecar-29ae7.appspot.com/office/requirement/0000c050-8635-11eb-95a2-ab62bc6a0b71-1615884775637.jpg"/>
            </div>
        
        </Carousel>
    )
}

export default Carousels;