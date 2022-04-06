import React , {useState , useEffect } from 'react'
import { Row, Col , Input , Typography , Select , Button , Alert , Upload , Modal , notification  } from 'antd';
import './AddProperty.css'
import {useNavigate} from 'react-router-dom'
import { UploadOutlined } from '@ant-design/icons';
import {addUserProperty} from '../../../server_api/Api'


const { Option } = Select;
const { TextArea } = Input;

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

const AddProperty = () => {
    const [ propertyData , setPropertyData ] = useState(init);
    const [isAdmin, setAdminLogin] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess ] = useState(false)
    const [msg, setMsg ] = useState(false)
    const location = useNavigate();

    // images one
    const [previewVisible , setPreviewVisible ] = useState(false);
    const [imgToBeShown , setimgToBeShown ] = useState("");
    const handleCancel = () =>  {
        setPreviewVisible(false)
    }
    const handlePreview = file => {
        setimgToBeShown(file.thumbUrl)
        setPreviewVisible(true);
    };
    const  handleUploadOne = (file) => {
        setPropertyData({...propertyData , image1 : file?.fileList[0]?.originFileObj})
    };
    const  handleUploadTwo = (file) => {
        setPropertyData({...propertyData , image2 : file?.fileList[0]?.originFileObj})
    };
    const  handleUploadThree = (file) => {
        setPropertyData({...propertyData , image3 : file?.fileList[0]?.originFileObj})
    };

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
            openNotificationWithIcon('success');
            setPropertyData({})
        }else{
            setIsError(true)
            setMsg(data?.message)
        }
    }

    

    return (
        <>
            {
                isAdmin ? (
                    <>
                        <Row className="addPropertyRow" >
                            <Col xs={23} sm={22} md={8} lg={8}>
                                <Typography className="addPropertyHead">Add New Property</Typography>
                                <div className="addPropertyFirstDiv" >
                                    <Input placeholder="Property Name" type="text" className="addPropertyInput" allowClear name="name" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})} />
                                    <Input placeholder="Total Beds" type="number" className="addPropertyInput" name="beds" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})} />
                                    <Input placeholder="Area (in sq/km)" type="number" className="addPropertyInput" name="totalArea" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})} />
                                    <Upload
                                        listType="picture"
                                        onPreview={handlePreview}
                                        accept= ".jpg, .png, .jpeg"
                                        onChange={(file) => handleUploadOne(file)}
                                        maxCount={1}
                                        >
                                        <Button icon={<UploadOutlined />} block className="uploader"  >Upload Image 1</Button>
                                    </Upload>
                                    <Upload
                                        listType="picture"
                                        onPreview={handlePreview}
                                        accept= ".jpg, .png, .jpeg"
                                        onChange={(file) => handleUploadTwo(file)}
                                        maxCount={1}
                                        >
                                        <Button icon={<UploadOutlined />} block className="uploader" >Upload Image 2</Button>
                                    </Upload>
                                    <Upload
                                        listType="picture"
                                        onPreview={handlePreview}
                                        accept= ".jpg, .png, .jpeg"
                                        onChange={(file) => handleUploadThree(file)}
                                        maxCount={1}
                                        >
                                        <Button icon={<UploadOutlined />} block className="uploader" >Upload Image 3</Button>
                                    </Upload>
                                </div>
                            </Col>
                            <Col xs={23} sm={22} md={8} lg={8} >
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
                                <div className="addPropertySecDiv" >
                                    <Input placeholder="Address" className="addPropertyInput" allowClear name="address" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})} />
                                    <Input placeholder="Bathrooms" type="number" className="addPropertyInput" name="baths" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  />
                                    <Select
                                        dropdownMatchSelectWidth={false}
                                        className="addPropertyInput"
                                        placeholder="Select City"
                                        placement="bottomLeft"
                                        onChange={(value) => setPropertyData({...propertyData , city : value})}
                                    >
                                        <Option value="istanbul" >Istanbul</Option>
                                        <Option value="izmir"  >Izmir</Option>
                                        <Option value="antalya" >Antalya</Option>
                                        <Option value="bursa"  >Bursa</Option>
                                        <Option value="ankara">Ankara</Option>
                                        <Option value="trabzon">Trabzon</Option>
                                        <Option value="alanya">Alanya</Option>
                                    </Select>
                                    <TextArea rows={7} placeholder="Description ..." className="addPropertyTextArea"  name="desc" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})} />
                                </div>
                            </Col>
                            <Col xs={23} sm={22} md={8} lg={8} >
                                <div className="addPropertyThirdDiv" >
                                    <Input placeholder="Price" type="number" className="addPropertyInput" name="price" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  />
                                    <Input placeholder="Total Rooms" type="number" className="addPropertyInput" name="rooms" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  />
                                    <Select
                                        dropdownMatchSelectWidth={false}
                                        className="addPropertyInput"
                                        placeholder="Status of House"
                                        placement="bottomLeft"
                                        onChange={(value) => setPropertyData({...propertyData , status : value})}
                                    >
                                        <Option value="sell">Sell</Option>
                                        <Option value="rent">Rent</Option>
                                    </Select>
                                    <Input placeholder="Bedrooms" type="number" className="addPropertyInput" name="bedrooms" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  />
                                    <Input placeholder="House Type" className="addPropertyInput" name="houseType" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  />
                                    <TextArea rows={7} placeholder="Description ..." className="addPropertyDescHide"  name="desc" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})} />
                                    <Upload
                                        listType="picture"
                                        onPreview={handlePreview}
                                        accept= ".jpg, .png, .jpeg"
                                        onChange={(file) => handleUploadOne(file)}
                                        maxCount={1}
                                        >
                                        <Button icon={<UploadOutlined />} block className="uploader uploaderHide"  >Upload Image 1</Button>
                                    </Upload>
                                    <Upload
                                        listType="picture"
                                        onPreview={handlePreview}
                                        accept= ".jpg, .png, .jpeg"
                                        onChange={(file) => handleUploadTwo(file)}
                                        maxCount={1}
                                        >
                                        <Button icon={<UploadOutlined />} block className="uploader uploaderHide" >Upload Image 2</Button>
                                    </Upload>
                                    <Upload
                                        listType="picture"
                                        onPreview={handlePreview}
                                        accept= ".jpg, .png, .jpeg"
                                        onChange={(file) => handleUploadThree(file)}
                                        maxCount={1}
                                        >
                                        <Button icon={<UploadOutlined />} block className="uploader uploaderHide" >Upload Image 3</Button>
                                    </Upload>
                                    <Button className="addPropertyBtn" onClick={handleClick} >Add New</Button>
                                    
                                </div>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <div style={{display : 'flex' , justifyContent : 'center' , alignItems: 'center' , flexDirection : 'column'}} >
                        <Typography className="signInnText" >Looks You are yot Signed In, Please Sign In here.</Typography>
                        <Button type="link" style={{textDecoration : 'underline'}} >Sign In</Button>
                    </div>

                )
            }
                    {/* Modal for preview */}
                    <Modal
                        visible={previewVisible}
                        footer={null}
                        onCancel={handleCancel}
                    >
                    <img alt="Property Cover" style={{ width: "95%" , height : '400px' }} src={imgToBeShown} />
                    </Modal>
        </>
    )
}

export default AddProperty
