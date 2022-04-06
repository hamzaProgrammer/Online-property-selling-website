import React  , {useState , useEffect } from 'react'
import { Row, Col, Typography, Carousel  } from 'antd';
import './Carousel.css'
import {HomeOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import {getSingleProperty , getRelatedProperties} from '../../../../server_api/Api'


function onChange(a, b, c) {
  console.log(a, b, c);
}
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
    
    const [propertyData , setPropertyData ] = useState({})
    const [relatedPropData , setrelatedPropData ] = useState([])
    const {id} = useParams();
    useEffect(() => {
        const getData = async () => {
            const {data} = await getSingleProperty(id);
            setPropertyData( data?.Property)
        }
        getData();
        if(propertyData !== {}){
            const getRelatedData = async () => {
                const {data} = await getRelatedProperties(propertyData?.city , propertyData?.properiter);
                setrelatedPropData(data?.Property)
            }
            getRelatedData();
        }
    } ,[id])
    return(
        <>
            <Row>
                <Col xs={{span : 19 , offset : 2}} sm={{span : 20 , offset : 2}} md={{span : 22 , offset : 1}} lg={{span : 20 , offset : 2}}>
                    <Carousel afterChange={onChange} effect="fade" arrows {...settings} >
                        <div>
                            <div className="myCarDivv" >
                                <div className="CarItem" >
                                    <Link to={`/singleProperty/}`}>
                                        <img alt="cover" style={{borderRadius : '20px'}} className="carImage" src="https://images.unsplash.com/photo-1649180932566-e0b810483b55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" />
                                    </Link>
                                    <div className="carouselDiv" >
                                        <Typography className="carouPrice" >${relatedPropData[0][0]?.price}</Typography>
                                        <div className="innerDiv" >
                                            <Typography className="innerDivText" >{relatedPropData[0][0]?.baths} Baths</Typography>
                                            <HomeOutlined  style={{color : '#d63031' , marginTop : '2px'}} />
                                            <Typography className="innerDivText" >{relatedPropData[0][0]?.beds} Beds</Typography>
                                            <HomeOutlined style={{color : '#d63031' , marginTop : '2px'}} />
                                            <Typography className="innerDivText" >{relatedPropData[0][0]?.bedrooms} Bedrooms</Typography>
                                        </div>
                                        <Typography className="carouAdd" >{relatedPropData[0][0]?.address}</Typography>
                                    </div>
                                </div>
                                <div className="CarItem" >
                                    <Link to={`/singleProperty/}`}>
                                        <img alt="cover" style={{borderRadius : '20px'}} className="carImage" src="https://images.unsplash.com/photo-1649180932566-e0b810483b55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" />
                                    </Link>
                                    <div className="carouselDiv" >
                                        <Typography className="carouPrice" >${relatedPropData[1][0]?.price}</Typography>
                                        <div className="innerDiv" >
                                            <Typography className="innerDivText" >{relatedPropData[1][0]?.baths} Baths</Typography>
                                            <HomeOutlined  style={{color : '#d63031' , marginTop : '2px'}} />
                                            <Typography className="innerDivText" >{relatedPropData[1][0]?.beds} Beds</Typography>
                                            <HomeOutlined style={{color : '#d63031' , marginTop : '2px'}} />
                                            <Typography className="innerDivText" >{relatedPropData[1][0]?.bedrooms} Bedrooms</Typography>
                                        </div>
                                        <Typography className="carouAdd" >{relatedPropData[1][0]?.address}</Typography>
                                    </div>
                                </div>
                                <div className="CarItem" >
                                    <Link to={`/singleProperty/}`}>
                                        <img alt="cover" style={{borderRadius : '20px'}} className="carImage" src="https://images.unsplash.com/photo-1649180932566-e0b810483b55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" />
                                    </Link>
                                    <div className="carouselDiv" >
                                        <Typography className="carouPrice" >${relatedPropData[2][0]?.price}</Typography>
                                        <div className="innerDiv" >
                                            <Typography className="innerDivText" >{relatedPropData[2][0]?.baths} Baths</Typography>
                                            <HomeOutlined  style={{color : '#d63031' , marginTop : '2px'}} />
                                            <Typography className="innerDivText" >{relatedPropData[2][0]?.beds} Beds</Typography>
                                            <HomeOutlined style={{color : '#d63031' , marginTop : '2px'}} />
                                            <Typography className="innerDivText" >{relatedPropData[2][0]?.bedrooms} Bedrooms</Typography>
                                        </div>
                                        <Typography className="carouAdd" >{relatedPropData[2][0]?.address}</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </Carousel>
                </Col>
            </Row>
        </>
    )
}

export default MyCarousel