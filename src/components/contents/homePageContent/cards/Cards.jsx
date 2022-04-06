import React from 'react';
import { Typography,Row, Col, Card, Button } from 'antd';
import './Cards.css'

const { Meta } = Card;

const MyCards = () => {
  return (
    <>
        <div className="homeCards" >
            <Row>
                <Col xs={4} sm={4} md={8}></Col>
                <Col xs={16} sm={16} md={8} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center'}} >
                    <Typography className="cardMainTitle">See how Trulia can help you</Typography>
                </Col>
                <Col xs={4} sm={4} md={8}></Col>
            </Row>
            <Row style={{marginTop : '5px'}} >
                <Col xs={24} sm={8} md={{span : 5 , offset : 5}} >
                    <Card className="myCard">
                        <div className="cardData" >
                            <img alt="Service Logo" style={{maxWidth : '130px' , maxHeight : '130px'}} src="https://www.trulia.com/images/icons/txl3/illustrations/BuyAHome.svg"  />
                            <Typography className="cardHead">Buy a Home</Typography>
                            <Typography className="cardText">
                                In publishing and graphic design, Lorem ipsum is a placeholde relying on meaningful content. placeholde relying
                            </Typography>
                            <Button className="cardBtn" >Find a Home</Button>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={8} md={5}>
                    <Card className="myCard">
                        <div className="cardData" >
                            <img alt="Service Logo" style={{maxWidth : '130px' , maxHeight : '130px'}} src="https://www.trulia.com/images/icons/txl3/illustrations/RentAHome.svg"  />
                            <Typography className="cardHead">Rent a Home</Typography>
                            <Typography className="cardText">
                                With 35+ filters and custom keyword search, Trulia can help you easily find a home or apartment for rent that you'll love.
                            </Typography>
                            <Button className="cardBtn" >Find a Rental</Button>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={8} md={5}>
                    <Card className="myCard">
                        <div className="cardData" >
                            <img alt="Service Logo" style={{maxWidth : '130px' , maxHeight : '130px'}} src="https://www.trulia.com/images/icons/txl3/illustrations/Neighborhoods.svg"  />
                            <Typography className="cardHead">see a Neigbhour</Typography>
                            <Typography className="cardText">
                                With more neighborhood insights than any other real estate website, we've captured the color and diversity of communities.
                            </Typography>
                            <Button className="cardBtn" >Learn more</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    </>
  );
}

export default MyCards;
