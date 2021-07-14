import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout , Button , Row , Col ,Select } from 'antd';
import { RightOutlined ,LeftOutlined } from '@ant-design/icons'
import '../BookStepTwo/BookStepTwo.css';
import Process from '../../Process/Process';
import {openNotificationErorr} from '../../../Notfication/index';
const { Option } = Select;
const {  Content } = Layout;
function BookStepTwo(props) {
    const location = useLocation();
    const history = useHistory();
    const state = location.state;
    

    useEffect(()=>{
        if(!state){
            openNotificationErorr('Thất bại' , 'Vui lòng chọn địa điểm' ,3);
            history.push('/');
        }
        else{
            
        }
    },[])
    console.log(state);
    const onClick = ()=>{
        console.log('hello')
    }
    return (
        <div>
            <Content>
                <div className="site-layout-content" style={{overflowX:'hidden'}}>
                    <Process isActive={1}></Process>
                    <div className="step_two">
                            <Row gutter={[8 ,8]}>
                                <Col md={6} span={24}>
                                    <div className="step__info">
                                        <div className="step__info--header">
                                                <p className="header__date">{state ? state.thogianbatdau : 'Không xác định'}</p>
                                                <p className="header__route">{state ? `${state.noidi} ⇒ ${state.noiden}` : 'Không xác định'}</p>
                                        </div>
                                        <div className="step__info--body">
                                                <p>
                                                    Thời gian đi:
                                                    <Select defaultValue="lucy" style={{ width: '100%' , marginTop : '10px' }}>
                                                        <Option value="jack">Jack</Option>
                                                        <Option value="lucy">Lucy</Option>
                                                    </Select>
                                                </p>
                                                {/* <p>
                                                    Thời gian về:
                                                    <Select defaultValue="lucy" style={{ width: '100%' , marginTop : '10px' }}>
                                                        <Option value="jack">Jack</Option>
                                                        <Option value="lucy">Lucy</Option>
                                                    </Select>
                                                </p> */}
                                                <p className="info__title">
                                                    Quãng đường : {(state && state.quanguong) ? state.quangduong : 'Không xác định'}
                                                </p>
                                                <p class="info__title">
                                                     Thời gian đến : 8h
                                                 </p>
                                        </div>
                                    </div>
                                </Col>

                                <Col md={18} span={24}>
                                    <div class="step__body">
                                        <div className="step__body--header"><p>Sơ đồ ghế đi</p></div>
                                        <div className="step__body--body">
                                            <div className="body__build">
                                                <p className="step__info--header">TẦNG 1</p>
                                                <Row gutter={[8,8]}>
                                                        <Col span={6}>
                                                            <div class="body__number">1</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">2</div>
                                                        <div class="body__number--status null"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">3</div>
                                                        <div class="body__number--status chose"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">4</div>
                                                        <div class="body__number--status active"  ></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">5</div>
                                                        <div class="body__number--status active"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">6</div>
                                                        <div class="body__number--status null"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">7</div>
                                                        <div class="body__number--status chose"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">8</div>
                                                        <div class="body__number--status active"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">9</div>
                                                        <div class="body__number--status active"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">10</div>
                                                        <div class="body__number--status null"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">11</div>
                                                        <div class="body__number--status chose"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">12</div>
                                                        <div class="body__number--status active"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">13</div>
                                                        <div class="body__number--status active"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">4</div>
                                                        <div class="body__number--status null"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">15</div>
                                                        <div class="body__number--status chose"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">16</div>
                                                        <div class="body__number--status active"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">17</div>
                                                        <div class="body__number--status active"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">18</div>
                                                        <div class="body__number--status null"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">19</div>
                                                        <div class="body__number--status chose"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">20</div>
                                                        <div class="body__number--status active"></div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="body__build">
                                            <p className="step__info--header">TẦNG 2</p>
                                                <Row gutter={[8,8]}>
                                                <Col span={6}>
                                                        <div class="body__number">1</div>
                                                        <div class="body__number--status active"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">2</div>
                                                        <div class="body__number--status null"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">3</div>
                                                        <div class="body__number--status chose"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">4</div>
                                                        <div class="body__number--status active"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">1</div>
                                                        <div class="body__number--status active"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">2</div>
                                                        <div class="body__number--status null"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">3</div>
                                                        <div class="body__number--status chose"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">4</div>
                                                        <div class="body__number--status active"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">1</div>
                                                        <div class="body__number--status active"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">2</div>
                                                        <div class="body__number--status null"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">3</div>
                                                        <div class="body__number--status chose"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">4</div>
                                                        <div class="body__number--status active"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">1</div>
                                                        <div class="body__number--status active"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">2</div>
                                                        <div class="body__number--status null"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">3</div>
                                                        <div class="body__number--status chose"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">4</div>
                                                        <div class="body__number--status active"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">1</div>
                                                        <div class="body__number--status active"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">2</div>
                                                        <div class="body__number--status null"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">3</div>
                                                        <div class="body__number--status chose"></div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <div class="body__number">4</div>
                                                        <div class="body__number--status active"></div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <div className="step__body--status">
                                            <div style={{display:'flex' , alignItems:'center'  }}>
                                                <div class="status null"></div>
                                                <div>Trống</div>
                                            </div>
                                            <div style={{display:'flex' , alignItems:'center' }}>
                                                <div class="status chose"></div>
                                                <div>Đang chọn</div>
                                            </div>
                                            <div style={{display:'flex' , alignItems:'center'}}>
                                                <span class="status active"></span>
                                                <div>Đã đặt</div>
                                            </div>
                                        </div>
                                        <div className="step__body--footer">
                                                <div className="info__title">
                                                    Ghế đã chọn
                                                </div>
                                                <div className="info__title">
                                                    Tổng tiền
                                                    <div style={{marginTop:'10px' , textAlign:'left' , fontWeight : '700' , color:'#1890ff'}}>{state ?  '1000đ' : '0đ'}</div>
                                                </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            {   (state && state.loai === 2) ?
                                <Row gutter={[8 ,8]}>
                                    <Col md={6} span={24}>
                                        <div className="step__info">
                                            <div className="step__info--header">
                                                    <p className="header__date">{state ? state.thogianbatdau : 'Không xác định'}</p>
                                                    <p className="header__route">{state ? `${state.noiden} ⇒ ${state.noidi}` : 'Không xác định'}</p>
                                            </div>
                                            <div className="step__info--body">
                                                    <p>
                                                        Thời gian đi:
                                                        <Select defaultValue="lucy" style={{ width: '100%' , marginTop : '10px' }}>
                                                            <Option value="jack">Jack</Option>
                                                            <Option value="lucy">Lucy</Option>
                                                        </Select>
                                                    </p>
                                                    {/* <p>
                                                        Thời gian về:
                                                        <Select defaultValue="lucy" style={{ width: '100%' , marginTop : '10px' }}>
                                                            <Option value="jack">Jack</Option>
                                                            <Option value="lucy">Lucy</Option>
                                                        </Select>
                                                    </p> */}
                                                    <p className="info__title">
                                                        Quãng đường : {state.quangduong}
                                                    </p>
                                                    <p class="info__title">
                                                        Thời gian đến : 8h
                                                    </p>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md={18} span={24}>
                                        <div class="step__body">
                                            <div className="step__body--header"><p>Sơ đồ ghế về</p></div>
                                            <div className="step__body--body">
                                                <div className="body__build">
                                                    <p className="step__info--header">TẦNG 1</p>
                                                    <Row gutter={[8,8]}>
                                                            <Col span={6}>
                                                                <div class="body__number">1</div>
                                                                <div class="body__number--status active"></div>
                                                            </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">2</div>
                                                            <div class="body__number--status null"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">3</div>
                                                            <div class="body__number--status chose"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">4</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">5</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">6</div>
                                                            <div class="body__number--status null"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">7</div>
                                                            <div class="body__number--status chose"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">8</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">9</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">10</div>
                                                            <div class="body__number--status null"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">11</div>
                                                            <div class="body__number--status chose"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">12</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">13</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">4</div>
                                                            <div class="body__number--status null"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">15</div>
                                                            <div class="body__number--status chose"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">16</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">17</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">18</div>
                                                            <div class="body__number--status null"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">19</div>
                                                            <div class="body__number--status chose"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">20</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div className="body__build">
                                                <p className="step__info--header">TẦNG 2</p>
                                                    <Row gutter={[8,8]}>
                                                    <Col span={6}>
                                                            <div class="body__number">1</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">2</div>
                                                            <div class="body__number--status null"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">3</div>
                                                            <div class="body__number--status chose"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">4</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">1</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">2</div>
                                                            <div class="body__number--status null"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">3</div>
                                                            <div class="body__number--status chose"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">4</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">1</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">2</div>
                                                            <div class="body__number--status null"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">3</div>
                                                            <div class="body__number--status chose"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">4</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">1</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">2</div>
                                                            <div class="body__number--status null"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">3</div>
                                                            <div class="body__number--status chose"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">4</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">1</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">2</div>
                                                            <div class="body__number--status null"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">3</div>
                                                            <div class="body__number--status chose"></div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div class="body__number">4</div>
                                                            <div class="body__number--status active"></div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                            <div className="step__body--status">
                                                <div style={{display:'flex' , alignItems:'center'  }}>
                                                    <div class="status null"></div>
                                                    <div>Trống</div>
                                                </div>
                                                <div style={{display:'flex' , alignItems:'center' }}>
                                                    <div class="status chose"></div>
                                                    <div>Đang chọn</div>
                                                </div>
                                                <div style={{display:'flex' , alignItems:'center'}}>
                                                    <span class="status active"></span>
                                                    <div>Đã đặt</div>
                                                </div>
                                            </div>
                                            <div className="step__body--footer">
                                                    <div className="info__title">
                                                        Ghế đã chọn
                                                    </div>
                                                    <div className="info__title">
                                                        Tổng tiền
                                                        <div style={{marginTop:'10px' , textAlign:'left' , fontWeight : '700' , color:'#1890ff'}}>500đ</div>
                                                    </div>
                                            </div>
                                        </div>
                                    </Col>
                            </Row>
                                : 
                                null        
                            }
                    </div>
                    <div className="step_two--footer">
                        <Button type="default" size="large" >
                            {<LeftOutlined />}
                            QUAY LẠI
                        </Button>
                        <Button type="primary" size="large" >
                                TIẾP TỤC
                                {<RightOutlined />}
                        </Button>
                    </div>
                </div>              
            </Content>
        </div>
    );
}

export default BookStepTwo;