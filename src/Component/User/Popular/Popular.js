import React from 'react';
import '../Popular/Popular.css'
import { Row , Col } from 'antd';
import { ClockCircleOutlined , MinusSquareOutlined , HeatMapOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
function Popular(props) {
        
        const { listRoute } = props;
        const history =  useHistory();
        const onClick = (noidi , noiden)=>{
                history.push({
                        pathname : '/tim-kiem',
                        search : '?step=1',
                        state:{
                                noidi ,
                                noiden
                        }
                })
                console.log('hello');
        }
        const formatMoney=(n) =>{
                return n.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
        const listResult = listRoute.map((value,index)=>{
                return (
                <Col span={24} xxl={8} lg={12} key={index} onClick={(e)=>onClick(value.noidi , value.noiden)}>
                        <div className="popular__item">
                                <div className="item__image">
                                        <img src={value.hinhanh === ''? "https://futabus.vn/_nuxt/img/commonRoutes_1.9fcce6a.png" : value.hinhanh}  style={{height : '89px'}}></img>
                                </div>
                                <div className="item__body">
                                        <p className={index%2 ===0 ?"item__text text-primary" : "item__text text-green"}>{value.noidi} ⇒ {value.noiden} </p>   
                                        <div className="item__information">
                                                <div className="item__location">
                                                        <HeatMapOutlined />
                                                        <span className="padding__left-4">{value.quangduong}km</span>
                                                </div>
                                                <div className="item__clock">
                                                <ClockCircleOutlined />
                                                <span className="padding__left-4">8h</span>
                                                </div>
                                                <div className="item__price">
                                                <MinusSquareOutlined /> 
                                                <span className={index%2 ===0 ?"padding__left-4 text-primary": "padding__left-4 text-green"}>90.000đ</span>       
                                                </div>
                                        </div>
                                </div>
                        </div>
                </Col>
                )
        })    
        return (
                <div className="popular">
                        <div className="popular__header">
                        <span>Tùy chọn phổ biến</span>
                        </div>
                        <div className="popular__body">
                        <Row gutter={[32 , 16]}>
                                {listResult}
                        </Row>
                        </div>
                </div>
         );
}

export default Popular;