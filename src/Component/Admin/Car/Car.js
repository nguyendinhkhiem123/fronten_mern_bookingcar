import React, { useEffect , useState } from 'react';
import {Layout , Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Carousels from '../../Carousel/Carousel';
import '../Car/Car.css';
import { useDispatch, useSelector } from 'react-redux';
import { openNotificationErorr , openNotificationSuccess} from '../../Notfication/index';
import * as ApiCar from '../../../Api/Car/index';
import useLoading from '../../HookLoading/HookLoading';
import * as ActionCar from '../../../Reducer/car';
import Modal from './Modal/Modal';
const { Content } = Layout;
function Car(props) {
    const [Loading , Hidden , Display] = useLoading();
    const route = useSelector(state => state.route);
    const car = useSelector(state => state.car);
    const [ search , setSearch ] = useState('');
    const [ isDisplayModal , setDisplayModal ] = useState(false);
    const [ isActive , setIsActive ] =  useState(false);  //  true là sửa , false là thêm
    const [ values , setValues ] = useState();
    const dispatch = useDispatch();
    useEffect(()=>{
        getAllCar()
    },[])
    let listRoute = [];
    if(route.length >0){
        for(let i = 0 ; i < route.length  ; i=i+2){
            listRoute.push({
                    id : route[i]?._id,
                    matuyen : route[i]?.matuyen
                })
            // console.log(i , route.length);
        }
    }


    const getAllCar= async()=>{
        try{
            Display();
            const res = await ApiCar.getAllCar();
            Hidden();
            console.log(res);     
            if(res.data.success){
                dispatch(ActionCar.addCar(res.data.body.car));
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
                const res =await ApiCar.changeStatus({
                    id : id ,
                    trangthai : status
                });
                console.log(res);
                Hidden();
                if(res.data.success){
                    dispatch(ActionCar.changeStatus({
                        id ,
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
    const clickUpdateCar = (value)=>{
        setValues(value);
        onOpenModal();
        onActiveUpdate();
    }
    const updateCar = async(value)=>{
        try{
            Display();
            const res = await ApiCar.updateCar(value);
            Hidden() 
            console.log(res);
            if(res.data.success){
                const id = value.id ;
                value._id = id;
                console.log(value)
                openNotificationSuccess('Thành công' , res.data.message ,3);
                dispatch(ActionCar.updateCar(value))
                onCloseModal();
            }
            else{
                openNotificationErorr('Thất bại' , res.data.message ,3)
            }
        }
        catch(err){
            console.log(err);
        }
    }
    const insertCar = async(values)=>{
        try{
            Display();
            const res = await ApiCar.insertCar(values);
            Hidden() 
            if(res.data.success){
                openNotificationSuccess('Thành công' , res.data.message ,3);
                dispatch(ActionCar.addNewCar({
                    values : res.data.body.carOne 
                }))
                onCloseModal();
            }
            else{
                openNotificationErorr('Thất bại' , res.data.message ,3)
            }
        }
        catch(err){
            console.log(err);
        }
    }
    const clickDeleteCar = async(values)=>{
        if(window.confirm('Bạn có chắc chắn xóa ?')){
            try{
                Display();
                const res = await ApiCar.deleteCar({
                    id : values._id
                });
                Hidden() 
                if(res.data.success){
                    openNotificationSuccess('Thành công' , res.data.message ,3);
                    dispatch(ActionCar.removeCar(values._id))
                }
                else{
                    openNotificationErorr('Thất bại' , res.data.message ,3)
                }
            }
            catch(err){
                console.log(err);
            }
        }  
    }
    let result = [];

    if(car.length > 0){
        result = (car.filter(value=>{
            return value.biensoxe.trim().toLowerCase().indexOf(search.toLowerCase()) !== -1
        })
                )  
                        .map((value,index)=>{
                    return (
                        <tbody key={index}>
                            <tr className={index%2===0 ?"tr__head active" : "tr__head"}>
                                <td className="t__ma">
                                    {
                                        value._id
                                    }
                                </td>
                                <td className="t__img1">
                                    <img style={{width : '100px' , height : '40px'}}
                                    src={ value.hinhanh=== "" ? "http://static.vexere.com/c/i/11071/xe-phuong-trang-VeXeRe-R4uvqCH-1000x600.jpg" : value.hinhanh}>
                                    </img>
                                </td>
                                <td className="t__route1">
                                    {value.biensoxe}
                                </td>
                                <td className="t__start1">
                                    {value.soluongghe} ghế
                                </td>
                                <td>
                                    <span className="box" onClick={e=> changeStatus(value._id , !value.trangthai)}>
                                        {
                                            value.trangthai === true ? ' Hoạt động' : 'Tạm dừng'
                                        }
                                    </span>
                                </td>
                                <td >
                                        <span className="box" onClick={e=>clickUpdateCar(value)}>
                                            Chỉnh sửa
                                        </span>
                                </td> 
                                <td >
                                        <span className="box" onClick={e=>clickDeleteCar(value)}>
                                            Xóa
                                        </span>
                                </td> 
                            </tr>
                        </tbody>
                    )
                  })
    }
    return (
        <div >
        <Content>
            <div className="site-layout-content" style={{overflowX:'hidden'}}>
                <Carousels/>
                <div className="route__container">
                     <div className="route__header">
                        <div className="route__add">
                            <Button type="primary" size="large" onClick={onClickInsert}>
                                    THÊM XE
                            </Button>
                        </div>
                        <div className="route__search">
                                <input placeholder="Nhập biển số xe" className="form__input"  onChange={onChangeSearch}
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
                                            <th className="t__ma">
                                                Mã xe
                                            </th>
                                            <th className="t__img1">
                                                Hình ảnh
                                            </th>
                                            <th className="t__route1">
                                                Biển số xe
                                            </th>
                                            <th className="t__start1">
                                                Số lượng ghế
                                            </th>
                                            
                                            <th>
                                               
                                            </th>
                                            <th>

                                            </th>
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
                    onClickInsert = {insertCar}
                    value = {values}
                    onClickUpdate = {updateCar}
                    route = {listRoute}
            /> : null}
            {Loading}
        </Content>
    </div>
    );
}

export default Car;