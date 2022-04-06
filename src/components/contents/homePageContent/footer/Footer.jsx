import React from 'react'
import { Row, Col, Typography, List  } from 'antd';
import './Footer.css'


const Footer = () => {
    return (
        <>
            <Row style={{marginTop : '20px'}}>
                <Col xs={12} sm={{span : 6 , offset : 0}} md={{span : 4 , offset : 3}}>
                    <div className="singleItem" >
                        <Typography className="mainHead">Real State Markets</Typography>
                        <List>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Albama Real Estate</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Alaska  Real Estate</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Arizona Real Estate</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Manaska Real Estate</Typography.Text>
                            </List.Item>
                        </List>
                    </div>
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <div className="singleItem" >
                        <Typography className="mainHead">Popular Searches</Typography>
                        <List>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Albama Real Estate</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Alaska  Real Estate</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Arizona Real Estate</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Manaska Real Estate</Typography.Text>
                            </List.Item>
                        </List>
                    </div>
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <div className="singleItem" >
                        <Typography className="mainHead">Explore Trulia</Typography>
                        <List>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Albama Real Estate</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Alaska  Real Estate</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Arizona Real Estate</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Manaska Real Estate</Typography.Text>
                            </List.Item>
                        </List>
                    </div>
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <div className="singleItem" >
                        <Typography className="mainHead">For Professionals</Typography>
                        <List>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Albama Real Estate</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Alaska  Real Estate</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Arizona Real Estate</Typography.Text>
                            </List.Item>
                            <List.Item className="listItem" >
                                <Typography.Text className="listText" >Manaska Real Estate</Typography.Text>
                            </List.Item>
                        </List>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Footer
