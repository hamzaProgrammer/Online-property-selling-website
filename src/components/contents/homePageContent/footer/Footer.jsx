import React from 'react'
import { Row, Col, Typography, List  } from 'antd';
import './Footer.css'


const Footer = () => {
    return (
        <>
            <Row style={{marginTop : '20px' , borderTop : '1px solid #ecf0f1' , paddingTop : '15px'}}>
                <Col xs={12} sm={{span : 6 , offset : 0}} md={{span : 4 , offset : 3}}>
                    <div className="singleItem" >
                        <Typography className="mainHead">Company</Typography>
                        <List>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >About Us</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Contact us</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Help & Support</Typography.Text>
                            </List.Item>
                        </List>
                    </div>
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <div className="singleItem" >
                        <Typography className="mainHead">Connect</Typography>
                        <List>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Blog</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >News</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Forum</Typography.Text>
                            </List.Item>
                        </List>
                    </div>
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <div className="singleItem" >
                        <Typography className="mainHead">Head office</Typography>
                        <List>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Sitanbul, Turkey</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >+90 85 74974</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Email us</Typography.Text>
                            </List.Item>
                        </List>
                    </div>
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <div className="singleItem" >
                        <Typography className="mainHead">Follow us</Typography>
                        <List>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Facebook</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Instagram</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Twitter</Typography.Text>
                            </List.Item>
                        </List>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Footer
