import React, { useEffect, useState } from 'react';

import { Layout, Breadcrumb ,Radio , Row , Col , Input , DatePicker , Button , Space } from 'antd';
import moment from 'moment';
import {CodeSandboxCircleFilled, FileSearchOutlined, UnorderedListOutlined} from '@ant-design/icons';
import '../Home/Home.css'
import logoswitch from '../../../img/switch.png';
import Popular from '../Popular/Popular';
import Slider from '../Slider/Slider';
import { getAllRoute } from '../../../Api/Route/index';
import { openNotificationErorr } from '../../Notfication/index';
import ListBody from 'antd/lib/transfer/ListBody';
import { useHistory } from 'react-router-dom';
const {  Content } = Layout;



function Home(props) {
    const [ valueRadio , setValueRadio ]  = useState(1);
    const [ valueStart , setValueStart ] = useState(false);
    const [ valueEnd , setValueEnd] = useState(false);
    const [ textStart , setTextStart ] = useState('');
    const [ textEnd , setTextEnd] = useState('');
    const [ route , setRoute] = useState([]);
   
    const currentDate = new Date();
    let day = currentDate.getDate();
    let month =  currentDate.getMonth() + 1;
    let Year = currentDate.getFullYear();
    let cDay  = day < 10 ? '0'+day.toString() : day.toString(); 
    let cMonthLeter1  = month + 1 < 10 ? '0'+(month + 1).toString() : (month+1).toString(); 
    let cMonth = month < 10 ? '0'+ month.toString() : month.toString();
    let cYear = Year;
    let fullDateLater1 = cYear.toString() +'-'+cMonthLeter1 + '-'+cDay;
    let fullDate = cYear.toString() +'-'+cMonth + '-'+cDay;

    const [ fullDateStart , setFullDateStart] = useState(fullDate);
    const [ fullDateEnd , setFullDateEnd] = useState(fullDateLater1); 
    const history = useHistory();
    let listUnique = [];
    let blockDate = ['2021-07-01', '2021-08-01'];

    function disabledDate(current) {
      // console.log(current)
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    }
    const onChangeRadio = (e)=>{
        setValueRadio(e.target.value);
    }
    const onFocusStart = ()=>{
        // setValueStart(true);
        // setValueEnd(false);
       
    }
    const onFocusEnd = ()=>{
      // setValueStart(false);
      // setValueEnd(true);
    }
    const clickTextStart = ()=>{
       setValueStart(!valueStart);
       setValueEnd(false);
    }
    const clickTextEnd = ()=>{
      setValueEnd(!valueEnd);
      setValueStart(false);
    }
    const onClickTextStart= (e)=>{
      setValueStart(false);
      setTextStart(e.target.innerHTML)
    }
    const onClickTextEnd = (e)=>{
      setValueEnd(false);
      setTextEnd(e.target.innerHTML)
    }
    const swapText = ()=>{
      const temp = textStart;
      setTextStart(textEnd);
      setTextEnd(temp);
    }
    const onChange = (e)=>{
      console.log(e.target.value);
    }
    const onChangeStart = (e) =>{
      setFullDateStart(e.target.value)
    }
    const onChangeEnd = (e) =>{
      setFullDateEnd(e.target.value)
    }

    const textStartChange = (e)=>{
      setTextStart(e.target.value)
    }
    const textEndChange = (e)=>{
      setTextEnd(e.target.value)
    }
    const unique = (arr)=> {
      let newArr = []
      for (let i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) === -1) {
          newArr.push(arr[i])
        }
      }
      return newArr
    }
    const fetchAllRoute = async()=>{
          try{
              const res = await getAllRoute();
              setRoute(res.data.body);
              console.log(res);
          }catch(err){
              console.log(err);
          }
    }
    const onSubmit = ()=>{
        if(textStart === '' || textEnd === '' ||  !fullDateStart || !fullDateEnd ){
            openNotificationErorr('Thất bại' , 'Vui lòng nhập đầy đủ thông tin');
        } 
        else{
          history.push({
            pathname: '/chon-ghe',
            search: '?step=2',
            state: { 
              noidi :  textStart,
              noiden : textEnd,
              thogianbatdau : fullDateStart,
              thoigianve : fullDateEnd,
              loai :  valueRadio
            }
          })
          console.log(textStart , textEnd , fullDateStart , fullDateEnd);
        }
    }
    useEffect(()=>{
        fetchAllRoute()
    },[])

    const listRouteFilterEnd = route.filter((value ,index)=>{
      return value.noiden.toLowerCase().indexOf(textEnd.toLowerCase()) !== -1;  
    });
    listRouteFilterEnd.forEach(element => {
      listUnique.push(element.noidi);
    })
    if(listUnique.length > 0){
        listUnique=unique(listUnique);
    }
    
    const listUniqueFilter =  listUnique.filter((value ,index)=>{
      return (value.toLowerCase().indexOf(textStart.toLowerCase()) !== -1 );  
    });
    const listRouteFilterStart = route.filter((value ,index)=>{
      return value.noidi.toLowerCase().indexOf(textStart.toLowerCase()) !== -1;  
    });
    
    return (
        <div>
          <div className="home__banner">
              <img src="https://cdn.vato.vn/google-storage/facecar-29ae7.appspot.com/office/requirement/82afe560-7a75-11eb-95a2-ab62bc6a0b71-1614593068726.png"
                style={
                  {
                    width : '100%'
                  }
                }
              />
          </div>
          <Content >
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
            <div className="site-layout-content" style={{overflowX:'hidden'}}>
              <div className="home__search">
                    <Row gutter={[8 , 8]}>
                      <Col span={24}>
                        <div className="home__selection">
                          <Radio.Group onChange={onChangeRadio} value={valueRadio}>
                            <Radio value={1}>Một chiều</Radio>
                            <Radio value={2}>Khứ Hồi</Radio>
                          </Radio.Group>
                        </div>
                      </Col>
                      
                      {/* <div className="home__search--body"> */}
                           <Col xl={12}  span={24}>
                              <div className="home__searh--text">
                                      <Row gutter={[0,8]} >
                                          <Col md={12} span={24}>
                                            <div className="home__search--header mr-20">
                                                <span className="search__text">Điểm đi</span>
                                                <input className="input-form text-start" onFocus={onFocusStart} onClick={clickTextStart} placeholder="Chọn điểm đi...  " onChange={textStartChange} value={textStart}/>
                                              
                                                <div className="header__image" onClick={swapText}>
                                                    <img src={logoswitch} style={{
                                                    
                                                    }}
                                                    className="logo__switch"
                                                    />
                                                </div>
                                                <div className={valueStart ? "search__all z-big-101  active-list-search" : "search__all z-big-101  "}>
                                                      <ul className="search__list ">
                                                          {/* <li className="search__item active" onClick={onClickTextStart} >Đồng Tháp </li>
                                                          <li className="search__item" onClick={onClickTextStart}>Sài gòn</li>
                                                          <li className="search__item">Sài gòn</li>
                                                          <li className="search__item">Sài gòn</li>
                                                          <li className="search__item">Sài gòn</li> */}
                                                          {
                                                            listUniqueFilter.map((value ,index)=>{
                                                              return (
                                                                <li key={index}  className= { value === textStart ? "search__item  active ": "search__item"}  onClick={onClickTextStart} >{value}</li>
                                                              )
                                                            })
                                                          }
                                                      </ul>
                                                </div>
                                            </div>  
                                          </Col>
                                          <Col md={12} span={24}>
                                            <div className="home__search--header">
                                                <span className="search__text">Điểm đến</span> 
                                                <input className="input-form text-end" onFocus={onFocusEnd}  onChange={textEndChange} onClick={clickTextEnd} placeholder="Chọn điểm đến..." value={textEnd} disabled={textStart ? false : true} />
                                                <div className={valueEnd ? "search__all  active-list-search" : "search__all " }>
                                                      <ul className="search__list">
                                                          {/* <li className="search__item active" onClick={onClickTextEnd}>Đồng Tháp </li>
                                                          <li className="search__item"  onClick={onClickTextEnd}>Sài gòn</li>
                                                          <li className="search__item">Sài gòn</li>
                                                          <li className="search__item">Sài gòn</li>
                                                          <li className="search__item">Sài gòn</li> */}
                                                            {
                                                            listRouteFilterStart.map((value ,index)=>{
                                                              return (
                                                                <li  key={index} className= { value.noiden === textEnd ? "search__item  active" : "search__item"}  onClick={onClickTextEnd} >{value.noiden}</li>
                                                              )
                                                            })
                                                          }
                                                      </ul>
                                                </div>
                                              </div>  
                                          </Col>
                                      </Row>           
                                </div>
                              </Col>
                              <Col xl={12} className="home__date-header"  span={24}>
                                    <div className="home__search--date">
                                      <Row gutter={[0 , 8]}>
                                          <Col md={12} span={24}>
                                               <div className="warp__date home__search--header mr-20">
                                                   <span className="search__text">Thời gian đi</span>
                                                  <input type='date' placeholder="yyyy-mm-dd" className="date__input input-form "  onChange={onChangeStart} min={fullDate} value={fullDateStart} max={fullDateEnd} style={{width:'100%'}}/>
                                               </div>
                                              
                                          </Col >
                                          <Col md={12} span={24}>
                                              <div className="warp__date home__search--header">
                                              <span className="search__text">Thời gian về</span>
                                                  <input type='date' placeholder="yyyy-mm-dd" className="date__input input-form " onChange={onChangeEnd} max={fullDateLater1} value={fullDateEnd} min={fullDateStart} style={{width:'100%'}} disabled={valueRadio === 1 ? true : false}/>
                                              </div>
                                               
                                          </Col>
                                      </Row>
                                    </div>
                              </Col>
                          
                      {/* </div> */}
                      </Row>
                      <Button type="primary" shape="round" icon={<FileSearchOutlined />} size='large'  className="btn__search" onClick={onSubmit}>Tìm chuyến xe</Button>
                </div>
               <Popular listRoute={route}/>
            </div>
          </Content>
          <Slider/>
      </div>
    );
}

export default Home;