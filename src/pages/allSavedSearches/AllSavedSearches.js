import React from 'react'
import { Layout , Row , Col } from 'antd';


import Navbar from '../../components/header/MyHeader'
import SideBar from '../../components/contents/editprofile/EditProfilesideBar'
import SavedSearches from '../../components/contents/savedSearches/getAllSavedSearch'
import MyFooter from '../../components/contents/homePageContent/footer/Footer'

const { Header, Footer, Content } = Layout;

const EditProfile = () => {
    return (
        <>
            <Layout>
                <Header>
                    <Navbar />
                </Header>
                <Content style={{background : '#FFFFFF'}} >
                    <Row>
                        <Col xs={24} sm={8} md={6} lg={5} xl={5} style={{borderRight : '1px solid #636e72'}} >
                            <SideBar />
                        </Col>
                        <Col xs={24} sm={14} md={18} lg={19} xl={19}>
                            <SavedSearches />
                        </Col>
                    </Row>
                </Content>
                <Footer style={{background : '#FFFFFF'}}>
                    <MyFooter />
                </Footer>
            </Layout>
        </>
    )
}

export default EditProfile
