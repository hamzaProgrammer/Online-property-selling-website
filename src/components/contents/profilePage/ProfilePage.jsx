import React , {useState , useEffect} from 'react'
import { Row, Col ,Card , Typography , Form, Input, Button , Divider , Alert  } from 'antd';
import './ProfilePage.css'
import {MessageOutlined ,PhoneOutlined ,MailOutlined , HomeOutlined} from '@ant-design/icons'
import PropertySlider from './PropertySlider'
import {getAllSellPropertiesOfUser , getAllSoldPropertiesOfUser , getUserInfo} from '../../../server_api/Api'
import {useParams , useNavigate} from 'react-router-dom'

const ProfilePage = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [allSellproperties , setAllSellProperties ] = useState([]);
    const [allSoldproperties , setAllSoldProperties ] = useState([]);
    const [userInfo , setuserInfo ] = useState({});
    const [ userId , setuserId ] = useState(null)
    const {id} = useParams();
    const [isAdmin, setAdminLogin] = useState(false)
    const location = useNavigate();

   //checking if admin logged in or not
    useEffect(() => {
            const checkAdmin = () => {
            const user = JSON.parse(localStorage.getItem('profile'))
            setuserId(user?.Admin?.Id)
            if (user) {
                setAdminLogin(true)
            } else {
                setAdminLogin(false)
            }
            }
            checkAdmin();
    }, [location])

    useEffect(() => {
        // getting selling properties
            const getData = async () => {
                const {data} = await getAllSellPropertiesOfUser(id);
                setAllSellProperties(data?.Properties)
                console.log("gotting data : ", data)
            }
            getData();
    
            // getting sold properties
            const getSoldData = async () => {
                const {data} = await getAllSoldPropertiesOfUser(id);
                setAllSoldProperties(data?.Properties)
            }
            getSoldData();
    
            // getting sold properties
            const getUserData = async () => {
                const {data} = await getUserInfo(id);
                setuserInfo(data?.User)
            }
            getUserData();
    },[location])
  return (
    <>
        {
            !isAdmin && (
                <Alert message="Looks like You are not signed In , Please Sign in first to see your Profile." type="error" style={{marginBottom : '10px' , textAlign : 'center'}} />
            )
        }
        <Row >
            <Col xs={0} sm={0} md={0} lg={6} xl={6} >
                <Card bordered={false} className="userCard" >
                    <div className="userCardData" >
                        <img alt="user profile cover" className="userProfImage" src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?size=338&ext=jpg" />
                        <div className="subDetOfUser">
                            {
                                userInfo?.name ? (
                                    <Typography  className="nameOfUser">{userInfo?.name}</Typography>
                                ) : (
                                    <Typography  className="nameOfUser">N/A</Typography>
                                )
                            }
                            {/* <Typography  className="tagOfUser">Real Estate Manager at TurkEstates </Typography> */}
                        </div>
                        {/* <Typography className="contactTitle">Contact us</Typography>
                        <div style={{ width : '100%' }} >
                            <Form
                                name="basic"
                                layout="vertical"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                className="userProfForm"
                            >
                            <Form.Item
                                label="Email"
                                name="username"
                                type="email"
                                style={{fontWeight : 700 , color : 'red' , marginBottom : '5px' , width : '100%'}}
                            >
                                <Input className="userFormItem" />
                            </Form.Item>

                            <Form.Item
                                label="Name"
                                name="password"
                                style={{fontWeight : 700 , color : 'red' , marginBottom : '5px' , width : '100%'}}
                            >
                                <Input className="userFormItem" />
                            </Form.Item>

                            <Form.Item
                                label="Phone"
                                name="password"
                                style={{fontWeight : 700 , color : 'red' , marginBottom : '5px' , width : '100%'}}
                            >
                                <Input className="userFormItem" />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="password"
                                style={{fontWeight : 700 , color : 'red' , marginBottom : '5px' , width : '100%'}}
                            >
                                <Input className="userFormItem" style={{height : '70px'}} />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button block className="userFormBtn" >
                                    <MessageOutlined style={{fontSize :'17px'}} /> Send Message
                                </Button>
                            </Form.Item>
                            </Form>
                        </div> */}
                        <Divider style={{backgroundColor : '#dfe6e9' , marginTop : '0px'}} />
                        <div className="userContactDet" >
                            <Typography className="userNameTitle">Jhon's Peronel Info</Typography>
                        </div>
                    </div>
                    <Row style={{marginTop : '15px'}} >
                        <Col xs={4} >
                            <HomeOutlined style={{fontSize : '22px' , color : '#0984e3'}} />
                        </Col>
                        <Col xs={20} >
                            <div style={{display : 'flex' , justifyContent : 'flex-start' , flexDirection : 'column'}} >
                                <Typography style={{fontSize : '15px' , fontWeight : 600 , textAlign : 'left'}}>Address</Typography>
                                {
                                    userInfo?.name ? (
                                        <Typography style={{fontSize : '13px' , fontWeight : 600 , textAlign : 'left' , color : '#636e72'}}>{userInfo?.address}</Typography>
                                    ) : (
                                        <Typography style={{fontSize : '13px' , fontWeight : 600 , textAlign : 'left' , color : '#636e72'}}>N/A</Typography>
                                    )
                                }
                            </div>
                        </Col>
                    </Row>
                    <Row style={{marginTop : '15px'}} >
                        <Col xs={4} >
                            <PhoneOutlined style={{fontSize : '22px' , color : '#0984e3'}} />
                        </Col>
                        <Col xs={20} >
                            <div style={{display : 'flex' , justifyContent : 'flex-start' , flexDirection : 'column'}} >
                                <Typography style={{fontSize : '15px' , fontWeight : 600 , textAlign : 'left'}}>Phone Not</Typography>
                                {
                                    userInfo?.name ? (
                                        <Typography style={{fontSize : '13px' , fontWeight : 600 , textAlign : 'left' , color : '#636e72'}}>{userInfo?.phoneNo}</Typography>
                                    ) : (
                                        <Typography style={{fontSize : '13px' , fontWeight : 600 , textAlign : 'left' , color : '#636e72'}}>N/A</Typography>
                                    )
                                }
                            </div>
                        </Col>
                    </Row>
                    <Row style={{marginTop : '15px'}} >
                        <Col xs={4} >
                            <MailOutlined style={{fontSize : '22px' , color : '#0984e3'}} />
                        </Col>
                        <Col xs={20} >
                            <div style={{display : 'flex' , justifyContent : 'flex-start' , flexDirection : 'column'}} >
                                <Typography style={{fontSize : '15px' , fontWeight : 600 , textAlign : 'left'}}>Email</Typography>
                                {
                                    userInfo?.email ? (
                                        <Typography style={{fontSize : '13px' , fontWeight : 600 , textAlign : 'left' , color : '#636e72'}}>{userInfo?.email}</Typography>
                                    ) : (
                                        <Typography style={{fontSize : '13px' , fontWeight : 600 , textAlign : 'left' , color : '#636e72'}}>N/A</Typography>
                                    )
                                }
                            </div>
                        </Col>
                    </Row>
                    {
                        id !== userId && (
                            <div style={{display : 'flex' , justifyContent : 'flex-end' , alignItems : 'center' , marginBottom: '0px'}} >
                                <Button  type="link" style={{fontWeight : 600 , color : '#0984e3' , marginBottom:  '0px'}} href={`/editProfile/${userId}`} >Edit Profile</Button>
                            </div>
                        )
                    }
                </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={{span : 17 , offset : 1}} xl={{span : 17 , offset : 1}}>
                <div style={{backgroundColor : '#FFFFFF' , borderRadius : '10px'}} >
                    <Row  >
                        <Col xs={24} sm={8} md={12} lg={0} xl={0}  >
                            <div style={{paddingLeft : '10px' , paddingTop : '0px' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' , flexDirection : 'column'}} >
                                {
                                    userInfo?.profilePic ? (
                                        <img alt="User Profile Cover" className="userProfImg" src={userInfo?.profilePic} />
                                    ) : (
                                        <img alt="User Profile Cover" className="userProfImg" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
                                    )
                                }
                                <div className="subDetOfUser" >
                                    {
                                        userInfo?.name ? (
                                            <Typography  className="nameOfUserMini">{userInfo?.name}</Typography>
                                        ) : (
                                            <Typography  className="nameOfUserMini">N/A</Typography>
                                        )
                                    }
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={16} md={12} lg={0} xl={0} >
                            <div style={{display : 'flex' , justifyContent : 'center' ,alignItems : 'center', flexDirection : 'column' , paddingLeft : '15px'}} >
                                <Row style={{marginTop : '15px' , width : '100%'}} >
                                    <Col xs={2} sm={2} md={2}   >
                                        <HomeOutlined style={{fontSize : '22px' , color : '#0984e3'}} />
                                    </Col>
                                    <Col xs={{span : 21 , offset : 1}} sm={20} md={20} >
                                        <div style={{display : 'flex' , justifyContent : 'flex-start' , flexDirection : 'column'}} >
                                            <Typography style={{fontSize : '15px' , fontWeight : 600 , textAlign : 'left' , paddingLeft : '10px'}}>Address</Typography>
                                            {
                                                userInfo?.name ? (
                                                    <Typography style={{fontSize : '13px' , fontWeight : 600 , textAlign : 'left' , paddingLeft : '10px' , color : '#636e72'}}>{userInfo?.address}</Typography>
                                                ) : (
                                                    <Typography style={{fontSize : '13px' , fontWeight : 600 , textAlign : 'left' , paddingLeft : '10px' , color : '#636e72'}}>N/A</Typography>
                                                )
                                            }
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop : '15px' ,width : '100%'}}>
                                    <Col xs={2} sm={2} md={2} >
                                        <PhoneOutlined style={{fontSize : '22px' , color : '#0984e3'}} />
                                    </Col>
                                    <Col xs={{span : 21 , offset : 1}} sm={20} >
                                        <div style={{display : 'flex' , justifyContent : 'flex-start' , flexDirection : 'column'}} >
                                            <Typography style={{fontSize : '15px' , fontWeight : 600 , textAlign : 'left' , paddingLeft : '10px'}}>Phone Not</Typography>
                                            {
                                                userInfo?.phoneNo ? (
                                                    <Typography style={{fontSize : '13px' , fontWeight : 600 , textAlign : 'left' , paddingLeft : '10px',  color : '#636e72'}}>{userInfo?.phoneNo}</Typography>
                                                ) : (
                                                    <Typography style={{fontSize : '13px' , fontWeight : 600 , textAlign : 'left' , paddingLeft : '10px',  color : '#636e72'}}>N/A</Typography>
                                                )
                                            }
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop : '15px' , width : '100%'}} >
                                    <Col xs={2} sm={2} md={2} >
                                        <MailOutlined style={{fontSize : '22px' , color : '#0984e3'}} />
                                    </Col>
                                    <Col xs={{span : 21 , offset : 1}} sm={20} >
                                        <div style={{display : 'flex' , justifyContent : 'flex-start' , flexDirection : 'column'}} >
                                            <Typography style={{fontSize : '15px' , fontWeight : 600 , textAlign : 'left' ,paddingLeft : '10px'}}>Email</Typography>
                                            {
                                                userInfo?.email ? (
                                                    <Typography style={{fontSize : '13px' , fontWeight : 600 , textAlign : 'left' , paddingLeft : '10px' , color : '#636e72'}}>{userInfo?.email}</Typography>
                                                ) : (
                                                    <Typography style={{fontSize : '13px' , fontWeight : 600 , textAlign : 'left' , paddingLeft : '10px' , color : '#636e72'}}>N/A</Typography>
                                                )
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col xs={{span : 21 , offset : 1}} sm={{span : 22 , offset : 1}} md={{span : 22 , offset : 1}} lg={{span : 24 , offset : 0}} >
                        <PropertySlider selling={allSellproperties} sold={allSoldproperties} />
                    </Col>
                </Row>
            </Col>
        </Row>
    </>
  );
}

export default ProfilePage;