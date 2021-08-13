import React, { useEffect , useState } from 'react';
import {Layout , Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Carousels from '../../Carousel/Carousel';
import '../Route/Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { openNotificationErorr , openNotificationSuccess} from '../../Notfication/index';
import * as ApiRoute from '../../../Api/Route/index';
import useLoading from '../../HookLoading/HookLoading';
import * as ActionRoute from '../../../Reducer/route';
import Modal from './Modal/Modal';
const { Content } = Layout;
function Home(props) {
    const [Loading , Hidden , Display] = useLoading();
    const route = useSelector(state => state.route);
    const [ search , setSearch ] = useState('');
    const [ isDisplayModal , setDisplayModal ] = useState(false);
    const [ isActive , setIsActive ] =  useState(false);  //  true là sửa , false là thêm
    const [ values , setValues ] = useState();
    const dispatch = useDispatch();
    useEffect(()=>{
        getAllRoute()
    },[])
   
    const getAllRoute = async()=>{
        try{
            Display();
            const res = await ApiRoute.getAllRoute();
            Hidden();
            console.log(res);     
            if(res.data.success){
                dispatch(ActionRoute.addRoute(res.data.body));
            }
           

        }
        catch(err){
            console.log(err);
        }
    }
    const onOpenModal = ()=>{
        setDisplayModal(true);
    }
    const onCloseModal = ()=>{
        setDisplayModal(false);
    }
    const onActiveInsert = ()=>{
        setIsActive(true);
    }
    const onActiveUpdate = ()=>{
        setIsActive(false);
    }
    const onChangeSearch = (e)=>{
        setSearch(e.target.value)
    }
    const changeStatus = async(id , status)=>{
        console.log(status);
        if(window.confirm("Bạn chắc chắn muốn thay đổi")){
            try{
                Display();
                const res =await ApiRoute.changeStatus({
                    id : id ,
                    trangthai : status
                });
                console.log(res);
                Hidden();
                if(res.data.success){
                    dispatch(ActionRoute.changeStatus({
                        chuyendi  : res.data.body.routeOne._id ,
                        chuyenve : res.data.body.routeTwo._id ,
                        trangthai : status
                    }))
                    openNotificationSuccess('Thành công',res.data.message , 3);
                }
            
            }
            catch(err){
                console.log(err);
            }
        }
        console.log(id , status)
    }
    const onClickInsert =()=>{
        onOpenModal();
        onActiveInsert();
    }
    const clickUpdateRoute = (value)=>{
        setValues(value);
        onOpenModal();
        onActiveUpdate();
    }
    const updateRoute = async(value)=>{
        try{
            Display();
            const res = await ApiRoute.updateRoute(value);
            Hidden() 
            console.log(res);
            if(res.data.success){
                openNotificationSuccess('Thành công' , res.data.message ,3);
                console.log(res.data.body);
                dispatch(ActionRoute.updateRoute({
                    chuyendi : res.data.body.updateOne._id,
                    chuyenve : res.data.body.updateTwo._id,
                    value
                })) 
            }
            else{
                openNotificationErorr('Thất bại' , res.data.message ,3)
            }
        }
        catch(err){
            console.log(err);
        }
    }
    const insertRoute = async(values)=>{
        try{
            Display();
            const res = await ApiRoute.insertRoute(values);
            Hidden() 
            if(res.data.success){
                openNotificationSuccess('Thành công' , res.data.message ,3);
                dispatch(ActionRoute.addNewRoute({
                    newRoute : res.data.body.newRoute,
                    newRouteRes :res.data.body.newRouteReverse
                }))
            }
            else{
                openNotificationErorr('Thất bại' , res.data.message ,3)
            }
        }
        catch(err){
            console.log(err);
        }
    }
    let result = [];

    if(route.length > 0){
        result = (route.filter(value=>{
            return value?.matuyen.toLowerCase().indexOf(search.toLowerCase()) !== -1
        })
                )  
                        .map((value,index)=>{
                    return (
                        <tbody key={index}>
                            <tr className={index%2===0 ?"tr__head active" : "tr__head"}>
                                <td className="t__img">
                                    <img style={{width : '100px'}}
                                    src={ value?.hinhanh=== "" ? "http://2.bp.blogspot.com/-tuImX7p2HCg/TvXmJ9l35JI/AAAAAAAAA2I/blauacok_to/s1600/%2528Vietnam%2529+%25E2%2580%2593+Hanoi+1.jpg" : value.hinhanh}>
                                    </img>
                                </td>
                                <td className="t__route">
                                    {value?.matuyen}
                                </td>
                                <td className="t__start">
                                    {value?.noidi}
                                </td>
                                <td className="t__end">
                                    {value?.noiden}
                                </td>
                                <td className="t__time">
                                    {value?.thoigian}h
                                </td>
                                <td className="t__time">
                                    {value?.quangduong}km
                                </td>
                                <td className="t__status">
                                    <span className="box" onClick={e=> changeStatus(value?._id , !value?.trangthai)}>
                                        {
                                            value.trangthai === true ? ' Hoạt động' : 'Tạm dừng'
                                        }
                                    </span>
                                </td>
                                <td >
                                        <span className="box" onClick={e=>clickUpdateRoute(value)}>
                                            Chỉnh sửa
                                        </span>
                                </td>
                            </tr>
                        </tbody>
                    )
                  })
    }
    return (
        <div>
        <Content>
            <div className="site-layout-content" style={{overflowX:'hidden'}}>
                <Carousels/>
                <div className="route__container">
                     <div className="route__header">
                        <div className="route__add">
                            <Button type="primary" size="large" onClick={onClickInsert}>
                                    THÊM TUYẾN XE
                            </Button>
                        </div>
                        <div className="route__search">
                                <input placeholder="Nhập mã tuyến" className="form__input"  onChange={onChangeSearch}
                                //  onChange={onChangeEnd}
                                 />
                                 <SearchOutlined  className="class__icon" />
                        </div>
                     </div>
                     <div className="route__body">
                            <div className="table__header">
                                <table style={{width : '100%'}}>
                                    <thead>
                                        <tr className="tr__head">
                                            <th className="t__img">
                                                Hình ảnh
                                            </th>
                                            <th className="t__route">
                                                Mã tuyến
                                            </th>
                                            <th className="t__start">
                                                Nơi đi
                                            </th>
                                            <th className="t__end">
                                                Nơi đến
                                            </th>
                                            <th className="t__time">
                                                Thời gian
                                            </th>
                                            <th className="t__time">
                                                Quãng đường
                                            </th>
                                            <th ></th>
                                            <th>

                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div className="table__body">
                            <table style={{width : '100%'}}>
                                    {result.length > 0 ? 
                                    result :
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
                                        Không có tuyến xe nào
                                    </div>    
                                }
                                </table>
                            </div>
                     </div>
                </div>
            </div>
            {isDisplayModal ? <Modal
                    onCloseModal={onCloseModal}
                    isActive = {isActive}
                    onClickInsert = {insertRoute}
                    value = {values}
                    onClickUpdate = {updateRoute}
                   
            /> : null}
            {Loading}
        </Content>
    </div>
    );
}

export default Home;