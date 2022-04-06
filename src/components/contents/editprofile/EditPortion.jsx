import React , {useState , useEffect} from 'react'
import {Typography ,Input , Button , notification , Alert , Upload , Modal} from 'antd';
import {getUserInfo , updateUserInfo , uploadUserProfilePic} from '../../../server_api/Api'
import {useParams} from 'react-router-dom'

const init = {
    email : '',
    password : '',
    address : '',
    phoneNo : '',
}

const EditPortion = () => {
    const [ userInfo , setuserInfo ] = useState({});
    const [ userSendInfo , setSendInfo ] = useState(init);
    const {id} = useParams();
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess ] = useState(false)
    const [myImage , setMyImage ] = useState(null)
    const [msg, setMsg ] = useState(false)
    useEffect(() => {
        const getData = async () => {
            const {data} = await getUserInfo(id);
            setuserInfo(data?.User)
        }
        getData();
    } , [id,isSuccess ])

    // notification for added sucessfull
    const openNotificationWithIcon = (type) => {
        notification[type]({
            message: 'SuccessFull',
            description:'User Profile Updated SuccessFully',
            duration : 3000
        });
    };

    // sending data to server
    const handleClick = async () => {
        setIsError(false)
        setIsSuccess(false)
        setMsg("");

        if(userSendInfo?.email === ""){
            setSendInfo({...userSendInfo , email : userInfo?.email})
        }
        if(userSendInfo?.phoneNo === ""){
            setSendInfo({...userSendInfo , phoneNo : userInfo?.phoneNo})
        }
        if(userSendInfo?.address === ""){
            setSendInfo({...userSendInfo , address : userInfo?.address})
        }
        if(userSendInfo?.password === ""){
            setSendInfo({...userSendInfo , password : userInfo?.password})
        }

        const {data} = await updateUserInfo(userSendInfo , userInfo._id);
        console.log("got data : ", data)

        if(data?.success === true){
            setIsSuccess(true)
            openNotificationWithIcon('success');
        }else{
            setIsError(true)
            setMsg(data?.message)
        }
    }
    const [previewVisible , setpreviewVisible] = useState(false)
    const [previewImage , setpreviewImage] = useState('')
    const [ myFileOne , setMyFileone ] = useState([])
    const  handleCancel = () => setpreviewVisible(false)
    const handlePreview = (file) => {
        setpreviewImage(file.thumbUrl);
        setpreviewVisible(true)
    }

    // uplaoding profile image only
    const handleChangeOne = async ({ fileList }) => {
        if(fileList[0]?.percent == 100){
            setIsError(false)
            setIsSuccess(false)
            setMsg("");
            let formData = new FormData()
            const myImg = fileList[0].originFileObj;
            formData.append("profilePic" , myImg )
            const {data} = await uploadUserProfilePic( formData, userInfo._id);
            console.log("got data : ", data)
    
            if(data?.success === true){
                setIsSuccess(true)
                setMsg(data?.message)
            }else{
                setIsError(true)
                setMsg(data?.message)
            }
        }

    }

     const uploadButton = (
      <div>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
        <>
            <div className="editProfileSecDiv" >
                <Typography className="editprofileMainHead" >Edit Profile</Typography>
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
                <Typography  className="myLabel" >Edit Email</Typography>
                <Input value={userSendInfo?.email} name="email" onChange={(e) => setSendInfo({...userSendInfo , [e.target.name] : e.target.value}) } className="myInput" placeholder={userInfo?.email} type="email"  />
                <Typography className="myLabel" >Edit Password</Typography>
                <Input value={userSendInfo?.password} name="password" onChange={(e) => setSendInfo({...userSendInfo , [e.target.name] : e.target.value}) } className="myInput" placeholder="********" type="text" />
                <Typography className="myLabel" >Edit Phone No</Typography>
                <Input value={userSendInfo?.phoneNo} name="phoneNo" onChange={(e) => setSendInfo({...userSendInfo , [e.target.name] : e.target.value}) } className="myInput" placeholder={userInfo?.phoneNo} type="number" />
                <Typography className="myLabel" >Edit Location</Typography>
                <Input value={userSendInfo?.address} name="address" onChange={(e) => setSendInfo({...userSendInfo , [e.target.name] : e.target.value}) } className="myInput" placeholder={userInfo?.address} />
                <Typography className="labelNewAddProperty" style={{marginBottom : '10px'}} >Upload New Profile Image</Typography>
                <div className="clearfix">
                    <Upload
                        action="//jsonplaceholder.typicode.com/posts/"
                        listType="picture-card"
                        maxCount={1}
                        onPreview={handlePreview}
                        onChange={handleChangeOne}
                        type="images/*"
                    >
                        {myFileOne.length === 1 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>
                <div className="editProfileSubBtn" >
                    <Button style={{backgroundColor : '#00b894' , color : '#FFFFFF' , fontWeight: 600  , borderRadius : '10px' , width : '100px'}} onClick={handleClick} >Update</Button>
                </div>
            </div>
        </>
    )
}

export default EditPortion
