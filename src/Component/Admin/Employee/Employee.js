import React, { useEffect , useState } from 'react';
import {Layout , Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Carousels from '../../Carousel/Carousel';
import './Employee.css';
import { useDispatch, useSelector } from 'react-redux';
import { openNotificationErorr , openNotificationSuccess} from '../../Notfication/index';
import * as ApiUser from '../../../Api/User/index';
import useLoading from '../../HookLoading/HookLoading';

import Modal from './Modal/Modal';
const { Content } = Layout;
function Home(props) {
    const user = useSelector(state => state.currentUser);
    const [Loading , Hidden , Display] = useLoading();
    const route = useSelector(state => state.route);
    const [ search , setSearch ] = useState('');
    const [ isDisplayModal , setDisplayModal ] = useState(false);
    const [ isActive , setIsActive ] =  useState(false);  //  true là sửa , false là thêm
    const [ values , setValues ] = useState();
    const [ employee , setEmployee ] = useState([]);
    const currentUser = useSelector(state => state.currentUser)
    const role =  localStorage.getItem('role');
    useEffect(()=>{
        if(user)
        getAllRoute()
    },[])
   
    const getAllRoute = async()=>{
        try{
            Display();
            const res = await ApiUser.getEmployee();
            Hidden();
            console.log(res);     
            if(res.data.success){
                setEmployee(res.data.body);
                // dispatch(ActionRoute.addRoute(res.data.body));
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
        if(window.confirm("Bạn chắc chắn muốn thay đổi")){
            try{
                Display();
                const res =await ApiUser.updateStatusEmployee({
                    id : id ,
                    trangthai : status
                });
                console.log(res);
                Hidden();
                if(res.data.success){
                    // dispatch(ActionRoute.changeStatus({
                    //     chuyendi  : res.data.body.routeOne._id ,
                    //     chuyenve : res.data.body.routeTwo._id ,
                    //     trangthai : status
                    // }))
                    let listTemp = [...employee];
                    let index = -1;
                    listTemp.forEach((value,index2)=>{
                        if(value._id === id) index=index2
                    });
                    console.log(listTemp , index);
                    listTemp[index].trangthai = status
                    setEmployee(listTemp);
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
    const updateRoute = async(values)=>{
        try{
            Display();
            const res = await ApiUser.updateEmployee(values);
            Hidden() 
            console.log(res);
            if(res.data.success){
                openNotificationSuccess('Thành công' , res.data.message ,3);
                    let listTemp = [...employee];
                    let index = -1;
                    console.log(values._id);
                    listTemp.forEach((value,index2)=>{
                        if(value._id === values.id) index=index2
                    });    
                    listTemp[index] = res.data.body
                    setEmployee(listTemp);
               
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
            values.account = null;
            const res = await ApiUser.insertEmployee(values);
            Hidden() 
            if(res.data.success){
                openNotificationSuccess('Thành công' , res.data.message ,3);
                const listTemp = [...employee];
                listTemp.push(res.data.body);
                setEmployee(listTemp);
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

    console.log(currentUser ,role);
    if(employee.length > 0){
        result = (employee.filter(value=>{
            return value.hovaten.trim().toLowerCase().indexOf(search.toLowerCase()) !== -1
        })
                )  
                        .map((value,index)=>{
                    return (
                        <tbody key={index}>
                            <tr className={index%2===0 ?"tr__head active" : "tr__head"}>
                                <td className="t__img">
                                    {value.hovaten}
                                </td>
                                <td className="t__route">
                                    {value.diachi}
                                </td>
                                <td className="t__start">
                                    {value.email}
                                </td>
                                <td className="t__end">
                                    {value.sdt}
                                </td>
                                <td className="t__time">
                                    {value.ngaysinh.slice(0,10)}
                                </td>
                                <td className="t__status">
                                    { role == 2 && value.hovaten === currentUser.hovaten && value.diachi === currentUser.diachi ? "Quản lý" :  "Nhân viên"}
                                </td>
                                <td>
                                    {
                                         role == 2 && value.hovaten === currentUser.hovaten && value.diachi === currentUser.diachi ? "" : <span className="box" onClick={e=> changeStatus(value?._id , !value?.trangthai)}>
                                         {
                                             value.trangthai === true ? 'Đang làm' : 'Đã nghĩ'
                                         }
                                     </span> 
                                    }
                                   
                                </td>
                                <td >
                                   {
                                       role == 2 && value.hovaten === currentUser.hovaten && value.diachi === currentUser.diachi ? "" :
                                        <span className="box" onClick={e=>clickUpdateRoute(value)}>
                                                Chỉnh sửa
                                        </span>
                                    
                                   } 
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
                                    THÊM NHÂN VIÊN
                            </Button>
                        </div>
                        <div className="route__search">
                                <input placeholder="Nhập họ tên nhân viên " className="form__input"  onChange={onChangeSearch}
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
                                               HỌ VÀ TÊN
                                            </th>
                                            <th className="t__route">
                                                ĐỊA CHỈ
                                            </th>
                                            <th className="t__start">
                                                EMAIL
                                            </th>
                                            <th className="t__end">
                                                SĐT
                                            </th>
                                            <th className="t__time">
                                                NGÀY SINH
                                            </th>
                                        
                                            <th  className="t__status">
                                                VAI TRÒ
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