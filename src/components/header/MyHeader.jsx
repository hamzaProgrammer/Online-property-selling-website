import React, {useState , useEffect} from 'react'
import './MyNavbar.css'
import {Button, Typography, Dropdown, Menu, Drawer, Collapse, Modal, Form, Input, Divider, Alert , notification  } from 'antd';
import {MenuOutlined ,CloseOutlined ,FacebookOutlined , GoogleOutlined} from '@ant-design/icons'
import {Link , useNavigate} from 'react-router-dom'

const { Panel } = Collapse;
function callback(key) {
  console.log(key);
}

const Navbar = () => {
    const [modalVisible , setModalVisible ] = useState(false);
    const [isError , setIsError ] = useState(true);
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const rentMenu = (
    <Menu>
        <Menu.Item className="rentDropDown" >
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            Post a Rental Listing
        </a>
        </Menu.Item>
    </Menu>
    );
    const mortageMenu = (
    <Menu>
        <Menu.Item className="rentDropDown" >
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                Mortage Overview
            </a>
        </Menu.Item>
        <Menu.Item className="rentDropDown" >
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                Get pre-Qualified
            </a>
        </Menu.Item>
        <Menu.Item className="rentDropDown" >
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                Mortage Rates
            </a>
        </Menu.Item>
        <Menu.Item className="rentDropDown" >
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                Finance Rates
            </a>
        </Menu.Item>
        <Menu.Item className="rentDropDown" >
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                Mortage Calculator
            </a>
        </Menu.Item>
    </Menu>
    );
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [user, setUser ] = useState("")
    const location = useNavigate();
    const [myUser, setMyUser ] = useState("")


    //checking if admin logged in or not
    useEffect(() => {
        const checkAdmin = () => {
            const user = JSON.parse(localStorage.getItem('profile'))
            setMyUser(user?.User?._id)
            if (user) {
                setUser(user?.Admin?.Id)
            } else {
                setUser("")
            }
        }
        checkAdmin();
    }, [location])

    // navigating towards saved searches page
    const handleSavedSearches = async () => {
        if(user === ""){
            openNotification();
        }else{
            location(`/getAllUserSavedSearches/${myUser}`)
        }
    }

    // navigating towards cities properties sell only
    const handleSellHomes = async () => {
        location(`/allSellHomes/izmir`)
    }

    // navigating towards cities properties rent only
    const handleRentHomes = async () => {
        location(`/allRentHomes/izmir`)
    }

    // navigating towards sign in page
    const handleSignIn = async () => {
        if(user === ""){
            location(`/signin`)
        }else{
            openNotification();
        }
    }

    // logging out
    const handleSignOut = () => {
        localStorage.removeItem("profile");
        window.location.reload();
    }

    const openNotification = (type ) => {
        notification.open({
            message: 'Please Sign In or Sign Up First.',
            description: <Button href="/signin" type="link" ghost style={{color : '#e17055'}} >Sign In Now</Button>
        });
    };

    // navigating towards profile page
    const handleMyProfile = async () => {
        if(user !== ""){
            location(`/profile/${myUser}`)
        }else{
            openNotification();
        }
    }

    // navigating towards all saved homes page
    const handleSavedHomes = async () => {
        if(user !== ""){
            location(`/allSavedProperties/${myUser}`)
        }else{
            openNotification();
        }
    }

    return(
        <>
            <div className="main_navbar" >
                <div className="logo">
                <Link to="/">
                    <Typography className="myLogo" >trulia</Typography>
                </Link>
                </div>
                <div className="all_btns"  >
                    <Button className="btn hide" size="medium" onClick={handleSellHomes}  >Buy</Button>
                    <Button className="btn" onClick={handleRentHomes}  >Rent</Button>
                    <Dropdown className="hide" overlay={mortageMenu} placement="bottomLeft">
                        <Button className="btn btnMortage" >Invest</Button>
                    </Dropdown>
                </div>
                <div className="all_btns newBtns">
                    <Button className="btn rightBtn hide" size="medium" onClick={handleSavedHomes} >Saved Homes</Button>
                    <Button className="btn rightBtn hide" size="medium" onClick={handleSavedSearches}  >Saved Searches</Button>
                    {
                        user === "" ? (
                            <Button className="btn loginBtn" size="medium" onClick={handleSignIn}  >Sign up or Log in</Button>
                        ) : (
                            <Button className="btn loginBtn" size="medium" onClick={handleSignOut}  >Sign Out</Button>
                        )
                    }
                    <MenuOutlined onClick={showDrawer} className="menuIcon"  />
                </div>
            </div>

            <Drawer width={250}
                    closable={false}  placement="right" color="primary" bodyStyle={{ backgroundColor: "#3B4144", padding: "0" , width : "100%"}}  onClose={onClose} visible={visible}>
                <div className="drawer" >
                    <Collapse  onChange={callback} className="collapse" ghost expandIconPosition="right">
                        <Button block className="MyProf" onClick={handleMyProfile} >Profile</Button>
                        <Panel header="Buy" key="8" className="panel" >
                        </Panel>
                        <Panel header="Rent" key="2">
                            <Menu className="accord" >
                                <Menu.Item>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com" style={{color : '#FFFFFF'}} >
                                    Post a Rental Listing
                                </a>
                                </Menu.Item>
                            </Menu>
                        </Panel>
                        <Panel header="Mortage" key="3">
                            <Menu className="accord">
                                <Menu.Item  >
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com" style={{color : '#FFFFFF'}}>
                                        Mortage Overview
                                    </a>
                                </Menu.Item>
                                <Menu.Item  >
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com" style={{color : '#FFFFFF'}}>
                                        Get pre-Qualified
                                    </a>
                                </Menu.Item>
                                <Menu.Item  >
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com" style={{color : '#FFFFFF'}}>
                                        Mortage Rates
                                    </a>
                                </Menu.Item>
                                <Menu.Item  >
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com" style={{color : '#FFFFFF'}}>
                                        Finance Rates
                                    </a>
                                </Menu.Item>
                                <Menu.Item  >
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com" style={{color : '#FFFFFF'}}>
                                        Mortage Calculator
                                    </a>
                                </Menu.Item>
                            </Menu>
                        </Panel>
                        <Panel header="Local Info" key="4">
                            <Menu className="accord" >
                                <Menu.Item>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com" style={{color : '#FFFFFF'}} >
                                    Al trulia Neighbour Guide
                                </a>
                                </Menu.Item>
                            </Menu>
                        </Panel>
                        <Panel header="Additional Resources" key="5">
                            <Menu className="accord">
                                <Menu.Item  >
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com" style={{color : '#FFFFFF'}}>
                                        Trulia Blogs
                                    </a>
                                </Menu.Item>
                                <Menu.Item  >
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com" style={{color : '#FFFFFF'}}>
                                        Help center
                                    </a>
                                </Menu.Item>
                                <Menu.Item  >
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com" style={{color : '#FFFFFF'}}>
                                        Get Leads by Zip
                                    </a>
                                </Menu.Item>
                                <Menu.Item  >
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com" style={{color : '#FFFFFF'}}>
                                        Get Mortage Leads
                                    </a>
                                </Menu.Item>
                            </Menu>
                        </Panel>
                        <Button block className="show">Saved Homes</Button>
                        <Button block className="show">Saved Searches</Button>
                        <Button block className="show">Sign up or Log in</Button>
                    </Collapse>
                </div>
            </Drawer>

            <Modal
                title="Sign Up or Log in"
                className="modal"
                visible={modalVisible}
                footer={null}
                zIndex="500"
                closeIcon={<CloseOutlined style={{fontSize : '20px' , color : 'crimson'}} />}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
            >
                <Form
                    name="basic"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={{marginTop : '-15px'}}
                    >
                    {
                        isError && (
                            <Alert message="Email is InCorrect" type="error" closable={true} />
                        )
                    }
                    <Form.Item
                        label="Email"
                        name="email"
                        style={{color : 'red' , fontWeight : 600 , fontSize : '18px'}}
                    >
                        <Input className="inputField" size="large" />
                    </Form.Item>
                    <Form.Item >
                        <Button block size="medium" className="btn subtBtn">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <Divider  >OR</Divider>
                <Button block size="medium" icon={<FacebookOutlined style={{color : '#FFFFFF' , border : 'none' , fontSize : '20px'}} />} className="btn fbBtn">
                    Continue with Facebook
                </Button>
                <Button block size="medium" icon={<GoogleOutlined style={{background : '#FFFFFF' , color : '#c23616' ,  border : 'none' , fontSize : '20px'}} />} className="btn googleBtn">
                    Continue with Google
                </Button>
            </Modal>
        </>
    )
}

export default Navbar;