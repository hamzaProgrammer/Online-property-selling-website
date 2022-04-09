import React  from 'react'
import { Typography ,Button} from 'antd';
import {Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {HomeOutlined} from '@ant-design/icons'

const propertySlider = ({selling , sold}) => {
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
            <div style={{marginTop : '-10px'}} >
                <div style={{display : 'flex' , justifyContent : 'space-between' , alignItems: 'center' , backgroundColor : '#FFFFFF' , height : '60px' , marginTop : '20px' , borderTopLeftRadius : '10px' ,borderTopRightRadius : '10px'}} >
                    <Typography className="sliderText" style={{backgroundColor : 'transparent'}} >My Listed Properties</Typography>
                    <Button style={{backgroundColor : '#2d3436' , color : '#FFFFFF' , fontWeight : 600 , marginRight : '10px' , borderRadius : '5px' }} size="small" href="/addNewProperty" >Add New</Button>
                </div>
                <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    arrows
                >
                {
                    selling?.length > 0 ? (
                        selling?.map((item) => (
                            <>
                                <div style={{backgroundColor : '#FFFFFF' , height : '280px' , marginTop : '5px'}} >
                                    <Link to={`/viewUserProperty/${item?._id}`}>
                                        <img alt="cover" style={{borderRadius : '20px' , paddingTop : '10px' , minHeight : '150px',  objectFit : 'cover'}} className="carImage carImageNew" src={item?.images[0]} />
                                    </Link>
                                    <div className="carouselDiv" >
                                        <Typography className="carouPrice" >${item?.price}</Typography>
                                        <div className="innerDiv newInnerDiv"  >
                                            <Typography className="innerDivText innerDivTextNew " >{item?.baths} Baths</Typography>
                                            <HomeOutlined  style={{color : '#d63031' , marginTop : '2px'}} />
                                            <Typography className="innerDivText innerDivTextNew " >{item?.beds} Beds</Typography>
                                            <HomeOutlined style={{color : '#d63031' , marginTop : '2px'}} />
                                            <Typography className="innerDivText innerDivTextNew " >{item?.bedrooms} Bedrooms</Typography>
                                        </div>
                                        <Typography className="carouAdd carouAddNew" style={{paddingLeft: '5px' , paddingRight : '5px'}} >{item?.address}</Typography>
                                    </div>
                                </div>
                            </>
                        ))
                    ) : (
                        <Typography className="NoRelatedFound" >No Related Properties Found</Typography>
                    )
                }
                </Carousel>
            </div>

            <div>
                <Typography className="sliderText" >My Recently Sold Properties</Typography>
                <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    arrows
                >
                {
                    sold?.length > 0 ? (
                        sold?.map((item) => (
                            <>
                                <div style={{backgroundColor : '#FFFFFF' , height : '280px' , marginTop : '5px'}} >
                                    <Link to={`/viewUserProperty/${item?._id}`}>
                                        <img alt="cover" style={{borderRadius : '20px' , paddingTop : '10px' , minHeight : '150px',  objectFit : 'cover'}} className="carImage carImageNew" src={item?.images[0]} />
                                    </Link>
                                    <div className="carouselDiv" >
                                        <Typography className="carouPrice" >${item?.price}</Typography>
                                        <div className="innerDiv newInnerDiv"  >
                                            <Typography className="innerDivText innerDivTextNew " >{item?.baths} Baths</Typography>
                                            <HomeOutlined  style={{color : '#d63031' , marginTop : '2px'}} />
                                            <Typography className="innerDivText innerDivTextNew " >{item?.beds} Beds</Typography>
                                            <HomeOutlined style={{color : '#d63031' , marginTop : '2px'}} />
                                            <Typography className="innerDivText innerDivTextNew " >{item?.bedrooms} Bedrooms</Typography>
                                        </div>
                                        <Typography className="carouAdd carouAddNew" style={{paddingLeft: '5px' , paddingRight : '5px'}} >{item?.address}</Typography>
                                    </div>
                                </div>
                            </>
                        ))
                    ) : (
                        <Typography className="NoRelatedFound" >No Related Properties Found</Typography>
                    )
                }
                </Carousel>
            </div>
        </>
    )
}

export default propertySlider
