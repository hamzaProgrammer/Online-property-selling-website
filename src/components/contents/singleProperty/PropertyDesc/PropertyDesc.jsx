import React  , {useState , useEffect } from 'react'
import { Row, Col, Typography  } from 'antd';
import './PropertyDesc.css'
import {useParams} from 'react-router-dom'
import {getSingleProperty} from '../../../../server_api/Api'



const { Paragraph, } = Typography;

const PropertyDesc = () => {
    const [propertyData , setPropertyData ] = useState({})
    const {id} = useParams();
    useEffect(() => {
        const getData = async () => {
            const {data} = await getSingleProperty(id);
            console.log("data : ", data?.Property)
            setPropertyData( data?.Property)
        }
        getData();

    } ,[id])
    return(
        <>
            <Row>
                <Col xs={{span : 23 , offset : 1}} sm={{span : 21 , offset : 2}} md={{span : 18 , offset: 3 }} lg={{span : 13 , offset : 3}} style={{ padding: '10px'}} >
                    <div className="descDiv" >
                        <Typography className="DescHead" >Description</Typography>
                        {
                            propertyData ? (
                                <Paragraph className="descText" >
                                    {propertyData?.desc}
                                </Paragraph>
                            ) : (
                                <Paragraph className="descText" >
                                    Could not Found Description of Property
                                </Paragraph>
                            )
                        }
                    </div>
                </Col>
                <Col md={0} lg={4}></Col>
            </Row>
        </>
    )
}

export default PropertyDesc;
