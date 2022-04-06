import React , {useState , useEffect } from 'react'
import './SavedSearches.css'
import { Tag , Row , Col , Popconfirm , message , notification } from 'antd';
import {FolderViewOutlined , DeleteOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import {deleteSavedSearch} from '../../../server_api/Api'

const InnerComp = ({item ,setIsRender}) => {
    const [ myUrl , setUrl ] = useState("")
    const [ user , setUser ] = useState("")
    const [ mySendArray , setMyArray ] = useState([]);


    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Saved Search Removed SuccessFully',
        });
    };


    useEffect(() => {
        let text = item?.savedSearch
        const myArray = text.split("?")
        toString(myArray[1])
        setUrl(myArray[1])
        const yourArray = myArray[1].split("&")
        const length = yourArray?.length;
        toString(yourArray[1]);
        let newArray = [];
        for(let i =0; i !== length; i++){
            let ourArray = yourArray[i].split("=")
            newArray.push(ourArray)
        }
        setMyArray(newArray)
    },[item])

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
    }, [item])

        // Popconfirm
        function confirm(value) {
            const deleteSearch = async () =>{
                const {data} = await deleteSavedSearch(user , value)
                if(data?.success){
                    setIsRender(true)
                }else{
                    openNotificationWithIcon('error')
                    setIsRender(false)
                }
            }
            deleteSearch()
        }

        function cancel(e) {
        }

        return (
        <>
            <div className="savedSearchesDiv" >
                <div style={{display : 'flex' , justifyContent : 'space-between' ,marginBottom : '10px' , alignItems : 'center'}} >
                    <Row>
                        {
                            mySendArray?.map((itemOne) => (
                                <Col xs={14} sm={14} md={8} lg={8} xl={8} style={{marginBottom : '10px'}} >
                                    <Tag color="red">{itemOne[0]} : {itemOne[1]}</Tag>
                                </Col>
                            ))
                        }
                    </Row>
                </div>
                <div className="lowerSaved" >
                    <Link to={`/showSavedSearchData?${myUrl}`} target="_blank" >
                        <FolderViewOutlined style={{color : '#273c75' , fontWeight: 600 , fontSize : '25px' , marginRight : '15px' , cursor : 'pointer'}}  />
                        <Popconfirm
                            title="Are you sure to delete this Saved Search?"
                            onConfirm={() => confirm(item?._id)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <DeleteOutlined style={{color : '#c23616' , fontWeight: 600 , fontSize : '25px' , cursor : 'pointer'}}  />
                        </Popconfirm>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default InnerComp
