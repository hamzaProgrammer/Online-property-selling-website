import React , {useState , useEffect} from 'react'
import {Typography , Button } from 'antd'
import './EditProfile.css'
import {EditOutlined , SaveOutlined} from '@ant-design/icons'
import {getUserInfo} from '../../../server_api/Api'
import {useParams , useNavigate } from 'react-router-dom'

const EditProfilesideBar = () => {
    const [ userInfo , setuserInfo ] = useState({});
    const  location = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        const getData = async () => {
            const {data} = await getUserInfo(id);
            setuserInfo(data?.User)
        }
        getData();
    } , [id])

    // navigating towards edit profile page
    const editProfile = () => {
        if(userInfo === {}){
            location(`/signin`)
        }else{
            location(`/editProfile/${userInfo?._id}`)
        }
    }

    // navigating towards saved search pages
    const savedSearches = () => {
        if(userInfo === {}){
            location(`/signin`)
        }else{
            location(`/getAllUserSavedSearches/${userInfo?._id}`)
        }
    }

    // navigating towards saved properties
    const savedProperties = () => {
        if(userInfo === {}){
            location(`/signin`)
        }else{
            location(`/allSavedProperties/${userInfo?._id}`)
        }
    }

    return (
        <>
            <div className="editProfileMainDiv" >
                {
                    userInfo?.profilePic !== "" ? (
                        <img alt="user Avatar" style={{width : '150px'  , height : '150px' , borderRadius : '50%' , marginBottom : '15px'}} src={userInfo?.profilePic} />
                    ) : (
                        <img alt="user Avatar" style={{width : '150px'  , height : '150px' , borderRadius : '50%' , marginBottom : '15px'}} src="https://img.freepik.com/free-vector/mysterious-mafia-man-wearing-hat_52683-34829.jpg?size=338&ext=jpg" />
                    )
                }
                {
                    userInfo?.name  ? (
                        <Typography className="name" >{userInfo?.name}</Typography>
                    ) : (
                        <Typography className="name" style={{color : '#c0392b'}} >User Name Not Found</Typography>
                    )
                }
                <div style={{display : 'flex' , flexDirection : 'column' , width : '100%' , marginTop : '15px'}} >
                    <Button className="profileBtns" block icon={<EditOutlined style={{fontSize : '18px' , color : '#0984e3'}} />} onClick={editProfile} >Edit Profile</Button>
                    <Button className="profileBtns" block icon={<SaveOutlined style={{fontSize : '18px' , color : '#0984e3'}} />} onClick={savedSearches} >Saved Searches</Button>
                    <Button className="profileBtns" block icon={<SaveOutlined style={{fontSize : '18px' , color : '#0984e3'}} />} onClick={savedProperties} >Saved Properties</Button>
                </div>
            </div>
        </>
    )
}

export default EditProfilesideBar
