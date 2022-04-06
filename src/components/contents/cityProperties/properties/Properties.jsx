import React , {useState , useEffect , useRef } from 'react'
import { Row, Col ,Typography  , Pagination , Menu , Dropdown , Checkbox, Drawer , Input  ,  Spin ,  Button  , Tooltip , notification , message  } from 'antd';
import './Properties.css'
import { DownOutlined ,MenuOutlined ,HeartOutlined} from '@ant-design/icons'
import {Link , useParams , useNavigate} from 'react-router-dom'
import {getPropertiesByCity , getUsersPropertiesOnly , getAdminsPropertiesOnly , addNewSavedLater} from '../../../../server_api/Api'
import '../filterBtns/FilterBtns.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed , faBath  , faRestroom } from '@fortawesome/free-solid-svg-icons'
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    InfoWindow,
} from '@react-google-maps/api'



const Properties = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDbvQuvGbCB0ghywwsM2tjlKBIPfXUSpHg",
    })

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const [ defaultCenter , setDefaultCenter ] = useState()
    const [ locations , setLocatons ] = useState([]);
    const [ selected, setSelected ] = useState({});
    const onSelect = item => {
        setSelected(item);
    }


    const [ isSpinning , setIsSpinning ] = useState(false)
    // for drawer
    const [visible, setVisible] = useState(false);

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

    const [allProperties , setProperties] = useState([])
    const {city} = useParams();
    const [ newUrl , setNewUrl ] = useState("");
    const [ beds , setBeds ] = useState(0);
    const [ minMyPrice , setMinPrice ] = useState(0);
    const [ houseTyp , sethouseTyp ] = useState('');

    // for setting bedrooms
    const setMyBeds = (value) => {
        setIsSpinning(true);
        if (window.location.href.indexOf("bedrooms") > -1) {
            setBeds(value)
        }else{
            if(newUrl.length > 0){
                setNewUrl(`&bedrooms=${value}`)
            }else{
                setNewUrl(`bedrooms=${value}`)
            }
            setBeds(value)
        }
        setIsSpinning(false);
    }

    // for setting minPrice
    const setMyMinprice = (value) => {
        setIsSpinning(true);
        if (window.location.href.indexOf("minPrice") > -1) {
            setMinPrice(value)
        }else{
            if(newUrl.length > 0){
                setNewUrl(`&minPrice=${value}`)
            }else{
                setNewUrl(`minPrice=${value}`)
            }
            setMinPrice(value)
        }
        setIsSpinning(false);
    }

    // for setting house type
    const setMyHouseType = (value) => {
        setIsSpinning(true);
        if (window.location.href.indexOf("houseType") > -1) {
            sethouseTyp(value)
        }else{
            if(newUrl.length > 0){
                setNewUrl(`&houseType=${value}`)
            }else{
                setNewUrl(`houseType=${value}`)
            }
            sethouseTyp(value)
        }
        setIsSpinning(false);
    }

    // gettng data for first time
    useEffect(() => {
        setIsSpinning(true);
        const getCityData = async () => {
            const {data} = await getPropertiesByCity(city);
            setProperties(data?.AllProperties)
            setIsSpinning(false);
        }
        getCityData();
    },[city])

    // getting coordinates of current cities
    useEffect(() => {
        if(allProperties){
            setIsSpinning(true);
            if(allProperties.length > 0){
                let newArray = [];
                for(let i = 0 ; i !== allProperties.length; i++){
                    if(allProperties[i]?.coordinates.length > 0){
                        let location = {
                                lat : Number(allProperties[i]?.coordinates[0]),
                                lng : Number(allProperties[i]?.coordinates[1])
                        }
                        newArray.push({ name : allProperties[i]?.name , location : location , image : allProperties[i]?.images[1] , address : allProperties[i]?.address })
                    }
                }
                setLocatons(newArray)
            }
            setIsSpinning(false);
        }
    },[allProperties])

    // getting coordinates of current city
    useEffect(() => {
        if(allProperties){
            if(city === "izmir"){
                console.log("city matched")
                setDefaultCenter({
                    lat: 38.423733, lng: 27.142826
                })
            }
            if(city === "istanbul"){
                console.log("city matched")
                setDefaultCenter({
                    lat: 41.008240, lng: 28.978359
                })
            }
            if(city === "ankara"){
                console.log("city matched")
                setDefaultCenter({
                    lat: 39.933365, lng: 32.859741
                })
            }
        }
    },[city ,allProperties])

    // filtering products
    useEffect(() => {
        setIsSpinning(true);
        axios.get("http://localhost:8080/api/properties/getPropertiesWithFilter?" + `city=${city}` + "&" + `${newUrl}`)
        .then(function (response) {
            setProperties(response?.data?.AllProperties)
        })
        .catch(function (error) {
            console.log( "got error : " , error);
        })
        setIsSpinning(false);
    },[newUrl])

    // getting all userrs listing done in that city
    const getUsersData = async () => {
        setIsSpinning(true);
        const {data} = await getUsersPropertiesOnly(city);
            setProperties(data?.AllProperties)
            setIsSpinning(false);
    }

    // getting all admin listing done in that city
    const getAdminsData = async () => {
        setIsSpinning(true);
        const {data} = await getAdminsPropertiesOnly(city);
            setProperties(data?.AllProperties)
            setIsSpinning(false);
    }

    const [user, setUser ] = useState("")
    const location = useNavigate();

    //checking if admin logged in or not
    useEffect(() => {
        const checkAdmin = () => {
            const user = JSON.parse(localStorage.getItem('profile'))
            if (user) {
                setUser(user?.Admin?.Id)
            } else {
                setUser("")
            }
        }
        checkAdmin();
    }, [location])

    const success = () => {
        message.success('Property Add Saved for Later SuccessFully');
    };

    const error = () => {
        message.error("Property Already Saved for Future");
    };

    // saving later
    const saveLater = async (value) => {
        if(user === ""){
            openNotification();
        }else{
            const {data} = await addNewSavedLater({user :user , property : value });
            if(data?.success === true){
                success();
            }else{
                error()
            }
        }

    }

    const openNotification = () => {
        notification.open({
            message: 'Please Sign In or Sign Up First',
            description: <Button href="/signin" ghost type="link" >Sign In</Button>
        });
    };

    return (
        <>
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
                            <Button className="filterBtn borderBtn filterHideFirst hideSearch">Save Search</Button>
                            <MenuOutlined className="filterMenu" onClick={openDrawer} />
                        </div>
                    </Col>
                </Spin>
            </Row>

            <Row style={{marginTop : '20px'}} >
                    <Col xs={24} sm={24} md={{span : 22 , offset : 1}} lg={{span : 12 , offset : 0}} xl={{span: 12, offset : 1}} style={{marginBottom : '15px'}} >
                        <Spin spinning={isSpinning} >
                            <Typography className="propertyLeftSideHead" >All Homes Avaibalbe in {city} are Given below</Typography>
                            {
                                allProperties?.length > 1 && (
                                    <Typography className="propertyLeftSideSubHead" >{allProperties?.length} homes available</Typography>
                                )
                            }
                            {
                                ( ( allProperties?.length > 0 ) & ( allProperties?.length < 2 ) ) && (
                                    <Typography className="propertyLeftSideSubHead" >{allProperties?.length} home available</Typography>
                                )
                            }
                            {
                                allProperties?.length < 1  && (
                                    <Typography className="propertyLeftSideSubHead" >No home available</Typography>
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
                                                        {/* <Carousel className="caro" >
                                                        {
                                                            item?.images?.map((immg) => ( */}
                                                                <div  >
                                                                    <img className="carrImagee" style={{borderRadius : '10px' , objectFit : 'cover'}} src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" width="100%" height="130" alt="Slider Cover" />
                                                                </div>
                                                            {/* ))
                                                        }
                                                        </Carousel> */}
                                                                <div className="propDetail" >
                                                                    <Typography className="propPrice" >${item?.price}</Typography>
                                                                    <Tooltip placement="bottom" title="Save for later">
                                                                        <HeartOutlined style={{fontSize : '20px' , color : '#ff7675'}} onClick={() => saveLater(item?._id)} />
                                                                    </Tooltip>
                                                                </div>
                                                        <Link to={`/singleProperty/${item?._id}`}>
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
                                <Typography className="noContentText" >No Properties Found</Typography>
                            )
                        }
                        </Spin>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={9} >
                        <GoogleMap
                            mapContainerStyle={mapStyles}
                            zoom={13}
                            center={defaultCenter}
                            scrollwheel = {false}
                            streetViewControl = {false}
                            mapTypeControl = {false}
                            className="gglMap"
                        >
                            {
                                    locations.map(item => {
                                    return (
                                        <Marker key={item.name}
                                            position={item.location}
                                            onClick={() => onSelect(item)}
                                            icon = 'https://img.icons8.com/material-rounded/2x/cottage--v2.png'
                                        />
                                        )
                                    })
                                }
                                {
                                    selected.location &&
                                    (
                                        <InfoWindow
                                            position={selected.location}
                                            clickable={true}
                                            onCloseClick={() => setSelected({})}
                                        >
                                            <div style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , flexDirection : 'column'}} >
                                                <img alt="property cover" width="100%" height="70" src={selected?.image} />
                                                <Typography style={{fontSize: '15px' , fontWeight : 600  }} >{selected?.name}</Typography>
                                                <Typography style={{fontSize: '12px' , paddingTop : '10px'  }} >{selected?.address}</Typography>
                                            </div>
                                        </InfoWindow>
                                    )
                                }
                        </GoogleMap>
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
