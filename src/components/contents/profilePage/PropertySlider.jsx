import React  from 'react'
import { Typography ,Button} from 'antd';
import {Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed , faBath  , faRestroom } from '@fortawesome/free-solid-svg-icons'


const propertySlider = ({selling , sold}) => {
    // function onChange(a, b, c) {
    //     console.log(a, b, c);
    // }
    // const SampleNextArrow = props => {
    //   const { className, style, onClick } = props
    //   return (
    //     <div
    //       className={className}
    //       style={{
    //         ...style,
    //         color: 'black',
    //         fontSize: '35px',
    //         lineHeight: '1.5715'
    //       }}
    //       onClick={onClick}
    //     >
          
    //     </div>
    //   )
    // }
    // const SamplePrevArrow = props => {
    //   const { className, style, onClick } = props
    //   return (
    //     <div
    //       className={className}
    //       style={{
    //         ...style,
    //         color: 'black',
    //         fontSize: '35px',
    //         lineHeight: '1.5715',
    //       }}
    //       onClick={onClick}
    //     >
          
    //     </div>
    //   )
    // }
    // const settings = {
    //   nextArrow: <SampleNextArrow />,
    //   prevArrow: <SamplePrevArrow />
    // }
    
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
                    autoPlay={true}
                    arrows
                >
                {
                    selling?.map((item) => {
                        return (
                            <div style={{backgroundColor : '#FFFFFF' , minWidth : '100%' , paddingLeft : '5px' , marginTop : '5px'}} >
                                <Link to={`/viewUserProperty/${item?._id}`}>
                                    <img alt="cover" style={{borderRadius : '20px'}} className="carImageNew" src={item?.images[0]} key={item?.bedrooms} />
                                </Link>
                                    <Typography className="carouPrice"  >${item?.price}</Typography>
                                <div className="carouselDivNew">
                                    <div className="innerDiv" key={item?.price} >   
                                        <Typography className="innerDivText" >{item?.baths} Baths</Typography>
                                        <FontAwesomeIcon icon={faBath} color="#e17055" size="lg" />
                                        <Typography className="innerDivText" >{item?.bedrooms} beds</Typography>
                                        <FontAwesomeIcon icon={faBed} color="#6c5ce7" size="lg" />
                                        <Typography className="innerDivText" >{item?.rooms} rooms</Typography>
                                        <FontAwesomeIcon icon={faRestroom} color="#ff7675" size="lg" />
                                    </div>
                                    <Typography className="carouAdd" >{item?.address}</Typography>
                                </div>
                            </div>
                        )
                    })
                }
                </Carousel>
            </div>

            <div  >
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
                    autoPlay={true}
                    arrows
                >
                {
                    sold?.map((item) => {
                        return (
                            <div style={{backgroundColor : '#FFFFFF' , minWidth : '100%' , paddingLeft : '5px' , marginTop : '5px'}} >
                                <Link to={`/viewUserProperty/${item?._id}`}>
                                    <img alt="cover" style={{borderRadius : '20px'}} className="carImageNew" src={item?.images[0]} key={item?.bedrooms} />
                                </Link>
                                    <Typography className="carouPrice"  >${item?.price}</Typography>
                                <div className="carouselDivNew">
                                    <div className="innerDiv" key={item?.price} >   
                                        <Typography className="innerDivText" >{item?.baths} Baths</Typography>
                                        <FontAwesomeIcon icon={faBath} color="#e17055" size="lg" />
                                        <Typography className="innerDivText" >{item?.bedrooms} beds</Typography>
                                        <FontAwesomeIcon icon={faBed} color="#6c5ce7" size="lg" />
                                        <Typography className="innerDivText" >{item?.rooms} rooms</Typography>
                                        <FontAwesomeIcon icon={faRestroom} color="#ff7675" size="lg" />
                                    </div>
                                    <Typography className="carouAdd" >{item?.address}</Typography>
                                </div>
                            </div>
                        )
                    })
                }
                </Carousel>
            </div>
        </>
    )
}

export default propertySlider
