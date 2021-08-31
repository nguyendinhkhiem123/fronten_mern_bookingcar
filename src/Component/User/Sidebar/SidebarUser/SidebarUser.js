import React from 'react';
import '../SidebarUser/SidebarUser.css'
import { CloseOutlined , UserOutlined} from '@ant-design/icons';
import { HistoryOutlined , LogoutOutlined ,LoginOutlined , AntDesignOutlined ,MenuUnfoldOutlined ,UserAddOutlined , UnorderedListOutlined} from '@ant-design/icons';
import { Image , List } from 'antd';
import { Link, useHistory , Route} from 'react-router-dom'
import { useSelector } from 'react-redux';

function SidebarUser(props) {

    const role = localStorage.getItem('role');
    const MenuLink  = ({label , to , activeOnLyWhenExact , icon }) =>{
        return(
          <Route path ={to} exact ={activeOnLyWhenExact} children ={({match})=>{
                let active = match ?'user__active--link' : '';
                let active__text = match ? 'text--user__link':'';
                return      <List.Item className={`list--user ${active}`} onClick={(e)=>linkCloseSidebar(to)} >
                        <List.Item.Meta className={`item--user ${active__text}` }  
                        avatar={icon}
                        title={<span className={`text--user ${active__text}`}  style={{
                            fontWeight: 300,
                            fontSize : '16px',
                            
                      }}>{label}</span>}
                    />
             </List.Item>
          
            }
          }>
    
          </Route>
        )
    }

    const ListDataUser = [
        {
            title : 'Lịch sử mua vé',
            icon : <HistoryOutlined />,
            link : '/lich-su'
            
        },
        {
            title : 'Thông tin cá nhân',
            icon : <UserOutlined />,
            link : '#canhan'
            
        },
        {
            title : 'Đổi mật khẩu',
            icon : <UserOutlined />,
            link : '#doimatkhau'
            
        },
        {
            title : 'Đăng xuất',
            icon : <LogoutOutlined />,
            link : '/dang-xuat'
        },
        
    ]    
    const ListDataAdmin = [
        
        {
            title : 'Thông tin cá nhân',
            icon : <UserOutlined />,
            link : '#canhan'
            
        },
        {
            title : 'Đổi mật khẩu',
            icon : <UserOutlined />,
            link : '#doimatkhau'
            
        },
        {
            title : 'Tạo tài khoản nhân viên',
            icon : <UserOutlined />,
            link : '#taotaikhoan'
            
        },
        {
            title : 'Đăng xuất',
            icon : <LogoutOutlined />,
            link : '/dang-xuat'
        },
    ]
    const ListDataEmployee = [
     
        {
            title : 'Thông tin cá nhân',
            icon : <UserOutlined />,
            link : '#canhan'
            
        },
        {
            title : 'Đổi mật khẩu',
            icon : <UserOutlined />,
            link : '#doimatkhau'
            
        },
        {
            title : 'Đăng xuất',
            icon : <LogoutOutlined />,
            link : '/dang-xuat'
        },
    ]
    const ListDataLogin = [
        {
            title : 'Đăng nhập',
            icon : <LoginOutlined />,
            link  : '/signin'
        },
        {
            title : 'Đăng ký',
            icon :   <AntDesignOutlined />   ,
            link : '/signup'
        }
    
    ]
    const isAdmin = useSelector(state => state.isAdmin)
    const token = useSelector(state => state.token);
    const   { isSidebarUserVisible , currentUser } = props;
    const history = useHistory();
    const onCloseSideBar  = ()=>{
        props.onCloseSidebar();
    }
    const linkCloseSidebar = (link)=>{
        props.onCloseSidebar();
        history.replace(link);
    }
    const openModalForm = (slug)=>{
        props.activeFormModal(slug);
    }
    let dataSource = [];

    if(role && token){
        if(role == 2 && token){
            dataSource = ListDataAdmin
        }
        else if(role == 1) {
            dataSource = ListDataEmployee
        }
        else {
            dataSource = ListDataUser
        }
    }
    console.log(dataSource);
    const ele = token ?
    (
        <div className="body__list">
        <List className="header__list--user"
          header={currentUser.hovaten}
          style={{textAlign: 'center'}}
          itemLayout="horizontal"
          dataSource={dataSource}
          
          renderItem={item => (
              item.link.startsWith('/') ?
              <MenuLink to={item.link} activeOnLyWhenExact={true} label={item.title} icon={item.icon}></MenuLink>
            :
            <List.Item className="list--user" onClick={(e)=> openModalForm(item.link)} >
                <List.Item.Meta className="item--user "  
                avatar={item.icon}
                title={<span className="text--user"  style={{
                    fontWeight: 300,
                    fontSize : '16px',
                    
                }}>{item.title}</span>}
                />
            </List.Item>
                
          )}/>
          </div>
    ) :
    (
        <div className="body__list">
        <List className="header__list--user"
            header="TÀI KHOẢN"
            style={{textAlign: 'center'}}
            itemLayout="horizontal"
            dataSource={ListDataLogin}
            renderItem={item => (
            // <List.Item className="list--user" onClick={(e)=>linkCloseSidebar(item.link)}>
            //     <List.Item.Meta className="item--user " 
            //     title={<span className="text--user" style={{
            //         fontWeight: 300,
            //         fontSize : '16px',
                    
            //     }}>{item.title}</span>}
            //     />
            // </List.Item>
            <MenuLink to={item.link} activeOnLyWhenExact={true} label={item.title} icon={item.icon}></MenuLink>
            )}
        />
        </div>
    )
    return (
         <div className={isSidebarUserVisible ? "side__bar--user active" : "side__bar--user hidden"} >
                <div className="side__bar--header">
                        <div className="header__text">Thông tin</div>
                        <CloseOutlined  className="header__icon--user" onClick={onCloseSideBar}/>
                </div>
                <div className="side__bar--body">
                        <div className="body__avatar">
                            <Image
                                className="avatar"
                                width={200}
                                src= {currentUser.hinhanh ==='' ? 'https://tse3.mm.bing.net/th?id=OIP.h4XLnQrECuDv_RsKjiRHOQHaHa&pid=Api&P=0&w=300&h=300' : currentUser.hinhanh}
                                preview={{
                                    src: currentUser.hinhanh ==='' ? 'https://tse3.mm.bing.net/th?id=OIP.h4XLnQrECuDv_RsKjiRHOQHaHa&pid=Api&P=0&w=300&h=300' : currentUser.hinhanh
                                }}
                            />
                        </div>
                       {ele}
                        
                </div>       
               
         </div>
    );
}

export default SidebarUser;