import React, { useState } from 'react';
import '../Pricing/Pricing.css';
import { Layout } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import Carousels from '../../Carousel/Carousel';
import { Link } from 'react-router-dom'
import {  useSelector } from 'react-redux';
const { Content } = Layout; 

function Pricing(props) {
    const route =  useSelector(state=>state.route);
    const [ textStart , setTextStart ] =  useState('');
    const [ textEnd , setTextEnd ] = useState('');

    let routeStart = [];
    if(route.length > 0){
        routeStart = route.filter((value ,index )=>{
                return value.noiden.toLowerCase().indexOf(textEnd.toLowerCase()) !== -1 && value.noidi.toLowerCase().indexOf(textStart.toLowerCase()) !== -1
              
             
        })
    }
    let ResultArray  = [];

    if(routeStart.length > 0){
        ResultArray  = routeStart.map((value,  index)=>{
            return (
                <tbody key={index}>
                    <tr className="table__thead--body title">
                            <td className="table__route table__route--title">
                                {value.noidi}
                            </td>
                            <td className="table__kind">
                            
                            </td>
                            <td className="table__dis">
                            
                            </td>
                            <td className="table__time">
                            
                            </td>
                            <td className="table__price">
                            
                            </td>
                            <td className="table__active">
                            
                            </td>
                            <td className="end"></td>
                    </tr>

                    {
                       (route.filter((fil , index1)=>{
                            return fil.noiden.toLowerCase().indexOf(textEnd.toLowerCase()) !== -1 && fil.noidi.toLowerCase().indexOf(value.noidi.toLowerCase()) !== -1
                        })
                       ).map((valueOne, index2)=>{
                     return    (<tr className="table__thead--body" key={index2}>
                            <td className="table__route">
                                {valueOne.noiden}
                            </td>
                            <td className="table__kind">
                               Giường
                            </td>
                            <td className="table__dis">
                                {valueOne.quangduong}km
                            </td>
                            <td className="table__time">
                                {value.thoigian}h
                            </td>
                            <td className="table__price">
                             
                            </td>
                            <td className="table__active">
                              
                            </td>
                            <td>
                                <Link  to={
                                        {
                                            pathname : "/tim-kiem",
                                            search : "?step=1",
                                            state : {
                                                noidi :  valueOne.noidi,
                                                noiden : valueOne.noiden
                                            }
                                         }
                                        }
                                        className="route__link"
                                    >
                                    ĐẶT VÉ
                                </Link>
                            </td>
                    </tr>)
                       })
                    }
            </tbody>
            )
        })
    }   
    
    const onChangeStart =(e)=>{
        setTextStart(e.target.value)
    }
    const onChangeEnd =(e)=>{
        setTextEnd(e.target.value)
    }
    return (
        <div>
            <Content>
                <div className="site-layout-content" style={{overflowX:'hidden'}}>
                    <Carousels/>
                    <div className="pricing">
                        <div className="container__width">
                            <div className="pricing__search">
                                    <div className="search__text--pricing">
                                            <div className="seach__container">
                                                <input placeholder="Nhập nơi đến..." className="form__input" onChange={onChangeStart}/>
                                                <SearchOutlined className="class__icon"/>
                                            </div>
                                    
                                    </div>
                                    <div className="search__text--pricing">
                                        <div className="seach__container" >
                                                <input placeholder="Nhập nơi đi..." className="form__input"  onChange={onChangeEnd}/>
                                                <SearchOutlined  className="class__icon" />
                                            </div>
                                    </div>
                            </div>
                        </div>
                        <div className="pricing__table">
                                <table className="table__frist">
                                    <thead>
                                        <tr className="table__thead">
                                            <th className="table__route">
                                                Tuyến xe
                                            </th>
                                            <th className="table__kind">
                                                Loại xe
                                            </th>
                                            <th className="table__dis">
                                                Quang đường
                                            </th>
                                            <th className="table__time">
                                                Thời gian hành trình
                                            </th>
                                            <th className="table__price">
                                                Giá vé
                                            </th>
                                            <th className="table__active">
                                                Giờ chạy
                                            </th>
                                            <th>
                                              
                                            </th>
                                            
                                        </tr>
                                    </thead>
                                </table>
                                <div className="table__group">
                                <table style={{width : '100%'}}>
                                     {ResultArray.length > 0 ?
                                        ResultArray
                                        :
                                        <div style={{
                                            width : '100%',
                                            backgroundColor : '#f3ccc0',
                                            height :'60px',
                                            textAlign : 'center',
                                            lineHeight : '60px',
                                            fontSize : '20px',
                                            fontWeight : 500,
                                            color : '#fff'
                                        }}>
                                            Không có thông tin
                                        </div>
                                    }
                                </table>
                                </div>
                        </div>
                    </div>
                </div>
            </Content>
        </div>
    );
}

export default Pricing;