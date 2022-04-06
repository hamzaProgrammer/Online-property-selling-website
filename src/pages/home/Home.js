import React from 'react';
import { Layout } from 'antd';
import Navbar from '../../components/header/MyHeader'
import HomeImage from '../../components/contents/homePageContent/homeImage/HomeImage'
import HomeCards from '../../components/contents/homePageContent/cards/Cards'
import PropertySlider from '../../components/contents/homePageContent/carousel/PropertySlider'
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
          <HomeImage />
          <HomeCards />
          <PropertySlider/>
          

        </Content>
        <Footer style={{background : '#FFFFFF'}}>
          <MyFooter />
        </Footer>
      </Layout>

    </>
  );
}

export default Home;
