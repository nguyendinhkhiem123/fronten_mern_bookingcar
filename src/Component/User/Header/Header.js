import React, { useEffect, useState } from 'react';
import '../Header/Header.css';
import { Layout, Menu } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined , HistoryOutlined , LogoutOutlined ,LoginOutlined , AntDesignOutlined ,MenuUnfoldOutlined ,UserAddOutlined , UnorderedListOutlined} from '@ant-design/icons';
import { List, Typography, Divider } from 'antd';
import SidebarUser from '../Sidebar/SidebarUser/SidebarUser';
import SidebarMenu from '../Sidebar/SidebarMenu/SidebarMenu';
import Modal from '../Modal/Modal';
import  logo from '../../../img/futas.jpeg';
import useLoading from '../../HookLoading/HookLoading';
import { Link , useHistory ,Route , useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import pageUser from '../../../Page/User/User';
import ModalForm from '../../FormModal/FormModal';
import * as ApiUser from '../../../Api/User/index';
import * as ActionCurrentUser from '../../../Reducer/currentUser';
const { Header   } = Layout;


function Headers(props) {

    const location = useLocation();   
    const MenuLink  = ({label , to , activeOnLyWhenExact , icon }) =>{
        return(
          <Route path ={to} exact ={activeOnLyWhenExact} children ={({match})=>{
                let active = match ?'link__active' : '';
                return   <Link to={to} className={`list__link ${active}`} >
                            {icon}
                            {label}
                    </Link>
          
            }
          }>
    
          </Route>
        )
    }

    const LinkCustom  = ({label , to , activeOnLyWhenExact , icon }) =>{
        return(
          <Route path ={to} exact ={activeOnLyWhenExact} children ={({match})=>{
                let active = match ?'user__active--link' : '';
                let active__text = match ? 'text--user__link':'';
                return      <List.Item className={`header__el ${active}`}>
                    <List.Item.Meta className={`header__item ${active__text}`}
                    avatar={icon}
                    title={<Link className={`text__title ${active__text}`} to={to}  style={{
                        fontWeight: 300,
                        fontSize : '16px'
                    }}>{label}</Link>}
                    />
                </List.Item>
          
            }
          }>
    
          </Route>
        )
    }
    const ListUser = [
        {
            title : 'L???ch s??? mua v??',
            icon : <HistoryOutlined />,
            slug : '/lich-su'
            
        },
        {
            title : 'Th??ng tin c?? nh??n',
            icon : <UserOutlined />,
            slug : '#canhan'
        },
        {
            title : '?????i m???t kh???u',
            icon : <UserOutlined />,
            slug : '#doimatkhau'
        },
        {
            title : '????ng xu???t',
            icon : <LogoutOutlined />,
            slug : '/dang-xuat'
            
        },
        
    ]
    
    const ListAdmin = [
        // {
        //     title : 'adminMenu',
        //     icon : <HistoryOutlined />,
        //     slug : '/muave'
            
        // },
        {
            title : 'Th??ng tin c?? nh??n',
            icon : <UserOutlined />,
            slug : '#canhan'
        },
        {
            title : '?????i m???t kh???u',
            icon : <UserOutlined />,
            slug : '#doimatkhau'
        },
        {
            title : 'T???o t??i kho???n',
            icon : <UserOutlined />,
            slug : '#taotaikhoan'
        },
        {
            title : '????ng xu???t',
            icon : <LogoutOutlined />,
            slug : '/dang-xuat'
            
        },
    ]
    const ListEmployee = [
        // {
        //     title : 'adminMenu',
        //     icon : <HistoryOutlined />,
        //     slug : '/muave'
            
        // },
        {
            title : 'Th??ng tin c?? nh??n',
            icon : <UserOutlined />,
            slug : '#canhan'
        },
        {
            title : '?????i m???t kh???u',
            icon : <UserOutlined />,
            slug : '#doimatkhau'
        },
       
        {
            title : '????ng xu???t',
            icon : <LogoutOutlined />,
            slug : '/dang-xuat'
            
        },
    ]
    const MenuUser = [
        {
            title : 'TRANG CH???',
            link : '/'
        },
        {
            title : 'L???CH TR??NH',
            link : '/lich-trinh'
        },
        {
            title : 'H???I ????P',
            link : '/binh-luan'
        },
        {
            title : '????NH GI??',
            link : '/danh-gia'
        },
       
    ]
    const MenuAdmin = [
        {
            title : 'TUY???N ???????NG',
            link : '/admin/tuyen-duong'
        },
        {
            title : 'CHUY???N XE',
            link : '/admin/lich-trinh'
        },
        {
            title : 'QU???N L?? XE',
            link : '/admin/xe'
        },
        {
            title : 'TH???NG K??',
            link : '/admin/thong-ke'
        }, 
        {
            title : 'NH??N VI??N',
            link : '/admin/nhan-vien'
        },
        {
            title : 'H???I ????P',
            link : '/binh-luan'
        },
        {
            title : '????NH GI??',
            link : '/danh-gia'
        },
       
    ]
    const history = useHistory();
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const isAdmin = useSelector(state => state.isAdmin)
    const currentUser =useSelector(state => state.currentUser);
    const role = localStorage.getItem('role');
    const [drop , setDrop] =  useState(false);
    const [isModalVisible , setIsModalVisible] = useState(false);
    const [sideUser, setSideUser] = useState(false);
    const [sideMenu , setSideMenu] = useState(false);
    const [modalForm , setModalForm] = useState({
        isModalVisible : false ,
        type : '#canhan'
    })
    const [Loading , None , Display ] = useLoading();
    const dropClick = ()=> setDrop(!drop);
    const sideBarUser = ()=> 
    {
        setIsModalVisible(true);
        setSideUser(!sideUser);

    }
    const onCloseSideBarUser = ()=>
    {
        setIsModalVisible(false);
        setSideUser(false);
       
    }
    const sideBarMenu= ()=>{
        setIsModalVisible(true);
        setSideMenu(!sideMenu);
        console.log('hello');
    }
    const onCloseSideBarMenu = ()=>{
        setIsModalVisible(false);
        setSideMenu(false);
    }
    const activeFormModal = (slug)=>{
        
        console.log(slug)
        if(slug === '#canhan'){
            setModalForm({
                ...modalForm,
                isModalVisible : true,
                type : "#canhan"
            })
        }
        else if(slug === '#doimatkhau'){
            setModalForm({
                ...modalForm,
                isModalVisible : true,
                type : "#doimatkhau"
            })
        }
        else{
            setModalForm({
                ...modalForm,
                isModalVisible : true,
                type : "#taotaikhoan"
            })
        }
        setIsModalVisible(false);
        setSideUser(false);
    }
    const onCancelModalForm = ()=>{
        
        setModalForm({
            ...modalForm,
            isModalVisible : false,
            type : "#doimatkhau"
        })
    }
   
    useEffect(()=>{
        if(token) getOneUser();
    },[token])

    const getOneUser = async()=>{
        try{
            const res = await ApiUser.getOneUser();
            dispatch(ActionCurrentUser.addUser(res.data.body));
        }
        catch(err){
            console.log(err);
        }
    }
    console.log(currentUser , modalForm);

    let dataSource = [];
    if(role && token){
        if(role == 2 && token){
            dataSource = ListAdmin
        }
        else if(role == 1) {
            dataSource = ListEmployee
        }
        else {
            dataSource = ListUser
        }
    }
    const dropDown = (
        <List className="header__list" 
        header={currentUser.hovaten}
        style={{textAlign: 'center'}}
        itemLayout="horizontal"
        dataSource={dataSource }
        renderItem={item => (
            item.slug.startsWith("/") ?
            <LinkCustom 
                to={item.slug} 
                activeOnLyWhenExact={true} 
                label={item.title} 
                icon={item.icon}>        
            </LinkCustom>
        :
        <List.Item className="header__el" onClick={(e)=>activeFormModal(item.slug)} >
            <List.Item.Meta className="header__item" 
            avatar={item.icon}
            title={<span className="text__title"   style={{
                fontWeight: 300,
                fontSize : '16px'
            }}>{item.title}</span>}
            />
        </List.Item>

      
        )}
    />
    )
    const ele = token ?  (

        <div className="header__icon ">
            <div className="header__avatar" onClick={dropClick}>
                <Avatar icon={
                    currentUser.hinhanh ==="" ? <UserOutlined /> :currentUser.hinhanh } className="mr-5"/>
                <div>{currentUser.hovaten}</div>
                {drop && dropDown}
            </div>
        </div>
    ):
    (
        <div className="header__account">
        <ul className="list__account">
            <li className="list__account--item mr-28 item__parent">
                {/* <Link to="/signin" className="list__link" >
                    <LoginOutlined className="mr-8" />
                    ????ng nh???p
                </Link> */}
                <MenuLink label="????ng nh???p" activeOnLyWhenExact={true} to="/signin" icon={<LoginOutlined className="mr-8" />}/> 
            </li>
            <li className="list__account--item">
                {/* <Link to="/signup" className="list__link ">
                    <AntDesignOutlined className="mr-8" />   
                    ????ng k??
                </Link> */}
                <MenuLink label="????ng k??" activeOnLyWhenExact={true} to="/signup" icon={ <AntDesignOutlined className="mr-8" />   }/> 
            </li>
        </ul>
    </div>
    )
    return (
        <Header className="header__style">
            <div className="logo" style={
                {
                    cursor: 'pointer'
                }
            }>
                    <img src={logo} 
                        style={
                            {
                                width : '50x',
                                height : '50px',
                                
                            }
                        }
                    >
                    
                    </img>
            </div>
            <Menu theme="light" mode="vertical" selectedKeys={[location.pathname]}    className="header__menu">
                    {   isAdmin ? 
                        MenuAdmin.map((value , index)=>{
                            return  <Menu.Item key={value.link}  >
                                      <Link to={value.link}>{value.title} </Link>
                                </Menu.Item>
                        })
                        : 
                        MenuUser.map((value , index)=>{
                          
                        //   return  <MenuLink
                        //     key={index}
                        //     label={value.title}
                        //     to={value.link}
                        //     activeOnLyWhenExact={true}
                        //     index={index}
                        //   ></MenuLink>    

                            return <Menu.Item key={value.link} >
                                    <Link to={value.link}>{value.title} </Link>
                              </Menu.Item>
                               
                                
                               
                        })

                    }
                  
            </Menu>
            {ele}
           <div className="header__responsive">
                  <div  className="responsive__avatar">
                      <Avatar onClick={sideBarUser} shape="circle" size={28} icon={<UserAddOutlined/> } className="mr-12" style={{cursor:'pointer'}}  />
                  </div>
                  <div className="responesive__unor">
                     <UnorderedListOutlined  onClick={sideBarMenu}  style={{ fontSize : '16px' , cursor : 'pointer'}}/>
                  </div>
                
                  <SidebarUser isSidebarUserVisible={sideUser} onCloseSidebar={onCloseSideBarUser} currentUser={currentUser} activeFormModal={activeFormModal}/> 
                  <SidebarMenu isSidebarMenuVisible={sideMenu} onCloseSideBarMenu={onCloseSideBarMenu}/>
                  <Modal isModalVisible={ isModalVisible }></Modal>
                  {modalForm.isModalVisible ?  <ModalForm isModalVisible={modalForm.isModalVisible} type={modalForm.type} onClose={onCancelModalForm} currentUser={currentUser} /> : null}
           </div>
           {Loading}
        </Header>
    );
}

export default Headers;