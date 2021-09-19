import React, { useEffect, useState } from 'react';
import { Layout , Button } from 'antd';
import { StarOutlined } from '@ant-design/icons'
import '../Vote/Vote.css';
import Carousels from '../Carousel/Carousel';
import Modal from './Modal/Modal'
import useLoading from '../HookLoading/HookLoading';
import { openNotificationSuccess , openNotificationErorr } from '../Notfication';
import * as ApiVote from '../../Api/Vote/Vote';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const { Content } = Layout
function Vote(props) {
    const [ isModal , setIsModal ] = useState(false);
    const [ listVote , setListVote ] = useState([]);
    const [ Loading , Hidden , Display ] = useLoading();
    const [ statics , setStatics ] =  useState({
        list : [],
        sum : 0
        
    });
    const [ filter , setFilter ] = useState(0);
    const token = useSelector(state=>state.token);
    const isAdmin = useSelector(state=>state.isAdmin)
    const user = useSelector(state=>state.currentUser);
    const history = useHistory();
    const openModal = ()=>{
        setIsModal(true)
    }
    const closeModal = ()=>{
        setIsModal(false)
    }
    const insertClick = ()=>{
        openModal();
    }
    const insertVote = async(value)=>{
        try{
            Display();
            value.customer = user._id
            const res = await ApiVote.insertVote(value);
            Hidden();
            if(res.data.success){
                let listTemp = [...listVote];
                let listFilter = listTemp.filter(value=>{
                    return value.customer._id !== user._id
                })
                
                listFilter.push(res.data.body);
                setListVote(listFilter);
                openNotificationSuccess('Thành công ', res.data.message ,3);
                closeModal();
            }
            else{
                openNotificationErorr('Thất bại' , res.data.message , 3);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    console.log(listVote);
    useEffect(()=>{
        if(!token){
            openNotificationErorr('Thất bại', 'Vui lòng đăng nhập' , 3);
            history.push('/signin');
        }
        else{
            const getVote = async()=>{
                try{
                    Display();
                    const res = await ApiVote.getVote();
                    Hidden();
                    if(res.data.success){
                        setListVote(res.data.body)
                    }
                }
                catch(err){
                    console.log(err);
                }
            }
            
            getVote();
        }
      
    },[])

    useEffect(()=>{
        const getListStatic = async()=>{
            try{
                Display();
                const res = await ApiVote.getStatc();
                Hidden();
                if(res.data.success){
                    setStatics(res.data.body)
                }
            }
            catch(err){
                console.log(err);
            }
        }
        getListStatic();
    }, [listVote])
    const onclickFilter =(value)=>{
        setFilter(value);
    }
    let listResult = [];
    if(listVote.length > 0){
        listVote.sort((a, b)=>{
            return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
        });
       
        if(filter > 0){
            const listFilter = listVote.filter(value=>{
                return value.sosao === filter
            });
            listResult = [...listFilter];
        }
        else{
            listResult = [...listVote];
        }
    }
    const renderStar = (index)=>{
        let list =[];
        if(index > 0 ){
            for(let i = 0 ; i < index ; i++){
                list.push(<StarOutlined className="ml-4"/>)
            }
        }
        return list;
    }
    const removeClick = async(id)=>{
        if(window.confirm('Bạn có chắc chắn xóa')){
            try{
                Display();
                const res = await ApiVote.deleteVote({
                    id 
                });
                Hidden();
                if(res.data.success){
                    openNotificationSuccess('Thành công ',  res.data.message , 3);
                
                    const listTemp =  listVote.filter((value=>{
                        return value._id !== id 
                    }))
                    setListVote(listTemp);
                }
            }
            catch(err){
                console.log(err);
            }
        }
       
    }

    return (
        <div>
            <Content>
                <div className="site-layout-content" style={{overflowX:'hidden'}}>
                    <Carousels/>
                    <div className="vote">
                        <div className="vote__container">
                            <div className="vote__header">
                                <div className="text__header">Đánh giá nhà xe : Có lời {listVote.length} đánh giá</div>
                                {!isAdmin ? <Button type="primary" onClick={insertClick}>Thêm đánh giá</Button> : ''}
                            </div>
                            <div className="vote__overview">
                                <div className="vote__star">
                                    <div><span className="text__over">{ Math.round(statics.sum)}</span> trên 5</div>
                                    <div className="overview__star">
                                        <StarOutlined />
                                        <StarOutlined className="ml-4"/>
                                        <StarOutlined className="ml-4"/>
                                        <StarOutlined className="ml-4"/>
                                        <StarOutlined className="ml-4"/>
                                    </div>
                                    
                                </div>
                                <div className="vote__filter">
                                    <div className={filter === 0 ? "product__filter active" : "product__filter"} onClick={e=>onclickFilter(0)}>Tất cả</div>
                                    <div className={filter === 5 ? "product__filter active" : "product__filter"} onClick={e=>onclickFilter(5)}>5 Sao ({statics.list.length>0? statics.list[4].num :  0})</div>
                                    <div className={filter === 4 ? "product__filter active" : "product__filter"} onClick={e=>onclickFilter(4)}>4 Sao ({statics.list.length>0? statics.list[3].num :  0})</div>
                                    <div className={filter === 3 ? "product__filter active" : "product__filter"} onClick={e=>onclickFilter(3)}>3 Sao ({statics.list.length>0? statics.list[2].num :  0})</div>
                                    <div className={filter === 2 ? "product__filter active" : "product__filter"} onClick={e=>onclickFilter(2)}>2 Sao ({statics.list.length>0? statics.list[1].num :  0})</div>
                                    <div className={filter === 1 ? "product__filter active" : "product__filter"} onClick={e=>onclickFilter(1)}>1 Sao ({statics.list.length>0? statics.list[0].num :  0})</div>
                                </div>
                            </div>
                            {
                                listResult.length > 0 ? 
                                
                                    listResult.map((value , index)=>{
                                        return (
                                            <div className="vote__list">
                                                <div className="vote__name">{value.customer.hovaten}</div>
                                                <div className="vote__numberstar">
                                                    {
                                                        renderStar(value.sosao)
                                                    }
                                                   
                                                
                                                </div>
                                                <div className="vote__content">{value.mota}</div>
                                                <div className="detail">
                                                    {isAdmin || user._id === value.customer._id? <span className="primary__color" onClick={e=>removeClick(value._id)}>Xóa - </span> : null}
                                                   Ngày {value.createdAt.slice(0,10)}
                                                </div>
                                        </div>
                                        )
                                    })
                                
                                : <h3 style={{textAlign: 'center' , marginTop :'20px'}}>Chưa có đánh giá nào</h3>
                            }
                          
                        </div>
                    </div>
                </div>
                {
                    isModal ? <Modal
                    onCloseModal = {closeModal}
                    insertVote = {insertVote}
                    ></Modal>  : null
                }
                {Loading}
            </Content>
      </div> 
    );
}

export default Vote;