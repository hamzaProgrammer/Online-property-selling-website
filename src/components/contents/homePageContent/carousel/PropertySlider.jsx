import React from 'react'
import { Row, Col , Typography, Button   } from 'antd';
import './Carousel.css'
import {HeartOutlined} from '@ant-design/icons'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const PropertySlider = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3.5
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 768, min: 577 },
            items: 2.5
        },
        miniMobile: {
            breakpoint: { max: 576, min: 320 },
            items: 1
        }
    };
    return (
        <>
            <Row style={{marginTop : '35px' , marginBottom: '25px'}} >
                <Col sm={4} md={5}></Col>
                <Col sm={16} md={13}>
                    <div className="headDiv" >
                        <Typography className="mainTitle">Explore homes on Trulia</Typography>
                        <Typography className="mainText">Take a deep dive and browse homes for sale, original neighborhood photos, resident reviews and local insights to find what is right for you.</Typography>
                    </div>
                </Col>
                <Col sm={4} md={5}></Col>
            </Row>
            <Row>
                <Col xs={{span : 23 , offset : 1}} sm={{span : 23 , offset : 1}} md={{span : 23 , offset : 1}} lg={{span : 23 , offset : 1}} xl={{span : 23 , offset : 1}} >
                    <Carousel
                        swipeable={true}
                        draggable={false}
                        showDots={false}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        //deviceType={props.deviceType}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                        autoPlay={false}
                    >
                        <div className="item" >
                            <img alt="cover" style={{borderRadius : '20px'}} className="itemImage" src="https://media.istockphoto.com/photos/snowcapped-k2-peak-picture-id1288385045?b=1&k=20&m=1288385045&s=170667a&w=0&h=3M3ZRl1bxOGxcvmYZ-TOtuJ3idm0psm4c7GFba1TA5g=" />
                            <Typography className="itemtext">Atlanta,GA</Typography>
                            <Button className="itemBtn" href="/propertiesOfCity/atlanta">View Now</Button>
                        </div>
                        <div className="item" >
                                <img alt="cover" style={{borderRadius : '20px'}} className="itemImage" src="https://media.istockphoto.com/photos/aerial-view-of-residential-distratic-at-major-mackenzie-dr-and-ave-picture-id1320991884?b=1&k=20&m=1320991884&s=170667a&w=0&h=N79xaO8j11u7tRWG7RCy8ksCkdTgujeFLFpXR_guaa0=" />
                                <Typography className="itemtext">Istanbul</Typography>
                                <Button className="itemBtn" href="/propertiesOfCity/istanbul" >View Now</Button>
                        </div>
                        <div className="item" >
                            <img alt="cover" style={{borderRadius : '20px'}} className="itemImage" src="https://media.istockphoto.com/photos/large-house-with-steep-roof-and-side-entry-three-car-garage-picture-id1272163106?b=1&k=20&m=1272163106&s=170667a&w=0&h=pTjbBRKTcnhs-oIGpuSB4TyAE5768gp0BefDXxyUNTU=" />
                            <Typography className="itemtext">Izmir</Typography>
                            <Button className="itemBtn" href="/propertiesOfCity/izmir" >View Now</Button>
                        </div>
                        <div className="item" >
                            <img alt="cover" style={{borderRadius : '20px'}} className="itemImage" src="https://media.istockphoto.com/photos/modern-living-room-interior-3d-render-picture-id1293762741?b=1&k=20&m=1293762741&s=170667a&w=0&h=2RI8SmBN4MrEZuTvdwRzaeB887x-dukFcQBpyQ-qwS4=" />
                            <Typography className="itemtext">Ankara</Typography>
                            <Button className="itemBtn" href="/propertiesOfCity/ankara">View Now</Button>
                        </div>
                        <div className="item" >
                            <img alt="cover" style={{borderRadius : '20px'}} className="itemImage" src="https://media.istockphoto.com/photos/colonial-style-house-picture-id1284097677?b=1&k=20&m=1284097677&s=170667a&w=0&h=1A7BkHG5OU4WCN7m22OOhvVmU21q4UsYVJPrS1kgcKI=" />
                            <Typography className="itemtext">Adana</Typography>
                            <Button className="itemBtn" href="/propertiesOfCity/adana">View Now</Button>
                        </div>
                    </Carousel>
                </Col>
            </Row>
            <Row style={{marginTop : '35px' , marginBottom: '25px'}} >
                <Col xs={2} sm={4} md={5}></Col>
                <Col xs={22} sm={16} md={13}>
                    <div className="headDivOne" >
                        <div style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center'}} >
                            <Typography  className="text" >Discover  </Typography>
                            <img alt="logo" style={{maxWidth : '30px' , maxHeight : '30px'}} src="https://www.trulia.com/images/icons/txl3/LocationLincolnIcon.svg" />
                            <Typography  className="text textOne">a place  </Typography>
                            <img alt="logo" style={{maxWidth : '30px' , maxHeight : '30px' }} src="https://www.trulia.com/images/icons/txl3/TownHouseIcon.svg" />
                            <Typography  className="text textTwo">you'll love   </Typography>
                            <HeartOutlined style={{color : 'crimson' , fontSize : '22px'}} />
                            <Typography style={{width : '90px' , paddingLeft : '5px'}} className="text textOne">to live</Typography>
                        </div>
                    </div>
                </Col>
                <Col xs={0} sm={4} md={5}></Col>
            </Row>
        </>
    )
}

export default PropertySlider