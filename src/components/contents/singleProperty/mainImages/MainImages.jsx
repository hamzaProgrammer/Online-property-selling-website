import React  , {useState , useEffect } from 'react'
import { Row, Col, Badge } from 'antd';
import './MainImages.css'
import {useParams} from 'react-router-dom'
import {getSingleProperty } from '../../../../server_api/Api'


const MainImages = () => {
    const [propertyData , setPropertyData ] = useState({})
    const [myText , setmyText ] = useState("")
    const {id} = useParams();
    useEffect(() => {
        const getData = async () => {
            const {data} = await getSingleProperty(id);
            setPropertyData(data?.Property)
            setmyText(data?.Property?.status)
        }
        getData();
    } ,[id])
    return (
        <>
            <Row style={{marginTop : '20px'}} >
                <Col xs={0} sm={0} md={0} lg={0}></Col>
                <Col xs={24} sm={{span : 20 , offset : 2}} md={{span : 18 , offset : 3}} >
                    <Row className="images" >
                        {
                            propertyData !== {} && (
                                    propertyData?.images?.length > 0 ? (
                                        <>
                                            <Col xs={24} sm={24} md={18} lg={18}>
                                                <Badge.Ribbon text={`for ${myText}`} color="#6c5ce7" className="ribbon" >
                                                    <div className="mainImage" >
                                                        <img alt="Property Pic" style={{width : '100%' , height : '100%', borderRadius : '10px' }} src={propertyData?.images[0]}  />
                                                    </div>
                                                </Badge.Ribbon>
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6}>
                                                <div className="rightImages" >
                                                    <img alt="Property Pic" style={{width : '100%' , height : '190px', borderRadius : '10px' , marginBottom: '10px'}} src={propertyData?.images[1]}  />
                                                    <img alt="Property Pic" style={{width : '100%' , height : '190px', borderRadius : '10px' }} src={propertyData?.images[2]}  />
                                                </div>
                                            </Col>
                                        </>
                                    ) : (
                                        <img alt="No Cover Content" style={{maxWidth : '100%' , minWidth : '100%' ,  height : '400px' , borderRadius : '10px' , marginBottom: '10px'}} src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png" />
                                    )
                            )
                        }
                    </Row>
                </Col>
                <Col xs={0} sm={0} md={0} lg={0} style={{background: 'red'}} ></Col>
            </Row>
        </>
    )
}

export default MainImages;