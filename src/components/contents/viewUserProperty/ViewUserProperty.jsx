import React , {useState , useEffect } from 'react'
import { Row, Col , Input , Typography , Select , Button , Alert , Upload , Modal , notification , Image , Popconfirm, message } from 'antd';
import '../addProperty/AddProperty.css'
import {useParams , useNavigate} from 'react-router-dom'
import {UploadOutlined } from '@ant-design/icons';
import {getSingleProperty , updateProperty , deleteMyProperty} from '../../../server_api/Api'


const { Option } = Select;
const { TextArea } = Input;

const AddProperty = () => {
    const [ propertyData , setPropertyData ] = useState({});
    const [isAdmin, setAdminLogin] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess ] = useState(false)
    const [msg, setMsg ] = useState(false)
    const {id} = useParams();
    const [visible, setVisible] = useState(false);
    const [myImages , setmyImages ] = useState([])
    const location = useNavigate();



    // images one
    const [previewVisible , setPreviewVisible ] = useState(false);
    const [imgToBeShown , setimgToBeShown ] = useState("");
    const [isEdit  , setIsEdit ] = useState(true);
    const handleCancel = () =>  {
        setPreviewVisible(false)
    }
    const handlePreview = file => {
        setimgToBeShown(file.thumbUrl)
        setPreviewVisible(true);
    };
    const  handleUploadOne = (file) => {
        let tempImages = propertyData?.images;
        tempImages[0] = file?.fileList[0]?.originFileObj;
        setPropertyData({...propertyData , images : tempImages})
    };
    const  handleUploadTwo = (file) => {
        let tempImages = propertyData?.images;
        tempImages[0] = file?.fileList[1]?.originFileObj;
        setPropertyData({...propertyData , images : tempImages})
    };
    const  handleUploadThree = (file) => {
        let tempImages = propertyData?.images;
        tempImages[0] = file?.fileList[2]?.originFileObj;
        setPropertyData({...propertyData , images : tempImages})
    };

    //checking if admin logged in or not
    useEffect(() => {
        const checkAdmin = () => {
        const user = JSON.parse(localStorage.getItem('profile'))
        if (user) {
            setAdminLogin(true)
            const getProperty = async () => {
                const {data} = await getSingleProperty(id);
                console.log("data?.Property : ", data?.Property)
               setmyImages(data?.Property?.images)
                setPropertyData(data?.Property)
            }
            getProperty();
            //setPropertyData({...propertyData , properiter : user?.Admin?.Id})
        } else {
            setAdminLogin(false)
        }
        }
        checkAdmin();
    }, [id])

    // notification for added sucessfull
    const openNotificationWithIcon = (type) => {
        notification[type]({
            message: 'SuccessFull',
            description:'Property Updated SuccessFully',
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
        if(typeof(propertyData?.images[0]) !== 'string'){
            formData.append('image1', propertyData?.images[0]);
        }
        if(typeof(propertyData?.images[1]) !== 'string'){
            formData.append('image2', propertyData?.images[1]);
        }
        if(typeof(propertyData?.images[2]) !== 'string'){
            formData.append('image3', propertyData?.images[2]);
        }

        const {data} = await updateProperty(formData , propertyData._id);
        console.log("got data : ", data)

        if(data?.success === true){
            setIsSuccess(true)
            setMsg(data?.message)
            openNotificationWithIcon('success');
            window.location.reload();
        }else{
            setIsError(true)
            setMsg(data?.message)
        }
    }


    //delete property
    const confirm = async (e) =>  {
        setIsError(false)
        setMsg("")
        const {data} = await deleteMyProperty(propertyData._id , propertyData.properiter);
        if(data?.success === true){
            location(`{/profile/${propertyData.properiter}}`)
        }else{
            setIsError(true)
            setMsg(data?.message)
        }
    }
    function cancel(e) {
        console.log(e)
    }


    const changeState = () => {
        setIsEdit(false)
    }

    return (
        <>
            {
                isAdmin ? (
                    <>
                        <Row className="addPropertyRow" >
                            <Col xs={23} sm={22} md={8} lg={8}>
                            {
                                isEdit === false ? (
                                    <Typography className="addPropertyHead">Update  Property</Typography>
                                ) : (
                                    <Typography className="addPropertyHead">View Property</Typography>
                                )
                            }
                                <div className="addPropertyFirstDiv" >
                                    <Input disabled={isEdit} value={propertyData?.name} type="text" className="addPropertyInput" allowClear name="name" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  />
                                    <Input disabled={isEdit} value={propertyData?.beds} type="number" className="addPropertyInput" name="beds" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  />
                                    <Input disabled={isEdit} value={propertyData?.totalArea} type="number" className="addPropertyInput" name="totalArea" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  />
                                    {
                                        isEdit === true && (
                                            <>
                                                <Typography style={{fontSize : '17px' , fontWeight : 600}} className="viewProperDiv" >Uploaded Images</Typography>
                                                <Image
                                                    className="viewProperDiv"
                                                    preview={{ visible: false }}
                                                    width={220}
                                                    src={myImages[0]}
                                                    onClick={() => setVisible(true)}
                                                />
                                                <div style={{ display: 'none' }}>
                                                    <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                                                        <Image src={myImages[0]} />
                                                        <Image src={myImages[1]} />
                                                        <Image src={myImages[2]} />
                                                    </Image.PreviewGroup>
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        isEdit === false && (
                                            <>
                                                <Upload
                                                    listType="picture"
                                                    onPreview={handlePreview}
                                                    accept= ".jpg, .png, .jpeg"
                                                    onChange={(file) => handleUploadOne(file)}
                                                    maxCount={1}
                                                    >
                                                    <Button icon={<UploadOutlined />} block className="uploader"  >Update Image 1</Button>
                                                </Upload>
                                                <Upload
                                                    listType="picture"
                                                    onPreview={handlePreview}
                                                    accept= ".jpg, .png, .jpeg"
                                                    onChange={(file) => handleUploadTwo(file)}
                                                    maxCount={1}
                                                    >
                                                    <Button icon={<UploadOutlined />} block className="uploader" >Update Image 2</Button>
                                                </Upload>
                                                <Upload
                                                    listType="picture"
                                                    onPreview={handlePreview}
                                                    accept= ".jpg, .png, .jpeg"
                                                    onChange={(file) => handleUploadThree(file)}
                                                    maxCount={1}
                                                    >
                                                    <Button icon={<UploadOutlined />} block className="uploader" >Update Image 3</Button>
                                                </Upload>
                                            </>
                                        )
                                    }
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
                                    <Input disabled={isEdit} value={propertyData?.address} placeholder="Address" className="addPropertyInput" allowClear name="address" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})} />
                                    <Input disabled={isEdit} value={propertyData?.baths} placeholder="Bathrooms" type="number" className="addPropertyInput" name="baths" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  />
                                    <Select
                                        dropdownMatchSelectWidth={false}
                                        className="addPropertyInput"
                                        placeholder="Select City"
                                        placement="bottomLeft"
                                        value={propertyData?.city}
                                        disabled={isEdit}
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
                                    <TextArea disabled={isEdit} value={propertyData?.desc} rows={7} placeholder="Description ..." className="addPropertyTextArea"  name="desc" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})} />
                                </div>
                            </Col>
                            <Col xs={23} sm={22} md={8} lg={8} >
                                <div className="addPropertyThirdDiv" >
                                    <Input disabled={isEdit} value={propertyData?.price} placeholder="Price" type="number" className="addPropertyInput" name="price" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  />
                                    <Input disabled={isEdit} value={propertyData?.rooms} placeholder="Total Rooms" type="number" className="addPropertyInput" name="rooms" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  />
                                    <Select
                                        dropdownMatchSelectWidth={false}
                                        className="addPropertyInput"
                                        placeholder="Status of House"
                                        placement="bottomLeft"
                                        value={propertyData?.status}
                                        disabled={isEdit}
                                        onChange={(value) => setPropertyData({...propertyData , status : value})}
                                    >
                                        <Option value="sell">Sell</Option>
                                        <Option value="rent">Rent</Option>
                                    </Select>
                                    <Input disabled={isEdit} value={propertyData?.bedrooms} placeholder="Bedrooms" type="number" className="addPropertyInput" name="bedrooms" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  />
                                    <Input disabled={isEdit} value={propertyData?.houseType} placeholder="House Type" className="addPropertyInput" name="houseType" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  />
                                    <TextArea disabled={isEdit} value={propertyData?.desc} rows={7} placeholder="Description ..." className="addPropertyDescHide"  name="desc" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})} />
                                    {
                                        isEdit === true && (
                                            <>
                                                <Typography style={{fontSize : '17px' , fontWeight : 600}} className="imgPreViewProp" >Uploaded Images</Typography>
                                                <Image
                                                    className="imgPreViewProp"
                                                    preview={{ visible: false }}
                                                    width={220}
                                                    src={myImages[0]}
                                                    onClick={() => setVisible(true)}
                                                />
                                                <div style={{ display: 'none' }}>
                                                    <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                                                        <Image src={myImages[0]} />
                                                        <Image src={myImages[1]} />
                                                        <Image src={myImages[2]} />
                                                    </Image.PreviewGroup>
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        isEdit === false && (
                                            <>
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
                                            </>
                                        )
                                    }
                                    {
                                        isEdit === true ? (
                                            <div className="delProperty" >
                                                <Button className="addPropertyBtn PropdelBtn" onClick={changeState} >Edit Now</Button>
                                                <Popconfirm
                                                    title="Are you sure to delete this Property?"
                                                    onConfirm={confirm}
                                                    onCancel={cancel}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button className="addPropertyBtn PropdelBtn" style={{backgroundColor : '#e15f41' , marginLeft : '5px'}}  >Delete Now</Button>
                                                </Popconfirm>
                                            </div>
                                        ) : (
                                            <Button className="addPropertyBtn" onClick={handleClick} >Update Now</Button>
                                        )
                                    }
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
