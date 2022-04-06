import React from 'react'
import { Layout, } from 'antd';

import Navbar from '../../components/header/MyHeader'
import PropertySec from '../../components/contents/cityProperties/properties/Properties'
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
                    {/* <FilterBtns /> */}
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