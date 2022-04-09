import React , {useState , useEffect } from 'react'
import { Row, Col,Typography, Button, Tabs, Form, Input, Alert  , Spin } from 'antd';
import './Details.css'
import {HomeOutlined} from '@ant-design/icons'
import {useParams , Link} from 'react-router-dom'
import {getSingleProperty , sendMailForChatting} from '../../../../server_api/Api'
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    InfoWindow,
} from '@react-google-maps/api'

const { TabPane } = Tabs;

const sendInit = {
    email : '',
    phoneNo : '',
    message : '',
    url : ''
}

const Details = () => {
    const [propertyData , setPropertyData ] = useState({})
    const [isUser , setIsUser ] = useState(false)
    const [isError , setIsError ] = useState(false)
    const [isSuccess , setIsSuccess ] = useState(false)
    const [isMsg , setIsMsg ] = useState("")
    const [userSendData  , setUserData ] = useState(sendInit)
    const {id} = useParams();
    const url = window.location.href;

    // google map
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDbvQuvGbCB0ghywwsM2tjlKBIPfXUSpHg",
    })
    const mapStyles = {
        height: "300px",
        minWidth: "100%",
        marginBottom : "20px"
    };
    const [ isSpinning , setIsSpinning ] = useState(false)
    const [ defaultCenter , setDefaultCenter ] = useState()
    const [ selected, setSelected ] = useState(true);
    const [ loading , setloading ] = useState(false);
    const onSelect = item => {
        setSelected(true);
    }

    // getting coordinates of current cities
    useEffect(() => {
        if(propertyData?.coordinates?.length > 0 ){
            setIsSpinning(true);
            setDefaultCenter({lat: propertyData?.coordinates[0],lng : propertyData?.coordinates[1]})
            setIsSpinning(false);
        }
    },[propertyData?.coordinates  ])


    // for sending mail to user
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const getData = async () => {
            const {data} = await getSingleProperty(id);
            setPropertyData( data?.Property)
        }
        getData();

    },[id])

    //checking if admin logged in or not
    useEffect(() => {
        const checkAdmin = () => {
            const user = JSON.parse(localStorage.getItem('profile'))
            if (user) {
            setIsUser(true)
            setUserData({...userSendData , url : url });
            } else {
            setIsUser(false)
            }
        }
        checkAdmin();
    },[id])

    // send message
    const SendMessage = async () => {
        setIsError(false);
        setIsSuccess(false);
        setIsMsg("");

        if(userSendData?.email === "" || userSendData?.phoneNo === "" || userSendData?.message === "" || userSendData?.url === "" ){
            setIsError(true);
            setIsMsg("Please fill All Required Fields");
            return;
        }

        setloading(true)
        const {data} = await sendMailForChatting(userSendData , propertyData.properiter );
        if(data?.success === true){
            setIsSuccess(true);
            setIsMsg(data?.message);
        }else{
            setIsError(true);
            setIsMsg(data?.message);
        }
        setloading(false)

    }

    return (
        <>
            <Row style={{marginTop : '20px'}} >
                <Col xs={0} sm={0} md={0} lg={0}></Col>
                <Col xs={{span : 22 , offset : 2}} sm={{span : 20 , offset : 2}} md={{span : 18 , offset : 3}} lg={{span : 22 , offset : 2}} >
                    <Row >
                        <Col xs={24} sm={24} md={24} lg={16} >
                            <Spin spinning={isSpinning} >
                                <Row className="mainSec" >
                                        {
                                            propertyData !== {} ? (
                                                    <>
                                                        <Col xs={24}  sm={17} className="myClass" >
                                                            <div className="mainDetails" >
                                                                <Typography className="Myhead" style={{color : '#2d3436 !important'}} >{propertyData?.name}</Typography>
                                                                <Typography className="textOne" >{propertyData?.address}</Typography>
                                                                <div style={{display : 'flex', minWidth : '300px' , justifyContent : 'space-between' , width : '250px' , marginBottom : '15px'}} >
                                                                    <Typography style={{fontSize : '15px' , fontWeight : 600 , color : '#636e72'}} >{propertyData?.beds} Beds</Typography>
                                                                    <HomeOutlined  style={{color : '#d63031' , marginTop : '2px'}} />
                                                                    <Typography style={{fontSize : '15px' , fontWeight : 600 , color : '#636e72'}} >{propertyData?.bedrooms} bedrooms</Typography>
                                                                    <HomeOutlined style={{color : '#d63031' , marginTop : '2px'}} />
                                                                    <Typography style={{fontSize : '15px' , fontWeight : 600 , color : '#636e72'}} >{propertyData?.baths} Baths</Typography>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col xs={24} sm={7} >
                                                            <div className="rightSec"  >
                                                                <Typography className="rightHead" >${propertyData?.price}</Typography>
                                                                {/* <Button className="rightBtnOne">Get Pre-Qualified</Button> */}
                                                            </div>
                                                        </Col>
                                                    </>
                                            ) : (
                                                <Typography className="NoContentText" >No Data Found</Typography>
                                            )
                                        }
                                        <div className="map">
                                            {
                                                propertyData !== {} ? (
                                                    propertyData?.coordinates && (
                                                        propertyData?.coordinates.length > 0  && (
                                                            <GoogleMap
                                                                mapContainerStyle={mapStyles}
                                                                zoom={13}
                                                                center={defaultCenter}
                                                                scrollwheel = {false}
                                                                streetViewControl = {false}
                                                                mapTypeControl = {false}
                                                            >
                                                                {

                                                                    <Marker key={propertyData?.name}
                                                                        position={defaultCenter}
                                                                        onClick={() => onSelect(true)}
                                                                    >
                                                                        {
                                                                            selected && (
                                                                                <InfoWindow
                                                                                    position={defaultCenter}
                                                                                    clickable={true}
                                                                                    onCloseClick={() => setSelected(false)}
                                                                                >
                                                                                    <div style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , flexDirection : 'column' , width : '150px'}} >
                                                                                        <img alt="property cover" width="100%" height="70" src={propertyData?.images[0]} style={{objectFit : 'cover' , }} />
                                                                                        <Typography style={{fontSize: '15px' , fontWeight : 600  }} >{propertyData?.name}</Typography>
                                                                                        <Typography style={{fontSize: '12px' , paddingTop : '10px'  }} >{propertyData?.address}</Typography>
                                                                                    </div>
                                                                                </InfoWindow>
                                                                            )
                                                                        }
                                                                    </Marker>
                                                                }
                                                            </GoogleMap>
                                                        )
                                                    )
                                                ) : (
                                                    <Typography style={{fontSize : '22px' , marginTop : '15px' , fontWeight : 700, textAlign : 'center'}} >Could Not Found Location of Property</Typography>
                                                )
                                            }
                                        </div>
                                </Row>
                            </Spin>
                        </Col>
                        <Col xs={24} sm={24} md={23} lg={8} className="myTabs" >
                            <Tabs defaultActiveKey="1"  type="card" centered={true} style={{fontWeight : 700 , color : '#2d3436' ,  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' , paddingTop : '7px' , borderRadius : '10px'}} >
                                <TabPane tab="Contact Properiter" key="2" >
                                    <div className="sheduleTab" >
                                        <Form
                                            className="form"
                                            name="basic"
                                            layout="vertical"
                                            labelCol={{
                                                span: 8,
                                            }}
                                            wrapperCol={{
                                                span: 16,
                                            }}
                                            initialValues={{
                                                remember: true,
                                            }}
                                            onFinish={onFinish}
                                            onFinishFailed={onFinishFailed}
                                            autoComplete="off"
                                        >
                                        <Form.Item
                                            label="Phone No. "
                                            name="username7"
                                            style={{marginBottom : '5px' , minWidth : '100%'}}
                                        >
                                            <Input prefix="+90" type="number" className="input" value={userSendData?.phoneNo} name="phoneNo" onChange={(e) => setUserData({...userSendData , [e.target.name] : e.target.value })}  />
                                        </Form.Item>

                                        <Form.Item
                                            label="Your Email"
                                            name="password"
                                        >
                                            <Input className="input" type="text" value={userSendData?.email} name="email" onChange={(e) => setUserData({...userSendData , [e.target.name] : e.target.value })}  />
                                        </Form.Item>

                                        <Form.Item
                                            label="Message"
                                            name="username"
                                            style={{ marginTop : '-10px'}}
                                        >
                                            <Input className="input" style={{height : '100px'}} value={userSendData?.message} name="message" onChange={(e) => setUserData({...userSendData , [e.target.name] : e.target.value })}  />
                                        </Form.Item>

                                        <Form.Item
                                            wrapperCol={{
                                            offset: 8,
                                            span: 16,
                                            }}
                                        >
                                        {
                                            isError && (
                                                <Alert className="notLoggedText" style={{marginBottom : '10px' , marginRight : '10px'}} message={isMsg} type="error" showIcon closable />
                                            )
                                        }
                                        {
                                            isSuccess && (
                                                <Alert className="notLoggedText" style={{marginBottom : '10px' , marginRight : '10px'}} message={isMsg} type="success" showIcon closable />
                                            )
                                        }
                                            {
                                                propertyData !== {} && (
                                                    isUser === false ? (
                                                        <Link to="/signin">
                                                            <Typography className="notLoggedText" >Please Login to Continue</Typography>
                                                        </Link>
                                                    ) : (
                                                        <Spin spinning={loading}>
                                                            <Button className="submitBtn" block onClick={SendMessage} >
                                                                Send Request
                                                            </Button>
                                                        </Spin>
                                                    )
                                                )
                                            }
                                        </Form.Item>
                                        </Form>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Col>
                <Col xs={0} sm={0} md={0} lg={0} style={{background: 'red'}} ></Col>
            </Row>
        </>
    )
}

export default Details;