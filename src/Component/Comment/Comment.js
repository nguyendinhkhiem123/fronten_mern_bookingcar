import React ,{useEffect, useState} from 'react';
import { Layout, Input , Button } from 'antd'
import Carousels from '../Carousel/Carousel';
import '../Comment/Comment.css'
import { useSelector } from 'react-redux';
import * as ApiComment from '../../Api/Comment/index';
import { openNotificationSuccess  } from '../Notfication';
const { Content } = Layout;
const { TextArea } = Input;
function Comment(props) {
    const isAdmin = useSelector(state =>state.isAdmin);
    const user = useSelector(state => state.currentUser);
    const [ text, setText ] = useState('');
    const [ name , setName ] = useState('');
    const [ id , setId] = useState('');
    const [ comment , setComemnt ] = useState([])
    const [ reply , setReply ] = useState([]);
    const [ one , setOne ] = useState(false);
    const onChangeText =(e)=>{
       
        setText(e.target.value)
    }
    const onChangeName = (e)=>{
        setName(e.target.value)
    }

    const clickReply = (e ,id)=>{
        const temp = '@'+e;
        setText(temp);
        setOne(true);
        setId(id);
        
    }
    const onCancle = ()=>{
        setText('');
        setOne(false);
        setId('');
        setName('');
    }
    const onSubmit = async()=>{
        if(isAdmin){
            if(!one){
                alert('Vui lòng chọn người trả lời')
                return;
            } // trả
            if(text === ''){
                alert('Nội dung không hợp lệ')
                return;
            }
            try{
                const body = {
                    hovaten : user.hovaten ,
                    mota : text,
                    comment : id,
                    employee : user._id

                }
                const res = await ApiComment.insertReply(body);
                if(res.data.body){
                    const listTemp  = [...reply];
                    listTemp.push(res.data.body);
                    setReply(listTemp);
                    setText('');
                    setOne(false);
                    setId('');
                    setName('');
                   
                }
            }
            catch(err){
                console.log(err);
            }  
        }
        else{
            if(text === '' || name === ''){
                alert('Nội dung không hợp lệ')
                return;
            }

            if(one){
                try{
                    const body = {
                        hovaten : name ,
                        mota : text,
                        comment : id,
                        employee : null

                    }
                    const res = await ApiComment.insertReply(body);
                    if(res.data.body){
                        const listTemp  = [...reply];
                        listTemp.push(res.data.body);
                        setReply(listTemp);
                        setText('');
                        setOne(false);
                        setId('');
                        setName('');
                        
                    }
                }
                catch(err){
                    console.log(err);
                }  
            }
            else{
                try{
                    const body = {
                        hovaten : name ,
                        mota : text
                    }
                    const res = await ApiComment.insertComment(body);
                    if(res.data.body){
                        const listTemp  = [...comment];
                        listTemp.push(res.data.body);
                        setComemnt(listTemp);
                        setText('');
                        setOne(false);
                        setId('');
                        setName('');
                    }
                }
                catch(err){
                    console.log(err);
                }
            }
        }
    }

    const replyDelete = async(id)=>{
        if(window.confirm('Bạn có chắc chắn muốn xóa ? ')){
            try{
                const res = await ApiComment.deleteReply({id})
                if(res.data.success){
                    const templist = reply.filter(value=>{
                        return value._id !== id;
                    })
                    setReply(templist)
                    openNotificationSuccess('Thành công ', res.data.message , 3);
                }
            }catch(err){
                console.log(err);
            }
        }
    }
    const commentDelete = async(id)=>{
        if(window.confirm('Bạn có chắc chắn muốn xóa ? .  Lưu ý . Xóa comment đầu thì những comment trả lời sẽ mất')){
            try{
                const res = await ApiComment.deleteComment({id})
                if(res.data.success){
                    const templist = comment.filter(value=>{
                        return value._id !== id;
                    })
                    setComemnt(templist)
                    openNotificationSuccess('Thành công ', res.data.message , 3);
                }
            }catch(err){
                console.log(err);
            }
        }
    }
    useEffect(()=>{
        const getComment = async()=>{
            try{
                const res = await Promise.all([ApiComment.getComment(),ApiComment.getReply()]);
                if(res[0].data.success === true && res[1].data.success === true){
                    setComemnt(res[0].data.body);
                    setReply(res[1].data.body);
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getComment();
    }, [])

    console.log(comment , reply);
    let listResult = [];
    if(comment.lenth > 0){
        comment.sort((a, b)=>{
            return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
        })
    }

    if(reply.lenth > 0){
        reply.sort((a, b)=>{
            return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
        })
    }

    
    if(comment.length > 0){
        listResult=  comment.map((value ,index)=>{
            return (
                <div className="body__show">
                    <div className="comment_s">
                        <p className="comment__name">{value.hovaten}</p>
                        <p className="comment__content">{value.mota}</p>
                        <div>
                              <span className="primary__color cur" onClick={e=>clickReply(value.hovaten ,value._id)}> Trả lời - </span>          
                              {isAdmin ? <span className="primary__color cur"  onClick={e=>commentDelete(value._id)}> Xóa - </span> : ""}
                                         

                            <span> Ngày {value.createdAt.slice(0,10)} </span> 
                          </div>
                     </div>
                     {  reply.length > 0 ?
                         (reply.filter(value1=>{
                             return value1.comment === value._id
                         })).map((value2 , index)=>{
                             return  <div className="reply">
                             <p className="reply__name">{value2.hovaten}  {value2.employee !== null ? <span className="box2">QTV</span> : ""}</p>
                             <p className="reply__content">{value2.mota}</p>
                             <div>
                                 <span className="primary__color cur" onClick={e=>clickReply(value2.hovaten ,value._id)}>Trả lời </span> -
                                {isAdmin ? <span className="primary__color cur" onClick={e=>replyDelete(value2._id)}> Xóa - </span>  : ""}       
                                 <span> Ngày {value2.createdAt.slice(0,10)}</span> 
                             </div>
                           </div>
                         })
                         : ''
                     }
                    
            </div>
            )
        })
    }
    return (
        <div style={{height : '100vh' }}>
            <Content>
                <div className="site-layout-content" style={{overflowX:'hidden'}}>
                    <Carousels/>
                    <div className="comment">
                        <div className="comment__header">
                                <h1>Thảo luận</h1>
                        </div>
                        <div className="comment__body">
                            <div className="body__form">
                                <TextArea  rows={2} placeholder="Nhập nội dụng" className="mt-8" onChange={onChangeText} value={text}/>
                                {isAdmin === false ? <Input placeholder="Nhập họ và tên..." className="mt-8" onChange={onChangeName}  value={name}/> : ""}
                                  <p style={{ marginTop : '10px'}}>{one ? 'Bạn đang trả lơi ' : 'Bạn đang không trả lời ai' }</p>
                                {/* <Input placeholder="Gmail" className="mt-8" /> */}
                                <div className="btn">
                                    <Button type="primary" onClick={onSubmit}>Gửi</Button>
                                    <Button  onClick={onCancle} style={{ marginLeft : '5px'}}>Hủy</Button>
                                </div>
                            </div>
                            {
                                listResult.length > 0 ? 
                                listResult :
                                <h3 style={{textAlign :'center' , marginTop:'40px'}}> Chưa có bình lần  nào</h3>
                            }
                        </div>
                    </div>
                </div>
            </Content>
      </div>
    );
}

export default Comment;