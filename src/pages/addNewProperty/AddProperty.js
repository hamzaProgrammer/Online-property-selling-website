import React from 'react'
import { Layout, } from 'antd';

import Navbar from '../../components/header/MyHeader'
import AddProp from '../../components/contents/addNewProperty/AddNewProperty'
import MyFooter from '../../components/contents/homePageContent/footer/Footer'


const { Header, Footer, Content } = Layout;

const AddProperty = () => {
    return (
        <>
            <Layout>
                <Header>
                    <Navbar />
                </Header>
                <Content style={{background : '#FFFFFF', borderTop : '1px solid #dfe6e9' , paddingTop : '15px'}} >
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
