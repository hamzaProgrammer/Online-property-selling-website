import React , {useState , useEffect } from 'react';
import { Row, Col , Typography , Input , Select , Divider ,  Upload  , Button , notification , Alert , Switch , Modal } from 'antd';
import './AddNewProperty.css'
import {useNavigate} from 'react-router-dom'
import {addUserProperty } from '../../../server_api/Api'


const { TextArea } = Input;
const { Option } = Select;

const init = {
    name : '',
    city : '',
    address : '',
    price : 0,
    beds : 0,
    baths : 0,
    bedrooms : 0,
    image1 : "",
    image2 : "",
    image3 : "",
    totalArea : 0,
    desc : '',
    status : '',
    houseType : '',
    properiter : '',
}


const AddNewProperty = () => {
    const [previewVisible , setpreviewVisible] = useState(false)
    const [ propertyData , setPropertyData ] = useState(init);
    const [isAdmin, setAdminLogin] = useState(false)
    const [allInputs, setallInputs ] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess ] = useState(false)
    const [msg, setMsg ] = useState(false)
    const location = useNavigate();
    const [previewImage , setpreviewImage] = useState('')
    const [ myFileOne , setMyFileone ] = useState([])
    const [ myFileTwo , setMyFileTwo ] = useState([])
    const [ myFileThree , setMyFileThree ] = useState([])


    const handlePreview = (file) => {
        setpreviewImage(file.thumbUrl);
        setpreviewVisible(true)
    }
    const  handleCancel = () => setpreviewVisible(false)
    const handleChangeOne = ({ fileList }) => {
        setMyFileone(fileList[0].originFileObj)
        setPropertyData({...propertyData , image1 : fileList[0].originFileObj})
    }
    const handleChangeTwo = ({ fileList }) => {
            setMyFileTwo(fileList[0].originFileObj)
        setPropertyData({...propertyData , image2 : fileList[0].originFileObj})
    }
    const handleChangeThree = ({ fileList }) => {
        setMyFileThree(fileList[0].originFileObj)
        setPropertyData({...propertyData , image3 : fileList[0].originFileObj})
    }


    //checking if admin logged in or not
    useEffect(() => {
        const checkAdmin = () => {
        const user = JSON.parse(localStorage.getItem('profile'))
        if (user) {
            setAdminLogin(true)
            setPropertyData({...propertyData , properiter : user?.Admin?.Id})
        } else {
            setAdminLogin(false)
        }
        }
        checkAdmin();
    }, [location])

    const uploadButton = (
        <div>
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    // notification for added sucessfull
    const openNotificationWithIcon = (type) => {
        notification[type]({
            message: 'SuccessFull',
            description:'New Property Added SuccessFully',
            duration : 3000
        });
    };

    // sending data to server
    const handleClick = async () => {
        console.log("propertyData : ", propertyData)
        setIsError(false)
        setIsSuccess(false)
        setMsg("")
        if(propertyData?.name == '' || propertyData?.city == '' || propertyData?.price == 0 || propertyData?.address == '' || propertyData?.beds == 0 || propertyData?.baths == 0 || propertyData?.status == ''  || propertyData?.totalArea == 0 || propertyData?.bedrooms == 0  || propertyData?.desc  == '' || propertyData?.properiter == '' ){
            setIsError(true)
            setMsg("Please Fill All Fields")
        }
        const formData = new FormData();
        formData.append('name', propertyData?.name);
        formData.append('address', propertyData?.address);
        formData.append('city', propertyData?.city);
        formData.append('price', propertyData?.price);
        formData.append('beds', propertyData?.beds);
        formData.append('baths', propertyData?.baths);
        formData.append('bedrooms', propertyData?.bedrooms);
        formData.append('totalArea', propertyData?.totalArea);
        formData.append('desc', propertyData?.desc);
        formData.append('status', propertyData?.status);
        formData.append('properiter', propertyData?.properiter);
        formData.append('houseType', propertyData?.houseType);
        formData.append('image1', propertyData?.image1);
        formData.append('image2', propertyData?.image2);
        formData.append('image3', propertyData?.image3);


        const {data} = await addUserProperty(formData);
        console.log("got data : ", data)

        if(data?.success === true){
            setIsSuccess(true)
            setMsg(data?.message)
            setPropertyData({})
            openNotificationWithIcon('success');
            //window.location.reload();
        }else{
            setIsError(true)
            setMsg(data?.message)
        }
    }

    
  return (
    <>
        <Row>
            <Col xs={{span : 16 , offset : 4}} sm={{span : 8 , offset : 4}} md={{span : 8 , offset : 8}} lg={{span : 8 , offset : 8}}  >
                <Typography className="newAddPropertyHead" >POST YOUR AD</Typography>
            </Col>
        </Row>
        <Row>
            <Col xs={{span :22 , offset : 1}} sm={{span :22 , offset : 1}} md={{span :22 , offset : 1}} lg={{span :22 , offset : 1}} >
                <div className="newAddPropertyMainDiv" >
                    <Typography className="newAddPropertyHeadTwo" >INCLUDE SOME DETAILS</Typography>
                    {
                        isError && (
                            <Alert message={msg} type="error"  />
                        )
                    }
                    {
                        isSuccess && (
                            <Alert message={msg} type="success" closable={true} />
                        )
                    }
                    <Typography className="labelNewAddProperty"  >Ad Title</Typography>
                    <Input className="newAddPropertyInput" allowClear showCount={true} maxLength={40} name="name" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  />
                    <Typography className="labelNewAddProperty" >Ad Description</Typography>
                    <TextArea className="newAddPropertyInput" name="desc" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  rows={7} maxLength={150} />
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} >
                            <Typography className="labelNewAddProperty" >Select City</Typography>
                            <Select size="large" defaultValue="Istanbul" className="newAddPropertySelect" onChange={(value) => setPropertyData({...propertyData , city : value})}>
                                <Option value="istanbul" >Istanbul</Option>
                                <Option value="izmir"  >Izmir</Option>
                                <Option value="antalya" >Antalya</Option>
                                <Option value="bursa"  >Bursa</Option>
                                <Option value="ankara">Ankara</Option>
                                <Option value="trabzon">Trabzon</Option>
                                <Option value="alanya">Alanya</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={24} md={{span : 11 , offset : 1}} lg={{span : 11 , offset : 1}} >
                            <Typography className="labelNewAddProperty" >Status of Property</Typography>
                            <Select size="large" defaultValue="Sell" className="newAddPropertySelect" onChange={(value) => setPropertyData({...propertyData , status : value})} >
                                <Option value="sell">Sell</Option>
                                <Option value="rent">Rent</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Divider style={{marginTop : '20px' , marginBottom : '0px' , backgroundColor : '#95a5a6'}} />
                    <Typography className="propDetNewAddProperty" >Property Details</Typography>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} >
                            <Typography className="labelNewAddProperty" >Select Bedrooms</Typography>
                            <Select size="large" defaultValue="1" className="newAddPropertySelect" onChange={(value) => setPropertyData({...propertyData , bedrooms : value})}>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3 </Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={24} md={{span : 11 , offset : 1}} lg={{span : 11 , offset : 1}} >
                            <Typography className="labelNewAddProperty" >Select No of Bathrooms</Typography>
                            <Select size="large" defaultValue="1" className="newAddPropertySelect" onChange={(value) => setPropertyData({...propertyData , baths : value})}>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3+ </Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} >
                            <Typography className="labelNewAddProperty" >Select House Type</Typography>
                            <Select size="large" defaultValue="Townhome" className="newAddPropertySelect" onChange={(value) => setPropertyData({...propertyData , houseType : value})}>
                                <Option value="Townhome">Townhome</Option>
                                <Option value="Village">Village</Option>
                                <Option value="Villa">Villa </Option>
                                <Option value="Flat">Flat</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={24} md={{span : 11 , offset : 1}} lg={{span : 11 , offset : 1}} >
                            <Typography className="labelNewAddProperty" >Select No of Living Rooms</Typography>
                            <Select size="large" defaultValue="1" className="newAddPropertySelect" onChange={(value) => setPropertyData({...propertyData , rooms : value})}>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3+ </Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} >
                            <Typography className="labelNewAddProperty" >Complete Address</Typography>
                            <Input className="newAddPropertyInput" allowClear showCount={true} maxLength={100} name="address" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  />
                        </Col>
                        <Col xs={24} sm={24} md={{span : 11 , offset : 1}} lg={{span : 11 , offset : 1}} >
                            <Typography className="labelNewAddProperty" >Price</Typography>
                            <Input className="newAddPropertyInput" allowClear showCount={true} type="number" name="price" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} >
                            <Typography className="labelNewAddProperty" >Area in (sq/km)</Typography>
                            <Input className="newAddPropertyInput" allowClear showCount={true} type="number" name="totalArea" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  />
                        </Col>
                        <Col xs={24} sm={24} md={{span : 11 , offset : 1}} lg={{span : 11 , offset : 1}} >
                            <Typography className="labelNewAddProperty" >Total Beds</Typography>
                            <Input className="newAddPropertyInput" allowClear showCount={true} type="number" name="beds" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})} />
                        </Col>
                    </Row>
                    <Row style={{marginTop : '15px'}} >
                        <Col xs={24} sm={12} md={8} lg={8} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , flexDirection : 'column'}} >
                            <Typography className="labelNewAddProperty" >Upload Image 1</Typography>
                            <div className="clearfix">
                                <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    maxCount={1}
                                    onPreview={handlePreview}
                                    onChange={handleChangeOne}
                                >
                                    {myFileOne.length === 1 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , flexDirection : 'column'}} >
                            <Typography className="labelNewAddProperty" >Upload Image 2</Typography>
                            <div className="clearfix">
                                <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    maxCount={1}
                                    onPreview={handlePreview}
                                    onChange={handleChangeTwo}
                                >
                                    {myFileTwo.length === 1 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , flexDirection : 'column'}} >
                            <Typography className="labelNewAddProperty" >Upload Image 3</Typography>
                            <div className="clearfix">
                                <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    maxCount={1}
                                    onPreview={handlePreview}
                                    onChange={handleChangeThree}
                                >
                                    {myFileThree.length === 1 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{marginTop : '15px'}} >
                        <Col xs={0} sm={0} md={8} lg={8} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , flexDirection : 'column'}} >
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , flexDirection : 'column'}} >
                            <Button className="newAddPropertyBtn" onClick={handleClick} >Post Now</Button>
                        </Col>
                        <Col xs={0} sm={0} md={8} lg={8} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , flexDirection : 'column'}} >
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col xs={0} sm={0} md={1} lg={1} ></Col>
        </Row>
    </>
    );
}

export default AddNewProperty;
