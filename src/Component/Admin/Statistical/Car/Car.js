import React, { useState, useEffect, useRef , useMemo } from 'react';
import { Column } from '@ant-design/charts';
import { InputNumber, Select , Button} from 'antd';
import '../Money/Money.css';
import { useSelector } from 'react-redux';
import { openNotificationSuccess , openNotificationErorr } from '../../../Notfication';
import * as Api from '../../../../Api/Statistical/index';
import useLoading from '../../../HookLoading/HookLoading';
const { Option } = Select;
const DemoLine = () => {
  
  const route = useSelector(state=>state.route);
  const [end , setEnd ] = useState(2021);
  const [start , setStart ] = useState(2020);
  const [select , setSelect ] = useState('all');



  const [ data, setData ] = useState([]);

  const [textEnd , setTextEnd ] = useState(2021);
  const [textStart , setTextStart ] = useState(2020);
  const [textSelect , setTextSelect ] = useState('all');
  const [ Loading , Hidden , Display ] = useLoading();
  const getCar = async(body)=>{
    try {
        Display()
        const res = await Api.getStatisticalCar(body);
        Hidden();
        if(res.data.success){
            console.log(res);
            setData(res.data.body);
        }
        else{
          openNotificationErorr('Thất bại' , res.data.message , 3);
        }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
      
      getCar({
        matuyen : select,
        nambatdau: start,
        namketthuc : end
      
      })
  }, [])

  const con  =  {
    data,
    xField: 'car',
    yField: 'value',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    meta: {
      car: { alias: 'Category' },
      value: { alias: 'Số chuyến' },
    },
  };
  const config = useMemo(()=>{
    return con;
  }, [data])
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
      if( start === null || end === null){
        openNotificationErorr('Thất bại' , 'Vui lòng nhập đầy đủ' , 3)
        return;
      }
      if( start <  2020 || end < 2020){
        openNotificationErorr('Thất bại' , 'Vui lòng nhập đúng với năm bắt đầu là và năm kết thúc ' , 3)
        return;
      }
      getCar({
        matuyen : select,
        nambatdau: start,
        namketthuc : end
      
      })
      setTextStart(start);
      setTextEnd(end);
      setTextSelect(select);
  }
  return (
      <div className="money">
          <div className="money__header">
                <div className="money__form">
                    <div className="form__control">
                        <div className="form__label">Lựa chọn</div>
                        <Select value={select} style={{ width: '100%' }} onChange={onChangeSelect}>
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
                        <div className="form__label">Năm bắt đầu</div>
                        <InputNumber min={2020}   value={start} max={end} style={{ width: '100%' }} onChange={onChangeStart}/>
                    </div>
                    <div className="form__control">
                        <div className="form__label">Năm kết thúc</div>
                        <InputNumber min={start }  value={end} style={{ width: '100%' }} onChange={onChangeEnd}/>
                    </div>
                </div>
                <div className="money__submit">
                    <Button type='primary' size='large' onClick={onSubmit}>Thống kê</Button>
                </div>
          </div>
          <div className="money__body">
              {/* <h1 style={{textAlign : 'center' , marginBottom:'20px'}}>Biểu đồ thông kê số lượng xe chạy từ năm {start} đến năm {end}</h1> */}
              <Column
                {...config}
                onReady={(plot) => {
                    plot.on('plot:click', (evt) => {
                    const { x, y } = evt;
                    const { xField } = plot.options;
                    const tooltipData = plot.chart.getTooltipItems({ x, y });
                    console.log(tooltipData);
                    });
                }}
                />
                 <h1 style={{textAlign : 'center' , marginTop:'20px'}}>Biểu đồ thông kê số lượng xe chạy thuộc { textSelect === 'all' ? 'tất cả tuyến' : `tuyến ${select}`} { textStart === textEnd ? `vào năm ${textStart}` :  `từ năm ${textStart} đến năm ${textEnd}`}</h1>
          </div>
      </div>
  );
};

export default DemoLine;