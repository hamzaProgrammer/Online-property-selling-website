import React , {useState , useEffect} from 'react'
import {Typography , Button } from 'antd'
import './EditProfile.css'
import {EditOutlined , SaveOutlined} from '@ant-design/icons'
import {getUserInfo} from '../../../server_api/Api'
import {useParams} from 'react-router-dom'

const EditProfilesideBar = () => {
    const [ userInfo , setuserInfo ] = useState({});
    const {id} = useParams();
    useEffect(() => {
        const getData = async () => {
            const {data} = await getUserInfo(id);
            setuserInfo(data?.User)
        }
        getData();
    } , [id])
    return (
        <>{console.log("userInfo?.profilePic : ",userInfo?.profilePic)}
            <div className="editProfileMainDiv" >
                {
                    userInfo?.profilePic !== "" ? (
                        <img alt="user Avatar" style={{width : '150px'  , height : '150px'}} src={userInfo?.profilePic} />
                    ) : (
                        <img alt="user Avatar" style={{width : '150px'  , height : '150px'}} src="https://img.freepik.com/free-vector/mysterious-mafia-man-wearing-hat_52683-34829.jpg?size=338&ext=jpg" />
                    )
                }
                {
                    userInfo?.name  ? (
                        <Typography className="name" >{userInfo?.name}</Typography>
                    ) : (
                        <Typography className="name" >User Name</Typography>
                    )
                }
                <div style={{display : 'flex' , flexDirection : 'column' , width : '100%' , marginTop : '15px'}} >
                    <Button className="profileBtns" block icon={<EditOutlined style={{fontSize : '18px' , color : '#0984e3'}} />} >Edit Profile</Button>
                    <Button className="profileBtns" block icon={<SaveOutlined style={{fontSize : '18px' , color : '#0984e3'}} />} >Saved Searches</Button>
                </div>
            </div>
        </>
    )
}

export default EditProfilesideBar
