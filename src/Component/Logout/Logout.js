import React, { useEffect } from 'react';
import * as ActionToken from '../../Reducer/Token'; 
import * as ActionIsAdmin from '../../Reducer/isAdminReducer';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useLoading from '../HookLoading/HookLoading';
import { openNotificationSuccess } from '../Notfication/index';
import { removeUser } from '../../Reducer/currentUser';
import { defaultTicket } from '../../Reducer/ticketUser';
function Logout(props) {
    const [Loading , Hidden, Display] = useLoading();
    const dispatch  = useDispatch();
    const history = useHistory();
    useEffect(()=>{
        Display()
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch(ActionToken.removeToken());
            dispatch(ActionIsAdmin.isUser());
            dispatch(removeUser());
            dispatch(defaultTicket());
            openNotificationSuccess('Thành công' , 'Đăng xuất thành công ', 3);
            Hidden();
            history.push("/"); 
           
            
       
    }, [])
    return (
        <div>
            {Loading}
        </div>
    );
}

export default Logout;