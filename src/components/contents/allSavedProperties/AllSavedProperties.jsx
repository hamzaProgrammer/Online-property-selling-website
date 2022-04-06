import React , {useState , useEffect} from 'react'
import { Row, Col, Typography , Tooltip , notification , Popconfirm } from 'antd';
import './AllSavedProp.css'
import {HeartOutlined} from '@ant-design/icons'
import {useParams} from 'react-router-dom'
import {getAllSavedLaterOfUser , deleteSavedLater} from '../../../server_api/Api'


const AllSavedProperties = () => {
    const [allProperties, setAlLProperties ] = useState({})
    const {id} = useParams();
    const [ changeData , setChangeData ] = useState(false)

    //checking if admin logged in or not
    useEffect(() => {
        const getData = async () => {
            let user = id;
            const {data} = await getAllSavedLaterOfUser(user);
            setAlLProperties(data?.SavedLaters);
        }
        getData();
    }, [id])

    //getting data again as any item gets deleted
    useEffect(() => {
        const getData = async () => {
            let user = id;
            const {data} = await getAllSavedLaterOfUser(user);
            setAlLProperties(data?.SavedLaters);
        }
        getData();
    }, [changeData])

    // deleteing item
    const deleteItem = async (value) => {
        const {data} = await deleteSavedLater(id , value )
        if(data?.success === true){
            setChangeData(true)
        }else{
            openNotificationWithIcon('error')
        }
    }

    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Could Not Remove This Property',
        });
    };

    function cancel(e) {
        console.log(e);
    }

    return(
        <>
            <div className="allSavedPropMainDiv" >
                <Typography className="savedPropHead" >All Saved Properties</Typography>
                {
                    allProperties?.length > 0 ? (
                        <>
                            <Row gutter={[16, 24]}>
                            {
                                allProperties?.map((item) => (
                                    <Col className="gutter-row" xs={24} sm={24} md={12} lg={8} xl={6}>
                                        <div className="mainItem" >
                                            <img alt="Property Cover" className="propCover" src={item?.PropertyImage[1]} />
                                            <div style={{display : 'flex' , justifyContent : 'space-around' , alignItems : 'center' , marginTop : '5px'}} >
                                                <Typography className="PropPrice" >$ {item?.PropertyPrice}</Typography>
                                                <Tooltip placement="topLeft" title="Remove from Save Later">
                                                    <Popconfirm
                                                        title="Are you sure to Remove this Property?"
                                                        onConfirm={() => deleteItem(item?._id)}
                                                        onCancel={cancel}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <HeartOutlined style={{color : '#d63031' , fontSize : '25px' , cursor : 'pointer'}}  />
                                                    </Popconfirm>
                                                </Tooltip>
                                            </div>
                                            <div style={{display : 'flex' , justifyContent : 'space-around' , alignItems : 'center' , marginTop : '5px' , marginBottom : '5px'}} >
                                                <Typography className="SavedPropMiniText" >{item?.PropertyBaths} baths </Typography>
                                                <Typography className="SavedPropMiniText" >{item?.PropertyBedrooms} bedrooms </Typography>
                                                <Typography className="SavedPropMiniText" >{item?.PropertyArea} sq/km </Typography>
                                            </div>
                                            <Typography className="savedPropAdd" > {item?.PropertyAddress}</Typography>
                                        </div>
                                    </Col>
                                ))
                            }
                            </Row>
                        </>
                    ) : (
                        <Typography className="noSavedProp" >No Saved Properties Found</Typography>
                    )
                }
            </div>
        </>
    )
}


export default AllSavedProperties;
