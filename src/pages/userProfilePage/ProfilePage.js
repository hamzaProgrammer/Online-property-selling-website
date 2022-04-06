import React from 'react';
import './UserProfile.css'
import { Layout } from 'antd';
import Navbar from '../../components/header/MyHeader'
import UserProfile from '../../components/contents/profilePage/ProfilePage'
import MyFooter from '../../components/contents/homePageContent/footer/Footer'

const { Header, Footer, Content } = Layout;

const ProfilePage = () => {
  
  return (
    <>
        <Layout>
        <Header>
          <Navbar />
        </Header>
        <Content >
          <div className="proDiv" >
            <UserProfile />
        </div>
        </Content>
        <Footer style={{background : '#FFFFFF'}}>
          <MyFooter />
        </Footer>
      </Layout>
    </>
  );
}

export default ProfilePage;
