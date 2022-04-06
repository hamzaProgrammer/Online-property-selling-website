import React from 'react';
import { Layout } from 'antd';

import Navbar from '../../components/header/MyHeader'
import MainImages from '../../components/contents/singleProperty/mainImages/MainImages'
import Details from '../../components/contents/singleProperty/details/Details'
import Desc from '../../components/contents/singleProperty/PropertyDesc/PropertyDesc'
import Carousel from '../../components/contents/singleProperty/carousel/Carousel'
import MyFooter from '../../components/contents/homePageContent/footer/Footer'

const { Header, Footer, Content } = Layout;

const Home = () => {
  return (
    <>
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <Content style={{background : '#FFFFFF'}} >
          <MainImages />
          <Details />
          <Desc />
          {/* <Carousel /> */}
        </Content>
        <Footer style={{background : '#FFFFFF'}}>
          <MyFooter />
        </Footer>
      </Layout>

    </>
  );
}

export default Home;
