import React from 'react';  
import { Layout , Tabs } from 'antd';
import Carousels from '../../Carousel/Carousel';
import '../Tab/Tab.css';
import Car from '../Statistical/Car/Car';
import Money from '../Statistical/Money/Money';
import Trip from '../Statistical/Trip/Trip';
const { TabPane } = Tabs;
const { Content } = Layout; 
function Tab(props) {
    return (
        <div>
        <Content>
            <div className="site-layout-content" style={{overflowX:'hidden'}}>
                <Carousels/>
                <div className="tab__body">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Thống kê doanh thu" key="1">
                            <Money/>
                        </TabPane>
                        <TabPane tab="Thống kế chuyến xe" key="2">
                          <Trip/>
                        
                        </TabPane>
                        <TabPane tab="Thống kê xe" key="3">
                           <Car/> 
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </Content>
    </div>
    );
}

export default Tab;