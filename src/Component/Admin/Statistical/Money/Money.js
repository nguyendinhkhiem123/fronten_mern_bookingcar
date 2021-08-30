import React, { useState, useEffect, useRef , useMemo } from 'react';
import { Line } from '@ant-design/charts';
import { InputNumber, Select , Button} from 'antd';
import '../Money/Money.css';
import { useSelector } from 'react-redux';
import { openNotificationSuccess , openNotificationErorr } from '../../../Notfication';
import * as Api from '../../../../Api/Statistical/index';
import useLoading from '../../../HookLoading/HookLoading';
const { Option } = Select;
const formatMoney=(n) =>{
  return n.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}


let minDate = new Date('2020-01-01')
const DemoLine = () => {
  
  const route = useSelector(state=>state.route);
  const [end , setEnd ] = useState(2021);
  const [start , setStart ] = useState(2020);
  const [select , setSelect ] = useState('all');
  const [ data, setData ] = useState([]);

  const [money , setMoney ] = useState(0);
 
  const [textSelect , setTextSelect ] = useState('all');
  const [ Loading , Hidden , Display ] = useLoading();
  const currentDate = new Date();
  let day = currentDate.getDate();
  let month =  currentDate.getMonth() + 1;
  let Year = currentDate.getFullYear();
  let cDay  = day < 10 ? '0'+day.toString() : day.toString(); 
  let cMonthLeter1  = month  < 10 ? '0'+(month ).toString() : (month).toString(); 
  let cMonth = month < 10 ? '0'+ month.toString() : month.toString();
  let cYear = Year;
  let fullDateLater1 = cYear.toString() +'-'+cMonthLeter1 + '-'+cDay;
  let fullDate = cYear.toString() +'-'+cMonth + '-'+cDay;


  const [ fullDateStart , setFullDateStart] = useState(fullDate);
  const [ fullDateEnd , setFullDateEnd] = useState(fullDateLater1);
  const [textEnd , setTextEnd ] = useState(fullDate);
  const [textStart , setTextStart ] = useState(fullDateLater1); 
  const getMoney = async(body)=>{
    try {
        Display()
        const res = await Api.getStatisticalMoney(body);
        Hidden();
        if(res.data.success){
            setMoney(res.data.body);
            setTextStart(fullDateStart);
            setTextEnd(fullDateEnd);
            setTextSelect(select);
            openNotificationSuccess('Thành công' , res.data.message , 3);
        }
        else{
          openNotificationErorr('Thất bại' , res.data.message , 3);
        }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
      
      getMoney({
        matuyen : select,
        nambatdau: fullDateStart,
        namketthuc : fullDateEnd
      
      })
  }, [])
  console.log(currentDate);
  // const con =   {
  //   data, 
  //   yField: 'value',
  //   xField: 'year',
  //   tooltip: {
  //     customContent: (title, items) => {
  //       return (
  //         <>
  //           <h5 style={{ marginTop: 16 }}>{title}</h5>
  //           <ul style={{ paddingLeft: 0 }}>
  //             {items?.map((item, index) => {
  //               const { name, value, color } = item;
  //               return (
  //                 <li
  //                   key={item.year}
  //                   className="g2-tooltip-list-item"
  //                   data-index={index}
  //                   style={{ marginBottom: 4, display: 'flex', alignItems: 'center' }}
  //                 >
  //                   <span className="g2-tooltip-marker" style={{ backgroundColor: color }}></span>
  //                   <span
  //                     style={{ display: 'inline-flex', flex: 1, justifyContent: 'space-between' }}
  //                   >
  //                     <span style={{ margiRight: 16 }}>Tổng tiền :</span>
  //                     <span className="g2-tooltip-list-item-value">{formatMoney(value.toString())}</span>
  //                   </span>
  //                 </li>
  //               );
  //             })}
  //           </ul>
  //         </>
  //       );
  //     },
  //   },
  //   point: {
  //     size: 5,
  //     shape: 'diamond',
  //     style: {
  //       fill: 'white',
  //       stroke: '#2593fc',
  //       lineWidth: 2,
  //     },
  //   },
  // };
  // const config = useMemo(()=>{
  //     return con
      
  // },[data])

 
  const onChangeStart =(e)=>{
      setStart(e)
  }
  const onChangeEnd =(e)=>{
    setEnd(e)
  }
  const onChangeSelect =(e)=>{
        setSelect(e)
}
  const onSubmit =()=>{
      console.log(start , end , select);
      if( fullDateStart === null || fullDateEnd === null){
        openNotificationErorr('Thất bại' , 'Vui lòng nhập đầy đủ' , 3)
        return;
      }
      // if( start <  2020 || end < 2020){
      //   openNotificationErorr('Thất bại' , 'Vui lòng nhập đúng với năm bắt đầu là và năm kết thúc ' , 3)
      //   return;
      // }

      
      const boolean = getMoney({
        matuyen : select,
        nambatdau: fullDateStart,
        namketthuc : fullDateEnd
      
      })
      console.log(boolean);
     
  }
  const onChangeDateStart = (e)=>{
    setFullDateStart(e.target.value);
  }
  const onChangeDateEnd = (e)=>{
    setFullDateEnd(e.target.value);
  }
  console.log(new Date(fullDate) ==new Date(fullDateStart))
  return (
      <div className="money">
          <div className="money__header">
                <div className="money__form">
                    <div className="form__control">
                        <div className="form__label">Lựa chọn</div>
                        <Select value={select} style={{ width: '100%' }} onChange={onChangeSelect} disabled>
                            <Option value="all">Tất cả</Option>
                            {
                                route.length > 0 ?
                                (
                                    route.filter((value, index)=>{
                                    return index%2 === 0
                                    }).map((value,index)=>{
                                        return   <Option value={value.matuyen} key={index}>{value.matuyen}</Option>
                                    })
                                )
                                : ""
                            }
                        </Select>
                    </div>
                    <div className="form__control">
                        <div className="form__label">Từ ngày </div>
                        <input type='date' placeholder="yyyy-mm-dd" 
                        // className="date__input input-form "  
                        onChange={onChangeDateStart} min={minDate}
                        value={fullDateStart} 
                        max={fullDateEnd} 
                        style={{width:'100%'}}/>
                        {/* <InputNumber min={2020}   value={start} max={end} style={{ width: '100%' }} onChange={onChangeStart}/> */}
                    </div>
                    <div className="form__control">
                        <div className="form__label">Đến ngày</div>
                        {/* <InputNumber min={start}  value={end} style={{ width: '100%' }} onChange={onChangeEnd}/> */}
                        <input type='date'
                          placeholder="yyyy-mm-dd" 
                          // className="date__input input-form " 
                          onChange={onChangeDateEnd} 
                          // max={fullDateLater1} 
                          value={fullDateEnd} 
                          min={fullDateStart} 
                          style={{width:'100%'}}/>
                    </div>
                </div>
                <div className="money__submit">
                    <Button type='primary' size='large' onClick={onSubmit}>Thống kê</Button>
                </div>
          </div>
          <div className="money__body">
             
              {/* <Line {...config} /> */}
              <h1 
              style={{textAlign : 'center' , marginTop:'20px'}}>
                Biểu đồ thông kê doanh thu của 
                  { textSelect === 'all' ? 
                ' tất cả tuyến' : 
                ` tuyến ${textSelect}`} 
                
                {
                 textStart === textEnd ? 
                 textStart === fullDateLater1 ? ' hôm nay' : ` vào ${textStart}` 
                //  `vào ${new Date(fullDateEnd) === new Date() ? 'Hôm nay' : fullDateEnd}` 
                 : ` từ  ${fullDateStart} đến năm ${fullDateEnd}`
                } là : {formatMoney(money.toString())}đ</h1>
          </div>
          {Loading};
      </div>
  );
};

export default DemoLine;