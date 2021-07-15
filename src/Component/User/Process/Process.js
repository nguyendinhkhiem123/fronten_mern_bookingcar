import React , {useEffect} from 'react';
import '../Process/Process.css'
function Process(props) {
    const { isActive } = props
    
    useEffect(()=>{
        const process = document.querySelector('.process_load');
        const process__item = document.querySelectorAll('.process__item');
        process__item.forEach(value =>{
            value.classList.remove('actived')
        })
        if(isActive > 0){
            for(let i = 0 ; i < isActive ; i++){
                process__item[i].classList.add('actived');
            }
        }
        
        process.style.width = `${isActive * 33}%`
    },[isActive])

    return (
        <div className="process_header">
         
            <div className="process_container">
                <div className={isActive === 0 ?"process__item active": "process__item"}>
                        <span className="process__header">1</span>
                        <p className={isActive === 0 ? "process__desc" : 'hidden process__desc' }>Chọn tuyến</p>
                </div>
                <div className={isActive ===1 ? "process__item active" :"process__item"}>
                        <span className="process__header">2</span>
                        <p className={isActive === 1 ? "process__desc" : 'hidden process__desc' }>Chọn giờ</p>
                </div>
                <div className={isActive ===2 ? "process__item active" :"process__item"}>
                        <span className="process__header">3</span>
                        <p className={isActive === 2 ? "process__desc" : 'hidden process__desc' }>Chọn ghế</p>
                </div>
                <div className={isActive ===3 ? "process__item active" :"process__item"}>
                         <span className="process__header">4</span>
                        <p className={isActive === 3 ? "process__desc" : 'hidden process__desc' }>Thanh toán</p>
                </div>
                <div className="process_load" ></div>
            </div>
          
        </div>
    );
}

export default Process;