import React from 'react';
import '../SidebarMenu/SidebarMenu.css'
import { CloseOutlined , HomeOutlined ,CalendarOutlined  ,MinusSquareOutlined , PieChartOutlined  , PhoneOutlined , AuditOutlined  , ContactsOutlined } from '@ant-design/icons';
import { List } from 'antd';
import logo from '../../../../img/logo.png'
import { useSelector } from 'react-redux';
import { useHistory , Route} from 'react-router-dom';


function SidebarMenu(props) {
    const MenuLink  = ({label , to , activeOnLyWhenExact , icon }) =>{
        return(
          <Route path ={to} exact ={activeOnLyWhenExact} children ={({match})=>{
                let active = match ?'user__active--link' : '';
                let active__text = match ? 'text--user__link':'';
                return      <List.Item className={`list--user ${active}`} onClick={(e)=>onCloseSideMenu(to)} >
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
    const ListDataUser= [
        {
            title : 'Trang chủ',
            icon : <HomeOutlined />,
            link : '/'
        },
        {
            title : 'Lịch trình',
            icon : <CalendarOutlined />,
            link : '/lich-trinh'

        },
        { 
            title : 'Tin tức',
            icon : <MinusSquareOutlined />,
            link : '/tin-tuc'

        }
        , { 
            title : 'Tuyển dụng',
            icon : <PieChartOutlined />,
            link : '/tuyen-dung'

        }
        , { 
            title : 'Liện hệ',
            icon :<PhoneOutlined />,
            link : '/lien-he'

        }
        , { 
            title : 'Hóa đơn',
            icon : <AuditOutlined />,
            link : '/hoa-don'
        }
        , { 
            title : 'Về chúng tôi',
            icon : <ContactsOutlined />,
            link : '/ve-chung-toi'

        }
    
    
    ]
    const ListDataAdmin= [
        {
            title : 'Trang chủ Admin',
            icon : <HomeOutlined />,
            link:'/admin/trang-chu'
        },
        {
            title : 'Lịch trình',
            icon : <CalendarOutlined />,
            link:'/admin/lich-trinh'
        },
        { 
            title : 'Tin tức',
            icon : <MinusSquareOutlined />,
            link:'/admin/tin-tuc'
        }
        , { 
            title : 'Tuyển dụng',
            icon : <PieChartOutlined />,
            link:'/admin/tuyen-dung'
        }
        , { 
            title : 'Liện hệ',
            icon :<PhoneOutlined />,
            link:'/admin/lien-he'
        }
        , { 
            title : 'Hóa đơn',
            icon : <AuditOutlined />,
            link:'/admin/hoa-don'
        }
        , { 
            title : 'Về chúng tôi',
            icon : <ContactsOutlined />,
            link:'/admin/ve-chung-toi'
        }
    
    
    ]
    const isAdmin = useSelector(state => state.isAdmin)
    const history = useHistory();
    const { isSidebarMenuVisible } = props
    const onCloseSideBarMenu = ()=>{
        props.onCloseSideBarMenu();
    }
    const onCloseSideMenu = (link)=>{
        props.onCloseSideBarMenu();
        history.push(link);
    }
    return (
        <div className={ isSidebarMenuVisible ? "side__bar--menu active--menu" : 'side__bar--menu hidden--menu'}>
                <div className="bar__menu--header">
                    <img className="bar__menu--logo" alt="logo" src={logo} ></img>
                    <CloseOutlined  className="header__icon--menu" onClick={onCloseSideBarMenu}   />

                </div>
                <div className="bar__menu--body">
                    <List className="header__list--menu"
                                header="DANH MỤC"
                                style={{textAlign: 'center'}}
                                itemLayout="horizontal"
                                dataSource={isAdmin ? ListDataAdmin : ListDataUser}
                                renderItem={item => (
                                <MenuLink to={item.link} activeOnLyWhenExact={true} label={item.title} icon={item.icon}></MenuLink>
                                // <List.Item className="list--menu" onClick={(e)=>onCloseSideMenu(item.link)}>
                                //     <List.Item.Meta className="item--menu"
                                //     avatar={item.icon}
                                //     title={<span className="text--menu" style={{
                                //         fontWeight: 300,
                                //         fontSize : '16px',
                                        
                                //     }}>{item.title}</span>}
                                //     />
                                // </List.Item>
                                )}
                                
                            />
                </div>
        </div>
    );
}

export default SidebarMenu;