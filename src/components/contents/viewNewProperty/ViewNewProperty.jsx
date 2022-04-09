import React , {useState , useEffect } from 'react';
import { Row, Col , Typography , Input , Select , Divider ,  Upload , Modal , Button , notification , Alert , Image ,Popconfirm , Switch , DatePicker , Menu  } from 'antd';
import '../addProperty/AddProperty.css'
import {useNavigate  , useParams} from 'react-router-dom'
import {getSingleProperty , updateProperty , deleteMyProperty , makeStripePayment , getSubscription} from '../../../server_api/Api'
import moment from 'moment'


const { TextArea } = Input;
const { Option } = Select;

const stripeInit = {
    name : '',
    email : '',
    amount : '200',
    cvv : '',
    expYY : '',
    expMM : '',
    cardNumber : '',
}



const AddNewProperty = () => {
    const [previewVisible , setpreviewVisible] = useState(false)
    const [ stripePayment  , setstripePayment ] = useState(stripeInit)
    const [allInputs, setallInputs ] = useState(false)
    const [ modal2Visible , setmodal2Visible ] = useState(false)
    const [ propertyData , setPropertyData ] = useState({});
    const [isAdmin, setAdminLogin] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess ] = useState(false)
    const [msg, setMsg ] = useState(false)
    const location = useNavigate();
    const [previewImage , setpreviewImage] = useState('')
     const [myImages , setmyImages ] = useState([])
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
        let tempImages = propertyData?.images;
        tempImages[0] = fileList[0]?.originFileObj;
        setPropertyData({...propertyData , images : tempImages})
    }
    const handleChangeTwo = ({ fileList }) => {
            setMyFileTwo(fileList[0].originFileObj)
        let tempImages = propertyData?.images;
        tempImages[1] = fileList[0]?.originFileObj;
        setPropertyData({...propertyData , images : tempImages})
    }
    const handleChangeThree = ({ fileList }) => {
        setMyFileThree(fileList[0].originFileObj)
        let tempImages = propertyData?.images;
        tempImages[2] = fileList[0]?.originFileObj;
        setPropertyData({...propertyData , images : tempImages})
    }

    const [isModalError, setisModalError ] = useState(false)
    const [isModalSuccess, setisModalSuccess ] = useState(false);
    const [msgModal, setmsgModal ] = useState("")

    const uploadButton = (
      <div>
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    // images one
    const [isEdit  , setIsEdit ] = useState(true);
    const {id} = useParams();


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

    // stripe payment
    const handleStripe = async () => {
        console.log("stripePayment : ", stripePayment)
        setisModalError(false)
        setisModalSuccess(false)
        setmsgModal("")
        if(stripePayment?.email == '' || stripePayment?.name == '' || stripePayment?.cvv == 0 || stripePayment?.cardNumber == '' || stripePayment?.expMM == 0 || stripePayment?.expYY == 0 ){
            setisModalError(true)
            setmsgModal("Please Fill All Fields")
        }

        const {data} = await makeStripePayment(stripePayment);
        console.log("got data : ", data)

        if(data?.success === true){
            const {data} = await getSubscription(id , "7Days", propertyData.properiter );
            console.log("got data : ", data)
            if(data?.success === true){
                setisModalSuccess(true)
                setmsgModal(data?.message)
                setallInputs(true)
            }else{
                setisModalError(true)
                setmsgModal(data?.message)
            }
        }else{
            setisModalError(true)
            setmsgModal(data?.message)
        }
    }

    // toggle function
    function onChange() {
        setmodal2Visible(!modal2Visible)
    }

    // closing modal
    const handleClose = () => {
        setmodal2Visible(false)
    }

    // getting Year
    function changeYear (date, dateString) {
        let datee = dateString;
        setstripePayment({...stripePayment , expYY : datee});
    }

    // getting month for stripe
    function changeMonth (date, dateString) {
        let datee = dateString;
        setstripePayment({...stripePayment , expMM : datee});
    }


  return (
    <>
        <Row>
            <Col xs={{span : 16 , offset : 4}} sm={{span : 8 , offset : 4}} md={{span : 8 , offset : 8}} lg={{span : 8 , offset : 8}}  >
            {
                isEdit === false ? (
                    <Typography className="newAddPropertyHead" >UPDATE YOUR AD</Typography>
                ) : (
                    <Typography className="newAddPropertyHead" >VIEW YOUR AD</Typography>
                )
            }
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
                    <Input disabled={isEdit} value={propertyData?.name} className="newAddPropertyInput" allowClear showCount={true} maxLength={40} name="name" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}   />
                    <Typography className="labelNewAddProperty" >Ad Description</Typography>
                    <TextArea disabled={isEdit} value={propertyData?.desc} className="newAddPropertyInput" name="desc" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  rows={7} maxLength={150} />
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} >
                            <Typography className="labelNewAddProperty" >Select City</Typography>
                            <Select size="large" defaultValue="Istanbul" className="newAddPropertySelect" onChange={(value) => setPropertyData({...propertyData , city : value})} disabled={isEdit} value={propertyData?.city} >
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
                            <Select size="large" defaultValue="Sell" className="newAddPropertySelect" onChange={(value) => setPropertyData({...propertyData , status : value})} disabled={isEdit} value={propertyData?.status} >
                                <Option value="sell">Sell</Option>
                                <Option value="rent">Rent</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Divider style={{marginTop : '20px' , marginBottom : '0px' , backgroundColor : '#95a5a6'}} />
                    <Typography  className="propDetNewAddProperty" >Property Details</Typography>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} >
                            <Typography className="labelNewAddProperty" >Select Bedrooms</Typography>
                            <Select size="large" defaultValue="1" className="newAddPropertySelect" onChange={(value) => setPropertyData({...propertyData , bedrooms : value})} disabled={isEdit} value={propertyData?.bedrooms} >
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3 </Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={24} md={{span : 11 , offset : 1}} lg={{span : 11 , offset : 1}} >
                            <Typography className="labelNewAddProperty" >Select No of Bathrooms</Typography>
                            <Select size="large" defaultValue="1" className="newAddPropertySelect" onChange={(value) => setPropertyData({...propertyData , baths : value})} disabled={isEdit} value={propertyData?.baths} >
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3+ </Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} >
                            <Typography className="labelNewAddProperty" >Select House Type</Typography>
                            <Select size="large" defaultValue="Townhome" className="newAddPropertySelect" onChange={(value) => setPropertyData({...propertyData , houseType : value})} disabled={isEdit} value={propertyData?.houseType} >
                                <Option value="Townhome">Townhome</Option>
                                <Option value="Village">Village</Option>
                                <Option value="Villa">Villa </Option>
                                <Option value="Flat">Flat</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={24} md={{span : 11 , offset : 1}} lg={{span : 11 , offset : 1}} >
                            <Typography className="labelNewAddProperty" >Select No of Living Rooms</Typography>
                            <Select size="large" defaultValue="1" className="newAddPropertySelect" onChange={(value) => setPropertyData({...propertyData , rooms : value})} disabled={isEdit} value={propertyData?.rooms} >
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3+ </Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} >
                            <Typography className="labelNewAddProperty" >Complete Address</Typography>
                            <Input disabled={isEdit} value={propertyData?.address} className="newAddPropertyInput" allowClear showCount={true} maxLength={100} name="address" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  />
                        </Col>
                        <Col xs={24} sm={24} md={{span : 11 , offset : 1}} lg={{span : 11 , offset : 1}} >
                            <Typography className="labelNewAddProperty" >Price</Typography>
                            <Input disabled={isEdit} value={propertyData?.price} className="newAddPropertyInput" allowClear showCount={true} type="number" name="price" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} >
                            <Typography className="labelNewAddProperty" >Area in (sq/km)</Typography>
                            <Input disabled={isEdit} value={propertyData?.totalArea} className="newAddPropertyInput" allowClear showCount={true} type="number" name="totalArea" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})}  />
                        </Col>
                        <Col xs={24} sm={24} md={{span : 11 , offset : 1}} lg={{span : 11 , offset : 1}} >
                            <Typography className="labelNewAddProperty" >Total Beds</Typography>
                            <Input disabled={isEdit} value={propertyData?.beds} className="newAddPropertyInput" allowClear showCount={true} type="number" name="beds" onChange={(e) => setPropertyData({...propertyData , [e.target.name] : e.target.value})} />
                        </Col>
                    </Row>
                    <Row style={{marginTop : '15px'}} >
                        <Col xs={24} sm={12} md={8} lg={8} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , flexDirection : 'column'}} >
                        {
                            isEdit === true ? (
                                <>
                                    <Typography className="labelNewAddProperty" style={{marginBottom : '10px'}} > Image 1</Typography>
                                    <Image
                                        className="viewProperDiv"
                                        width={"90%"}
                                        style={{maxHeight: '200px' , minHeight: '200px'}}
                                        src={myImages[0]}
                                    />
                                </>
                            ) : (
                                <>
                                    <Typography className="labelNewAddProperty" style={{marginBottom : '10px'}} >Upload Image 1</Typography>
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
                                </>
                            )
                        }
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , flexDirection : 'column'}} >
                        {
                            isEdit === true ? (
                                <>
                                    <Typography className="labelNewAddProperty" style={{marginBottom : '10px'}} > Image 2</Typography>
                                    <Image
                                        className="viewProperDiv"
                                        width={"90%"}
                                        style={{maxHeight: '200px' , minHeight: '200px'}}
                                        src={myImages[1]}
                                    />
                                </>
                            ) : (
                                <>
                                    <Typography className="labelNewAddProperty" style={{marginBottom : '10px'}} >Upload Image 2</Typography>
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
                                </>
                            )
                        }
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , flexDirection : 'column'}} >
                        {
                            isEdit === true ? (
                                <>
                                    <Typography className="labelNewAddProperty" style={{marginBottom : '10px'}} > Image 3</Typography>
                                    <Image
                                        className="viewProperDiv"
                                        width={"90%"}
                                        style={{maxHeight: '200px' , minHeight: '200px'}}
                                        src={myImages[2]}
                                    />
                                </>
                            ) : (
                                <>
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
                                </>
                            )
                        }
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={0} sm={0} md={4} lg={8} xl={8} ></Col>
                        <Col xs={22} sm={22} md={20} lg={8} xl={8} >
                            {
                            propertyData?.subsType === "" ? (
                                <>
                                    <div  className="showToggle" style={{marginTop : '40px'}} >
                                        <Typography className="toggleText" >Subscribe this Property?</Typography>
                                        <Switch checked={modal2Visible} onChange={onChange} />
                                    </div>
                                    <div className="hideToggle" >
                                        <Typography className="toggleText" >Subscribe this Property?</Typography>
                                        <Switch checked={modal2Visible} onChange={onChange} />
                                    </div>
                                </>
                            ) : (
                                <Typography className="toggleText" style={{marginTop :'40px'}}  >Subscription will end on {propertyData?.subsEndDate} </Typography>
                            )
                        }
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={8} xl={8} ></Col>
                    </Row>
                    <Row style={{marginTop : '15px'}} >
                        <Col xs={0} sm={0} md={8} lg={8} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , flexDirection : 'column'}} >
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , flexDirection : 'column'}} >
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
                        </Col>
                        <Col xs={0} sm={0} md={8} lg={8} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , flexDirection : 'column'}} >
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col xs={0} sm={0} md={1} lg={1} ></Col>
        </Row>

        {/* stripe modal */}
        <Modal
            title="Subscribe This Property for 7 Days"
            centered
            visible={modal2Visible}
            onCancel={handleClose}
            maskClosable={false}
            footer={[
                <Button className="subsBtn" onClick={handleStripe} >Subscribe Now</Button>,
            ]}
        >
            {
                isModalError && (
                    <Alert message={msgModal} type="error" showIcon closable style={{marginBottom : '10px'}} />
                )
            }
            {
                isModalSuccess && (
                    <Alert message={msgModal} type="success" showIcon closable style={{marginBottom : '10px'}} />
                )
            }
            <Row gutter={[16,16]} >
                <Col xs={24} sm={24} lg={12} xl={12} >
                    <div style={{display : 'flex' , alignItems : 'center' , flexDirection : 'column'}} >
                        <Input type="email" focus={true} disabled={allInputs} style={{height : '50px' , color : '#e84118'}} placeholder="Enter Email ..." value={stripePayment?.email} onChange={(e) => setstripePayment({...stripePayment , [e.target.name] : e.target.value})} name="email" />
                        <Input disabled style={{marginTop : '10px' , height : '50px' , color : '#e84118'}} value="200 $"  />
                        <DatePicker
                            format={"MM"}
                            onChange={(date, dateString) =>
                                changeMonth(date, dateString)
                            }
                            placeholder="Expiry Month of Card"
                            picker="month"
                            value={
                            stripePayment?.expMM !== ""
                                ? moment(stripePayment?.expMM)
                                : ""
                            }
                            style={{width : '100%' ,marginTop : '10px' ,height : '50px' , color : '#e84118'}}
                        />
                        <Input maxLength={3} disabled={allInputs} placeholder="Card CCV ..." style={{marginTop : '10px' , height : '50px' , color : '#e84118'}} value={stripePayment?.cvv} onChange={(e) => setstripePayment({...stripePayment , [e.target.name] : e.target.value})} name="cvv" />
                    </div>
                </Col>
                <Col xs={24} sm={24} lg={12} xl={12} >
                    <div style={{display : 'flex' , alignItems : 'center' , flexDirection : 'column' }} >
                        <Input  disabled={allInputs} style={{height : '50px' , color : '#e84118'}} placeholder="Enter Name ..." value={stripePayment?.name} onChange={(e) => setstripePayment({...stripePayment , [e.target.name] : e.target.value})} name="name" />
                        <DatePicker
                            format={"YYYY"}
                            onChange={(date, dateString) =>
                                changeYear(date, dateString)
                            }
                            placeholder="Expiry Year of Card"
                            picker="year"
                            value={
                            stripePayment?.expYY !== ""
                                ? moment(stripePayment?.expYY)
                                : ""
                            }
                            style={{width : '100%' ,marginTop : '10px' ,height : '50px' ,color : '#e84118'}}
                        />
                        <Input maxLength={20} disabled={allInputs} placeholder="Enter Card No ..." style={{marginTop : '10px' , height : '50px' , color : '#e84118'}} value={stripePayment?.cardNumber} onChange={(e) => setstripePayment({...stripePayment , [e.target.name] : e.target.value})} name="cardNumber" />
                    </div>
                </Col>
            </Row>
        </Modal>


    </>
  );
}

export default AddNewProperty;
