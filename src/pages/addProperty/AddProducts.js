import React from 'react'
import { Layout, } from 'antd';

import Navbar from '../../components/header/MyHeader'
import AddProp from '../../components/contents/addProperty/AddProperty'
import MyFooter from '../../components/contents/homePageContent/footer/Footer'


const { Header, Footer, Content } = Layout;

const AddProperty = () => {
    return (
        <>
            <Layout>
                <Header>
                    <Navbar />
                </Header>
                <Content style={{background : '#ecf0f1'}} >
                    <AddProp />
                </Content>
                <Footer style={{background : '#FFFFFF'}}>
                    <MyFooter />
                </Footer>
            </Layout>
        </>
    )
}

export default AddProperty
