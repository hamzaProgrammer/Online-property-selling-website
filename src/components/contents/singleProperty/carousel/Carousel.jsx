import React  , {useState , useEffect } from 'react'
import { Row, Col, Typography  } from 'antd';
import './Carousel.css'
import {HomeOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import {getRelatedProperties} from '../../../../server_api/Api'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const SampleNextArrow = props => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        color: 'black',
        fontSize: '35px',
        lineHeight: '1.5715'
      }}
      onClick={onClick}
    >
      
    </div>
  )
}

const SamplePrevArrow = props => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        color: 'black',
        fontSize: '35px',
        lineHeight: '1.5715',
      }}
      onClick={onClick}
    >
      
    </div>
  )
}

const settings = {
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
}

const MyCarousel = () =>{
    const [relatedPropData , setrelatedPropData ] = useState([])
    const {id} = useParams();

    useEffect(() => {
        const getRelatedData = async () => {
            const {data} = await getRelatedProperties(id);
            setrelatedPropData(data?.Property)
        }
        getRelatedData();
    },[id])

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
    return(
        <>
            <Row>
                <Col xs={{span : 19 , offset : 2}} sm={{span : 20 , offset : 2}} md={{span : 22 , offset : 1}} lg={{span : 20 , offset : 2}}>
                    <Typography className="relatedMyHead" >Related Properties</Typography>
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
                        {
                            relatedPropData?.length > 0 ? (
                                relatedPropData?.map((item) => (
                                    <>
                                        <div  >
                                            <Link to={`/singleProperty/}`}>
                                                <img alt="cover" style={{borderRadius : '20px'}} className="carImage" src={item?.images[0]} />
                                            </Link>
                                            <div className="carouselDiv" >
                                                <Typography className="carouPrice" >${item?.price}</Typography>
                                                <div className="innerDiv" >
                                                    <Typography className="innerDivText" >{item?.baths} Baths</Typography>
                                                    <HomeOutlined  style={{color : '#d63031' , marginTop : '2px'}} />
                                                    <Typography className="innerDivText" >{item?.beds} Beds</Typography>
                                                    <HomeOutlined style={{color : '#d63031' , marginTop : '2px'}} />
                                                    <Typography className="innerDivText" >{item?.bedrooms} Bedrooms</Typography>
                                                </div>
                                                <Typography className="carouAdd" >{item?.address}</Typography>
                                            </div>
                                        </div>
                                    </>
                                ))
                            ) : (
                                <Typography className="NoRelatedFound" >No Related Properties Found</Typography>
                            )
                        }
                    </Carousel>
                </Col>
            </Row>
        </>
    )
}

export default MyCarousel