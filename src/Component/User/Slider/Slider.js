import React, { useEffect, useMemo, useState } from 'react';
import { Carousel } from 'antd';
import { HeatMapOutlined  , RightOutlined , LeftOutlined} from '@ant-design/icons'
import '../Slider/Slider.css';
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

function Slider(props) {
  

    const [activeElement , setActiveElement] = useState(6);
    const [valueTrans , setValueTrans] = useState(0);
    const [valueDem , setValueDem]  = useState(7);
     
   
    useEffect(()=>{
        const element = document.getElementsByClassName('slider__content');
        const avg = Math.floor(element.length/2);
        // element[avg].classList.add('slider__active');
        element[activeElement].classList.add('slider__active');
        setActiveElement(activeElement);
    },[activeElement])

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //       nextClick();
    //     }, 5000);
    //                // clearing interval
    //     return () => clearInterval(timer);
    //   });
    const nextClick = ()=>{
            const element = document.getElementsByClassName('slider__content');
            const sliderBody = document.querySelector(".slider__body");
            let active = 0
            let valueTran = 0;
            const temp = valueDem + 1;
            if(13 - temp == 2){
                active = 6;
                valueTran = 0;
                setValueDem(7)
            }
            else{
                active = activeElement + 1;
                valueTran = valueTrans + 1;
                setValueDem(temp);  
            }
           
            element[activeElement].classList.remove('slider__active');
            setActiveElement(active);
            sliderBody.style.transform = `translateX(${valueTran*-280}px)`;
            setValueTrans(valueTran);
            
    }
    const prevClick = ()=>{
            const element = document.getElementsByClassName('slider__content');
            const sliderBody = document.querySelector(".slider__body");
            let active = 0
            let valueTran = 0;
            const temp = valueDem - 1;
            if(temp - 1 == 2){
                active = 6;
                valueTran = 0
                setValueDem(7)
            }
            else{
                active = activeElement - 1;
                valueTran = valueTrans - 1;
                setValueDem(temp);  
            }
           
            element[activeElement].classList.remove('slider__active');
            setActiveElement(active);
            sliderBody.style.transform = `translateX(${valueTran*-280}px)`;
            setValueTrans(valueTran);
    }   
    
 
    return (
        <div className="slider">
                <div className="slider__header">
                    <p className="slider__title">Điểm đến phổ biến</p>
                    <p className="slider__desc">Gợi ý những điểm du lịch được ưa thích trong năm</p>
                </div>
                <div className="slider__body">
                     {/* <Carousel dotPosition="bottom" autoplay > */}
                         
                        <div className="slider__content"  >
                             <img src="https://futabus.vn/_nuxt/img/commonDest_item12.290f5b6.png" className="slider__img"/>
                             <div className="slider__sub">
                                        <p className="slider__location"> <HeatMapOutlined /> QUẬN 1 </p>
                                        <p className="slider__nam">TP. HỒ CHÍ MINH</p>
                                </div>
                                <div className="slider__next" onClick={nextClick}>
                                <RightOutlined/>
                            </div>
                            <div className="slider__prev" onClick={prevClick}>
                                    <LeftOutlined/>
                            </div>
                        </div>
                        <div className="slider__content  "  >
                            <img src="https://futabus.vn/_nuxt/img/commonDest_item13.6914e01.png" className="slider__img"/>
                            <div className="slider__sub">
                                        <p className="slider__location"> <HeatMapOutlined /> QUẬN 2 </p>
                                        <p className="slider__nam">TP. HỒ CHÍ MINH</p>
                            </div>
                            <div className="slider__next" onClick={nextClick}>
                                <RightOutlined/>
                           </div>
                            <div className="slider__prev" onClick={prevClick}>
                                    <LeftOutlined/>
                            </div>
                        </div>
                        <div className="slider__content ">
                            
                            <img src="https://futabus.vn/_nuxt/img/commonDest_item13.6914e01.png" className="slider__img"/>
                                <div className="slider__sub">
                                            <p className="slider__location"> <HeatMapOutlined /> QUẬN 3 </p>
                                            <p className="slider__nam">TP. HỒ CHÍ MINH</p>
                                </div>
                                <div className="slider__next" onClick={nextClick}>
                                        <RightOutlined/>
                                </div>
                                <div className="slider__prev" onClick={prevClick}>
                                        <LeftOutlined/>
                                </div>
                            </div>
                            <div className="slider__content "  >
                                <img src="https://futabus.vn/_nuxt/img/commonDest_item13.6914e01.png" className="slider__img"/>
                                <div className="slider__sub">
                                            <p className="slider__location"> <HeatMapOutlined /> QUẬN 4 </p>
                                            <p className="slider__nam">TP. HỒ CHÍ MINH</p>
                                </div>
                                <div className="slider__next" onClick={nextClick}>
                                <RightOutlined/>
                                </div>
                                <div className="slider__prev" onClick={prevClick}>
                                        <LeftOutlined/>
                                </div>
                            </div>
                        <div className="slider__content"  >
                            <img src="https://futabus.vn/_nuxt/img/commonDest_item13.6914e01.png" className="slider__img"/>
                            <div className="slider__sub">
                                        <p className="slider__location"> <HeatMapOutlined /> QUẬN 5 </p>
                                        <p className="slider__nam">TP. HỒ CHÍ MINH</p>
                            </div>
                            <div className="slider__next" onClick={nextClick}>
                                <RightOutlined/>
                            </div>
                            <div className="slider__prev" onClick={prevClick}>
                                    <LeftOutlined/>
                            </div>
                        </div>
                        <div className="slider__content ">
                            <img src="https://futabus.vn/_nuxt/img/commonDest_item13.6914e01.png" className="slider__img"/>
                            <div className="slider__sub">
                                        <p className="slider__location"> <HeatMapOutlined /> QUẬN 6 </p>
                                        <p className="slider__nam">TP. HỒ CHÍ MINH</p>
                            </div>
                            <div className="slider__next" onClick={nextClick}>
                                <RightOutlined/>
                             </div>
                            <div className="slider__prev" onClick={prevClick}>
                                    <LeftOutlined/>
                            </div>
                        </div>
                        <div className="slider__content "  >
                            <img src="https://futabus.vn/_nuxt/img/commonDest_item13.6914e01.png" className="slider__img"/>
                            <div className="slider__sub">
                                        <p className="slider__location"> <HeatMapOutlined /> QUẬN 7 </p>
                                        <p className="slider__nam">TP. HỒ CHÍ MINH</p>
                            </div>
                            <div className="slider__next" onClick={nextClick}>
                                <RightOutlined/>
                           </div>
                            <div className="slider__prev" onClick={prevClick}>
                                    <LeftOutlined/>
                            </div>
                        </div>
                        <div className="slider__content"  >
                            <img src="https://futabus.vn/_nuxt/img/commonDest_item13.6914e01.png" className="slider__img"/>
                            <div className="slider__sub">
                                        <p className="slider__location"> <HeatMapOutlined /> QUẬN 8 </p>
                                        <p className="slider__nam">TP. HỒ CHÍ MINH</p>
                            </div>
                            <div className="slider__next" onClick={nextClick}>
                                <RightOutlined/>
                            </div>
                            <div className="slider__prev" onClick={prevClick}>
                                    <LeftOutlined/>
                            </div>
                        </div>
                        <div className="slider__content"  >
                            <img src="https://futabus.vn/_nuxt/img/commonDest_item13.6914e01.png" className="slider__img"/>
                            <div className="slider__sub">
                                        <p className="slider__location"> <HeatMapOutlined /> QUẬN 9 </p>
                                        <p className="slider__nam">TP. HỒ CHÍ MINH</p>
                            </div>
                            <div className="slider__next" onClick={nextClick}>
                                <RightOutlined/>
                            </div>
                            <div className="slider__prev" onClick={prevClick}>
                                    <LeftOutlined/>
                            </div>
                        </div>
                        
                        <div className="slider__content"  >
                            <img src="https://futabus.vn/_nuxt/img/commonDest_item13.6914e01.png" className="slider__img"/>
                            <div className="slider__sub">
                                        <p className="slider__location"> <HeatMapOutlined /> QUẬN 10 </p>
                                        <p className="slider__nam">TP. HỒ CHÍ MINH</p>
                            </div>
                            <div className="slider__next" onClick={nextClick}>
                                <RightOutlined/>
                            </div>
                            <div className="slider__prev" onClick={prevClick}>
                                    <LeftOutlined/>
                            </div>
                        </div>
                          
                        <div className="slider__content"  >
                            <img src="https://futabus.vn/_nuxt/img/commonDest_item13.6914e01.png" className="slider__img"/>
                            <div className="slider__sub">
                                        <p className="slider__location"> <HeatMapOutlined /> QUẬN 11 </p>
                                        <p className="slider__nam">TP. HỒ CHÍ MINH</p>
                            </div>
                            <div className="slider__next" onClick={nextClick}>
                                <RightOutlined/>
                            </div>
                            <div className="slider__prev" onClick={prevClick}>
                                    <LeftOutlined/>
                            </div>
                        </div>
                        <div className="slider__content"  >
                            <img src="https://futabus.vn/_nuxt/img/commonDest_item13.6914e01.png" className="slider__img"/>
                            <div className="slider__sub">
                                        <p className="slider__location"> <HeatMapOutlined /> QUẬN 11 </p>
                                        <p className="slider__nam">TP. HỒ CHÍ MINH</p>
                            </div>
                            <div className="slider__next" onClick={nextClick}>
                                <RightOutlined/>
                            </div>
                            <div className="slider__prev" onClick={prevClick}>
                                    <LeftOutlined/>
                            </div>
                        </div>
                        <div className="slider__content"  >
                            <img src="https://futabus.vn/_nuxt/img/commonDest_item13.6914e01.png" className="slider__img"/>
                            <div className="slider__sub">
                                        <p className="slider__location"> <HeatMapOutlined /> QUẬN 11 </p>
                                        <p className="slider__nam">TP. HỒ CHÍ MINH</p>
                            </div>
                            <div className="slider__next" onClick={nextClick}>
                                <RightOutlined/>
                            </div>
                            <div className="slider__prev" onClick={prevClick}>
                                    <LeftOutlined/>
                            </div>
                        </div>
                     
                     {/* </Carousel> */}
                </div>
        </div>
    );
}

export default Slider;