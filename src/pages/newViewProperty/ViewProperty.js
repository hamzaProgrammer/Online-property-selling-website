import React from 'react'
import { Layout, } from 'antd';

import Navbar from '../../components/header/MyHeader'
import ViewProp from '../../components/contents/viewNewProperty/ViewNewProperty'
import MyFooter from '../../components/contents/homePageContent/footer/Footer'

const { Header, Footer, Content } = Layout;
const ViewUserProperty = () => {
    return (
        <>
            <Layout>
                <Header>
                    <Navbar />
                </Header>
                <Content style={{background : '#FFFFFF'}} >
                    <ViewProp />
                </Content>
                <Footer style={{background : '#FFFFFF'}}>
                    <MyFooter />
                </Footer>
            </Layout>
        </>
    )
}

export default ViewUserProperty
