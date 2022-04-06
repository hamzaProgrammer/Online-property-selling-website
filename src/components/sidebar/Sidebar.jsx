import React from 'react'
import {  Space , Typography } from 'antd';
import {PropertySafetyOutlined} from '@ant-design/icons'

const { Title } = Typography;

const Sidebar = () => {
    return (
        <>
            <Space direction="vertical" className="sidebar"  >
                <Space className="mainLogo" >
                    <PropertySafetyOutlined className="homeIcon" />
                    <Title level={4} className="title" >OmAh</Title>
                </Space>

                <Space className="space" direction="vertical" >
                    <PropertySafetyOutlined className="homeIcon1"  />
                    <Title level={5}  style={{color : '#546de5' }} >Dashboard</Title>
                </Space>
                <Space className="space" direction="vertical">
                    <PropertySafetyOutlined className="homeIcon1" />
                    <Title level={5}  style={{color : '#546de5'  }} >Priority</Title>
                </Space>
                <Space className="space" direction="vertical" >
                    <PropertySafetyOutlined className="homeIcon1" />
                    <Title level={5}  style={{color : '#546de5'  }} >Dashboard</Title>
                </Space>
                <Space className="space" direction="vertical">
                    <PropertySafetyOutlined className="homeIcon1" />
                    <Title level={5}  style={{color : '#546de5'  }} >Priority</Title>
                </Space>
                <Space className="space" direction="vertical" >
                    <PropertySafetyOutlined className="homeIcon1" />
                    <Title level={5}  style={{color : '#546de5'  }} >Dashboard</Title>
                </Space>
                <Space className="space" direction="vertical">
                    <PropertySafetyOutlined className="homeIcon1" />
                    <Title level={5}  style={{color : '#546de5'  }} >Priority</Title>
                </Space>
            </Space>
        </>
    )
}

export default Sidebar
