import React from 'react'
import { Layout, } from 'antd';

import Navbar from '../../components/header/MyHeader'
import PropertySec from '../../components/contents/allRentHomes/AllRentHome'
import MyFooter from '../../components/contents/homePageContent/footer/Footer'

const { Header, Footer, Content } = Layout;

const CityProperties = () => {
    return(
        <>
            <Layout>
                <Header>
                    <Navbar />
                </Header>
                <Content style={{background : '#FFFFFF'}} >
                    <PropertySec />
                </Content>
                <Footer style={{background : '#FFFFFF'}}>
                    <MyFooter />
                </Footer>
            </Layout>
        </>
    )
}

export default CityProperties;