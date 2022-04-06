import React , {useState , useEffect} from 'react'
import { Row, Col ,Typography , Carousel , Pagination , Menu , Dropdown , Checkbox, Drawer , Button , Spin , Input , AutoComplete , message } from 'antd';
import '../cityProperties/properties/Properties.css'
import { DownOutlined ,MenuOutlined } from '@ant-design/icons'
import GoogleMapReact from 'google-map-react';
import {Link , useParams , useNavigate , useLocation } from 'react-router-dom'
import {getAllRentPropertiesOfCity , getAllRentPropertiesOfCityByUsers , getAllRentPropertiesOfCityByAdmin , addNewSavedSearch } from '../../../server_api/Api'
import '../cityProperties//filterBtns/FilterBtns.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed , faBath  , faRestroom } from '@fortawesome/free-solid-svg-icons'
import '../allRentHomes/AllRentHomes.css'


const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Properties = () => {
    const { Search } = Input;
    const [ isSpinning , setIsSpinning ] = useState(false)
    const [ isSaved , setIsSaved ] = useState(false)
    // for drawer
    const [visible, setVisible] = useState(false);

    const location = useNavigate();
    const [userId , setUserId ] = useState("")
    const {search} = useLocation();

   //checking if admin logged in or not
    useEffect(() => {
        const checkAdmin = () => {
            const user = JSON.parse(localStorage.getItem('profile'))
            if (user) {
                setUserId(user?.Admin?.Id)
            } else {
                setUserId("")
            }
        }
        checkAdmin();

        setIsSpinning(true);
        setIsSaved(false)
        axios.get("http://localhost:8080/api/properties/getAllSellPropertiesFilters" + `${search}`)
        .then(function (response) {
            setProperties(response?.data?.AllProperties)
        })
        .catch(function (error) {
            console.log( "got error : " , error);
        })
        setIsSpinning(false);
    }, [location, search])


    const openDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

  // for checkbox
    const  changeHomeType = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }
    const minPrice = (
        <Menu className="priceRngMenu" >
            <Menu.Item className="priceRngMenuItem" onClick={() => setMyMinprice(10000) } >
                10,000($)
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" onClick={() => setMyMinprice(50000) } >
                50,000 ($)
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" onClick={() => setMyMinprice(100000) } >
                1,00,000 ($)
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" onClick={() => setMyMinprice(250000) } >
                2,50,000 ($)
            </Menu.Item>
        </Menu>
    )
    const maxPrice = (
        <Menu className="priceRngMenu" >
            <Menu.Item className="priceRngMenuItem" >
                950 ($)
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                1200 ($)
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                2500 ($)
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                5000 ($)
            </Menu.Item>
        </Menu>
    )
    // price menu
    const priceMenu = (
        <div className="priceRanger" >
        <Typography  className="priceRangerHead">Select Price Range</Typography>
        <div className="priceDrop">
            <Dropdown overlay={minPrice} className="inputPrice" placement="bottomLeft" arrow >
                <Button>Min <DownOutlined style={{fontSize : '15px' , fontWeight : 700}} /></Button>
            </Dropdown>
            <Dropdown overlay={maxPrice} className="inputPrice" placement="bottomLeft" arrow >
                <Button>Max <DownOutlined style={{fontSize : '15px' , fontWeight : 700}} /></Button>
            </Dropdown>
        </div>
        </div>
    );

    //bedroom menu
    const bedRoomMenu = (
        <Menu className="priceRngMenu bedRooms"  >
            <Menu.Item className="priceRngMenuItem" value="1" onClick={() => setMyBeds(1) } >
                1
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" value="2" onClick={(e) => setMyBeds(2) } >
                2
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" value="3" onClick={(e) => setMyBeds(3) } >
                3
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" value="4" onClick={(e) => setMyBeds(4) } >
                4+
            </Menu.Item>
        </Menu>
    )

    // all home types menu
    const HomeTypesMenu = (
        <Menu className="priceRngMenu"  >
            <Menu.Item className="priceRngMenuItem" >
                <Checkbox onChange={changeHomeType} className="homeCheckBox" onClick={() => setMyHouseType("Townhome") }  >Townhome</Checkbox>
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                <Checkbox onChange={changeHomeType} className="homeCheckBox" onClick={() => setMyHouseType("Village") }>Village</Checkbox>
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                <Checkbox onChange={changeHomeType} className="homeCheckBox" onClick={() => setMyHouseType("Multifamily") }>Multifamily</Checkbox>
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                <Checkbox onChange={changeHomeType} className="homeCheckBox" onClick={() => setMyHouseType("land") }>Land</Checkbox>
            </Menu.Item>
        </Menu>
    )

    const defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        location : {
            address: '1600 Amphitheatre Parkway, Mountain View, california.',
        },
        zoom: 11,
    };

    const [allProperties , setProperties] = useState([])
    const {url} = useParams();
    const [ myurl , setmyurl ] = useState(url)
    const [ newUrl , setNewUrl ] = useState(url);
    const [ beds , setBeds ] = useState(0);
    const [ minMyPrice , setMinPrice ] = useState(0);
    const [ houseTyp , sethouseTyp ] = useState('');

    // for setting bedrooms
    const setMyBeds = (value) => {
        // setIsSpinning(true);
        // if (window.location.href.indexOf("bedrooms") > -1) {
        //     setBeds(value)
        // }else{
        //     if(newUrl.length > 0){
        //         setNewUrl(`&bedrooms=${value}`)
        //     }else{
        //         setNewUrl(`bedrooms=${value}`)
        //     }
        //     setBeds(value)
        // }
        // setIsSpinning(false);
    }

    // for setting minPrice
    const setMyMinprice = (value) => {
        // setIsSpinning(true);
        // if (window.location.href.indexOf("minPrice") > -1) {
        //     setMinPrice(value)
        // }else{
        //     if(newUrl.length > 0){
        //         setNewUrl(`&minPrice=${value}`)
        //     }else{
        //         setNewUrl(`minPrice=${value}`)
        //     }
        //     setMinPrice(value)
        // }
        // setIsSpinning(false);
    }

    // for setting house type
    const setMyHouseType = (value) => {
        // setIsSpinning(true);
        // if (window.location.href.indexOf("houseType") > -1) {
        //     sethouseTyp(value)
        // }else{
        //     if(newUrl.length > 0){
        //         setNewUrl(`&houseType=${value}`)
        //     }else{
        //         setNewUrl(`houseType=${value}`)
        //     }
        //     sethouseTyp(value)
        // }
        // setIsSpinning(false);
    }

    // gettng data for first time
    useEffect(() => {
        // setIsSpinning(true);
        // setIsSaved(false)
        // const geturlData = async () => {
        //     const {data} = await getAllRentPropertiesOfurl(myurl);
        //     setProperties(data?.AllProperties)
        //     setIsSpinning(false);
        // }
        // geturlData();
    },[myurl])

    // filtering products
    useEffect(() => {
        // setIsSpinning(true);
        // setIsSaved(false)
        // axios.get("http://localhost:8080/api/properties/getAllSellPropertiesFilters?" + `url=${myurl}` + "&" + `${newUrl}`)
        // .then(function (response) {
        //     setProperties(response?.data?.AllProperties)
        // })
        // .catch(function (error) {
        //     console.log( "got error : " , error);
        // })
        // setIsSpinning(false);
    },[newUrl])

    // getting all userrs listing done in that url
    const getUsersData = async () => {
        // setIsSpinning(true);
        // setIsSaved(false)
        // const {data} = await getAllRentPropertiesOfurlByUsers(myurl);
        //     setProperties(data?.AllProperties)
        //     setIsSpinning(false);
    }

    // getting all admin listing done in that url
    const getAdminsData = async () => {
        // setIsSpinning(true);
        // setIsSaved(false)
        // const {data} = await getAllRentPropertiesOfurlByAdmin(myurl);
        // setProperties(data?.AllProperties)
        // setIsSpinning(false);
    }

    // searching Cities
    const onSearch = (value) => {
        // setIsSpinning(true);
        // setIsSaved(false)
        // const getData = async () => {
        //     let newValue = value.toLowerCase();
        //     setmyurl(newValue)
        //     const {data} = await getAllRentPropertiesOfurl(newValue);
        //     setProperties(data?.AllProperties)
        //     setIsSpinning(false);
        // }
        // getData();
    }
    // for search buttton
    const options = [
        {label: 'Izmir', value: 'Izmir'}, 
        {label: 'Istanbul', value: 'Istanbul'},
        {label: 'Ankara', value: 'Ankara'}, 
        {label: 'Roka', value: 'Roka'},
        {label: 'Anarkali', value: 'Anarkali'}
    ]

    // messages
    const success = () => {
        message.success('Search Saved SuccessFully');
    };
    const error = () => {
        message.error('Saved Search Already Exists');
    };
    const LoginError = () => {
        message.error('Please Sign In First to Save Search');
    };

    // saving search
    const saveSearch = async () => {
        // if(userId === ""){
        //     LoginError();
        // }else{
        //     let sendUrl = "";
        //     if(newUrl === ""){
        //         sendUrl = "http://localhost:8080/api/properties/getAllSellPropertiesFilters?" + `url=${myurl}`;
        //     }else{
        //         sendUrl = "http://localhost:8080/api/properties/getAllSellPropertiesFilters?" + `url=${myurl}` + "&" + `${newUrl}`;
        //     }
        //     const {data} = await addNewSavedSearch({ user : userId  , savedSearch : sendUrl});

        //     if(data?.success === true){
        //         success();
        //         setIsSaved(true)
        //     }else{
        //         error();
        //     }
        // }
    }

    return (
        <>
            <Row>
                <Col xs={1} sm={1} md={4} lg={6} xl={6} ></Col>
                <Col xs={22} sm={22} md={16} lg={12} xl={12} >
                    <div className="sellSearchSection" >
                        <Typography className="SearchText" >Change Location</Typography>
                        <AutoComplete
                            options={options}
                            onSelect={(value)=> {
                                onSearch(value)
                            }}
                            className="searchurl"
                        >
                            <Search placeholder="Search Any url" size="large"  onSearch={onSearch} enterButton />
                        </AutoComplete>
                    </div>
                </Col>
                <Col xs={1} sm={1} md={4} lg={6} xl={6} ></Col>
            </Row>

            <Row style={{boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' , height : '60px'}} >
                <Spin spinning={isSpinning} >
                    <Col xs={24} sm={20} md={20} lg={15} >
                        <div className="filterButtons" >
                            <Button className="filterBtn" onClick={getUsersData}  >Users Listings</Button>
                            <Button className="filterBtn dull hideDull otherBtn" onClick={getAdminsData} >Our Listings</Button>
                            <Dropdown overlay={priceMenu} className="filterBtn filterHideSec" placement="bottomLeft" arrow >
                                <Button>Any Price <DownOutlined style={{fontSize : '15px' , fontWeight : 700}} /></Button>
                            </Dropdown>
                            <Dropdown overlay={bedRoomMenu} className="filterBtn filterHideFirst" placement="bottomLeft" arrow >
                                <Button>Bedrooms <DownOutlined style={{fontSize : '15px' , fontWeight : 700}} /></Button>
                            </Dropdown>
                            <Dropdown overlay={HomeTypesMenu} className="filterBtn filterHideFirst" placement="bottomLeft" arrow >
                                <Button>Home Types <DownOutlined style={{fontSize : '15px' , fontWeight : 700}} /></Button>
                            </Dropdown>
                            <Button className="filterBtn borderBtn filterHideFirst hideSearch" disabled={isSaved} onClick={saveSearch} >Save Search</Button>
                            <MenuOutlined className="filterMenu" onClick={openDrawer} />
                        </div>
                    </Col>
                </Spin>
            </Row>

            <Row style={{marginTop : '20px'}} >
                    <Col xs={24} sm={24} md={{span : 22 , offset : 1}} lg={{span : 12 , offset : 0}} xl={{span: 12, offset : 1}} style={{marginBottom : '15px'}} >
                        <Spin spinning={isSpinning} >
                            <Typography className="propertyLeftSideHead" >All Properties Available For Rent in  are </Typography>
                            {
                                allProperties?.length > 1 && (
                                    <Typography className="propertyLeftSideSubHead" >{allProperties?.length} Properties Available</Typography>
                                )
                            }
                            {
                                ( ( allProperties?.length > 0 ) & ( allProperties?.length < 2 ) ) && (
                                    <Typography className="propertyLeftSideSubHead" >{allProperties?.length} Properties Available</Typography>
                                )
                            }
                            {
                                allProperties?.length < 1  && (
                                    <Typography className="propertyLeftSideSubHead" >No Properties Available</Typography>
                                )
                            }
                        </Spin>
                        <Spin spinning={isSpinning} >
                        {
                            allProperties?.length > 0 ? (
                                <>
                                <Row>
                                {
                                        allProperties?.map((item) => (
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12} >
                                            <div className="propertyLeftSide" >
                                                <div className="leftSideProperties" >
                                                    <div className="property" >
                                                        <Carousel className="caro" >
                                                        {
                                                            item?.images?.map((immg) => (
                                                                <div key={immg} >
                                                                    <img className="carrImagee" style={{borderRadius : '10px' , objectFit : 'cover'}} src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" width="100%" height="130" alt="Slider Cover" />
                                                                </div>
                                                            ))
                                                        }
                                                        </Carousel>
                                                        <Link to={`/singleProperty/${item?._id}`}>
                                                                <div className="propDetail" >
                                                                    <Typography className="propPrice" >${item?.price}</Typography>
                                                                </div>
                                                                <div style={{display : 'flex' , justifyContent : 'space-between' , alignItems : 'center' ,  minWidth : '220px'}}>
                                                                    <Typography className="innerDivText" style={{fontWeight : 600 , fontSize : '13px'}}>{item?.baths} Baths</Typography>
                                                                    <FontAwesomeIcon icon={faBath} color="#e17055" size="lg" />
                                                                    <Typography className="innerDivText" style={{fontWeight : 600 , fontSize : '13px'}}>{item?.bedrooms} beds</Typography>
                                                                    <FontAwesomeIcon icon={faBed} color="#6c5ce7" size="lg" />
                                                                    <Typography className="innerDivText" style={{fontWeight : 600 , fontSize : '13px'}}>{item?.rooms} rooms</Typography>
                                                                    <FontAwesomeIcon icon={faRestroom} color="#ff7675" size="lg" />
                                                                </div>
                                                                <Typography className=" propAddre">{item?.address}</Typography>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    ))
                                }
                                </Row>
                                    <Pagination defaultCurrent={1}ds total={50} style={{textAlign : 'center' , marginTop : '25px'}} />
                            </>
                            ) : (
                                <Typography className="noContentText" >No Cites Found</Typography>
                            )
                        }
                        </Spin>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={9} className="gglMap"  >
                            <GoogleMapReact
                                defaultCenter={defaultProps.center}
                                defaultZoom={defaultProps.zoom}
                                bootstrapURLKeys={{ key: "AIzaSyDbvQuvGbCB0ghywwsM2tjlKBIPfXUSpHg" }}
                            >
                            <AnyReactComponent
                                lat={59.955413}
                                lng={30.337844}
                                text={myurl}
                            />
                            </GoogleMapReact>
                    </Col>
            </Row>

            <Drawer
                    title="Search Filters"
                    placement="right"
                    width={250}
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <div className="drawerFirstDiv" >
                        <Dropdown overlay={bedRoomMenu} trigger={['click']} className="filterBtn" placement="bottomLeft" arrow  >
                            <Button style={{marginBottom : '10px'}} >Bedrooms <DownOutlined style={{fontSize : '15px' , fontWeight : 700}} /></Button>
                        </Dropdown>
                        <Dropdown overlay={HomeTypesMenu} trigger={['click']} className="filterBtn" placement="bottomLeft" arrow >
                            <Button style={{marginBottom : '10px'}}>Home Types <DownOutlined style={{fontSize : '15px' , fontWeight : 700}} /></Button>
                        </Dropdown>
                        <Button className="filterBtn borderBtn">Save Search</Button>
                    </div>
                    <div className="drawerFirstDivSec" >
                        <Dropdown overlay={priceMenu} trigger={['click']} className="filterBtn priceBtn" placement="bottomLeft" arrow  >
                            <Button style={{marginBottom : '10px'}} >Any Price <DownOutlined style={{fontSize : '15px' , fontWeight : 700}} /></Button>
                        </Dropdown>
                    </div>
                    <Button className="filterBtn dull showDull" style={{minWidth : '100%'}} >Other (161)</Button>
            </Drawer>
        </>
    )
}

export default Properties
