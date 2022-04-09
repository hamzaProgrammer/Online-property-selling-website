import React , {useState , useEffect} from 'react'
import {Typography  , notification , Alert , Divider , Tag , Row , Col } from 'antd';
import {getAllSavedSearches  } from '../../../server_api/Api'
import {useParams} from 'react-router-dom'
import InnerComp from './InnerComp'
import './SavedSearches.css'
import {useNavigate} from 'react-router-dom'

const EditPortion = () => {
    const [ userInfo , setuserInfo ] = useState({});
    const [ isRender  , setIsRender ] = useState(false);
    const {id} = useParams();
    const location = useNavigate();
    useEffect(() => {
        setIsRender(false)
        const getData = async () => {
            const {data} = await getAllSavedSearches(id);
            setuserInfo(data?.SavedSearches)
        }
        getData();
    } , [location , id])

    // rendering on deleting any saved search
    useEffect(() => {
        const getData = async () => {
            const {data} = await getAllSavedSearches(id);
            setuserInfo(data?.SavedSearches)
        }
        getData();
    } , [isRender])

    return (
        <>
            <div className="editProfileSecDiv" >
                <Typography className="editprofileMainHead" >Your Saved Searches</Typography>
                {

                    userInfo.length > 0 ? (
                        Object.values(userInfo)?.map((item) => (
                            <>
                                <InnerComp item={item} setIsRender={setIsRender} />
                                <Divider style={{backgroundColor : '#8395a7'}} />
                            </>
                        ))
                    ) : (
                        <Typography style={{fontSize : '22px' , fontWeight : 600 , textAlign : 'center' , marginTop : '50px' , color : '#c0392b' }} >No Saved Searches Available</Typography>
                    )

                }
            </div>
        </>
    )
}

export default EditPortion
