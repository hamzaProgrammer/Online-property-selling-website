import React from 'react';
import { Row, Col, Space , Typography ,Progress , Image } from 'antd';
import './HomeContent.css'
import {HomeOutlined , MoreOutlined } from '@ant-design/icons'
import ReactApexChart from 'react-apexcharts';
import Carousel from '../../slider/Slider'


const HomeContent = () => {
    const state = {
            series: [25, 15, 44, 55, 41, 17],
            options: {
              chart: {
                width: '100%',
                type: 'pie',
              },
              labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              theme: {
                monochrome: {
                  enabled: true
                }
              },
              plotOptions: {
                pie: {
                  dataLabels: {
                    offset: -5
                  }
                }
              },
              title: {
                text: ""
              },
              dataLabels: {
                formatter(val, opts) {
                  const name = opts.w.globals.labels[opts.seriesIndex]
                  return [name, val.toFixed(1) + '%']
                }
              },
              legend: {
                show: false
              }
            },
    }
    const stateOne = {
        series: [{
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }],
        options: {
            chart: {
            type: 'bar',
            maxHeight: 100
            },
            plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
            },
            dataLabels: {
            enabled: false
            },
            xaxis: {
                categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                    'United States', 'China', 'Germany'
                ],
            }
        },
    }
    const stateThree = {
            series: [{
              name: "SAMPLE A",
              data: [
              [16.4, 0], [16.4, 1.8], [13.6, 0.3], [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7], [10.9, 5.2], [16.4, 6.5], [10.9, 0], [24.5, 7.1], [10.9, 0], [8.1, 4.7], [19, 0], [21.7, 1.8], [27.1, 0], [24.5, 0], [27.1, 0], [29.9, 1.5], [27.1, 0.8], [22.1, 2]]
            }],
            options: {
              chart: {
                height: 200,
                type: 'scatter',
                zoom: {
                  enabled: true,
                  type: 'xy'
                }
              },
              xaxis: {
                tickAmount: 10,
                labels: {
                  formatter: function(val) {
                    return parseFloat(val).toFixed(1)
                  }
                }
              },
              yaxis: {
                tickAmount: 7
              }
            },
    }

  return (
    <>
        <Carousel />
        <Space direction="vertical" className="mainContent" >
            <Row>
                <Col xs={24}>
                    <Space direction='vertical' className="mainHead" >
                        <Typography.Title level={2} style={{ margin: 0 }}>
                            Dashboard
                        </Typography.Title>
                        <Typography style={{ margin: 0 }}>
                            Lorem Ispum Lorem Ispum Lorem
                        </Typography>
                    </Space>
                </Col>
            </Row>

            <Row className="row" gutter={[16,24]} >
                <Col  xs={24} md={11}  >
                    <Row className="leftSide">
                        <Col xs={24} >
                            <Row>
                                <Col xs={3} md={2} >
                                    <HomeOutlined className="homeIcon" />
                                </Col>
                                <Col xs={{span : 14 , offset : 1 }} md={{span : 15 , offset : 2}} >
                                    <Space direction='vertical' style={{display : 'flex' , justifyContent: 'center'}} >
                                        <Typography.Title level={5} style={{ margin: 0 , color : '#FFFFFF'  }}>
                                            Total Properties
                                        </Typography.Title>
                                        <Progress percent={80} status="active" strokeColor="#2ecc71" />
                                    </Space>
                                </Col>
                                <Col xs={{span : 3 , offset : 3}} md={{span : 3 , offset : 2}} >
                                    <Typography className="amt" >
                                        455
                                    </Typography>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="bottomSections" >
                        <Col xs={12} >
                            <Row className="bottomLeft">
                                <Col xs={24} md={15} >
                                    <Space direction='vertical' className="text" >
                                        <Typography.Title level={3} style={{ margin: 0  }}>
                                            25588
                                        </Typography.Title>
                                        <Typography level={5} style={{ margin: 0 , fontSize : '12px' , fontWeight : 600 }}>
                                            Properties For Sale
                                        </Typography>
                                    </Space>
                                </Col>
                                <Col xs={24} md={{span :8 , offset:0}}  >
                                    <Progress type="circle" percent={30} width={50} className="progressIcon" />
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} >
                            <Row className="bottomLeft">
                                <Col xs={24} md={15} >
                                    <Space direction='vertical' className="text" >
                                        <Typography.Title level={3} style={{ margin: 0  }}>
                                            25588
                                        </Typography.Title>
                                        <Typography level={5} style={{ margin: 0 , fontSize : '12px' , fontWeight : 600 }}>
                                            Properties For Sale
                                        </Typography>
                                    </Space>
                                </Col>
                                <Col xs={24} md={{span :8 , offset:0}}  >
                                    <Progress type="circle" percent={30} width={50} className="progressIcon" />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={12} className="rightSection" >
                    <Row>
                        <Col xs={10} >
                            <Typography.Title level={5} style={{color : '#2c3e50', fontWeight : 600}} >
                                Total Revenue
                            </Typography.Title>
                        </Col>
                        <Col xs={{span : 2 ,offset : 12}} >
                            <MoreOutlined  className="myIcon" />
                        </Col>
                    </Row>
                    <Row style={{marginTop: '30px'}} >
                        <Col xs={{span : 20 , offset : 2}}>
                            <ReactApexChart options={stateThree.options} series={stateThree.series} type="scatter" height={200} />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col xs={24} md={10} className="bottom" >
                    <Row className="innerRowLeft" gutter={[16,24]} >
                        <Col xs={6}>
                            <Typography className="bottomIcon" >
                                Overview
                            </Typography>
                        </Col>
                        <Col xs={{span : 1 , offset : 15 }}>
                            <MoreOutlined  className="myIcon" />
                        </Col>
                        <Row>
                            <Col xs={{span : 23, offset : 1}}  >
                                {/* <TinyColumn {...config}   /> */}
                                <ReactApexChart options={stateOne.options} series={stateOne.series} type="bar" height={220} style={{minWidth : '100%'}} />
                            </Col>
                        </Row>
                    </Row>
                </Col>
                <Col xs={24} md={{span : 12 , offset : 1 }}>
                    <Row>
                        <Col xs={24} md={11} style={{marginRight : '10px'}} className="mySecFirst" >
                            <Typography className="salesHead" >My Sales</Typography>
                            <ReactApexChart options={state.options} series={state.series} type="pie" className="pieClass" />
                        </Col>
                        <Col xs={24} md={12} >
                            <Row className="mySecRight" >
                                <Col xs={15}>
                                    <Typography className="custHead" >
                                        Customer Reviews
                                    </Typography>
                                </Col>
                                <Col xs={{span : 2 , offset : 6 }}>
                                    <MoreOutlined  className="myIcon" />
                                </Col>
                                <Row style={{minWidth : '100%' , marginTop : '10px'}} >
                                    <Col xs={4} >
                                        <Image
                                            className="userImage"
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        />
                                    </Col>
                                    <Col xs={13} >
                                        <Space direction="vertical" style={{paddingLeft : '5px' , paddingRight : '5px'}} >
                                            <Typography className="userName">Jhone Doe</Typography>
                                        </Space>
                                    </Col>
                                    <Col xs={7} >
                                        <Typography className="time" >5 mins ago</Typography>
                                    </Col>
                                </Row>
                                <Row style={{minWidth : '100%' , marginTop : '10px'}} >
                                    <Col xs={4} >
                                        <Image
                                            className="userImage"
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        />
                                    </Col>
                                    <Col xs={13} >
                                        <Space direction="vertical" style={{paddingLeft : '5px' , paddingRight : '5px'}} >
                                            <Typography className="userName">Jhone Doe</Typography>
                                        </Space>
                                    </Col>
                                    <Col xs={7} >
                                        <Typography className="time" >5 mins ago</Typography>
                                    </Col>
                                </Row>
                                <Row style={{minWidth : '100%' , marginTop : '10px'}} >
                                    <Col xs={4} >
                                        <Image
                                            className="userImage"
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        />
                                    </Col>
                                    <Col xs={13} >
                                        <Space direction="vertical" style={{paddingLeft : '5px' , paddingRight : '5px'}} >
                                            <Typography className="userName">Jhone Doe</Typography>
                                        </Space>
                                    </Col>
                                    <Col xs={7} >
                                        <Typography className="time" >5 mins ago</Typography>
                                    </Col>
                                </Row>
                                <Row style={{minWidth : '100%' , marginTop : '10px'}} >
                                    <Col xs={4} >
                                        <Image
                                            className="userImage"
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        />
                                    </Col>
                                    <Col xs={13} >
                                        <Space direction="vertical" style={{paddingLeft : '5px' , paddingRight : '5px'}} >
                                            <Typography className="userName">Jhone Doe</Typography>
                                        </Space>
                                    </Col>
                                    <Col xs={7} >
                                        <Typography className="time" >5 mins ago</Typography>
                                    </Col>
                                </Row>
                                <Row style={{minWidth : '100%' , marginTop : '10px'}} >
                                    <Col xs={4} >
                                        <Image
                                            className="userImage"
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        />
                                    </Col>
                                    <Col xs={13} >
                                        <Space direction="vertical" style={{paddingLeft : '5px' , paddingRight : '5px'}} >
                                            <Typography className="userName">Jhone Doe</Typography>
                                        </Space>
                                    </Col>
                                    <Col xs={7} >
                                        <Typography className="time" >5 mins ago</Typography>
                                    </Col>
                                </Row>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Space>
    </>
  );
}

export default HomeContent;
