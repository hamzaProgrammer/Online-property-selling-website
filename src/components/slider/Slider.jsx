import React from 'react'
import { Carousel,Space,Typography, Button } from 'antd';
import { WeiboCircleOutlined } from '@ant-design/icons';
import './Slider.css'



const Slider = () => {
    return (
        <>
            <Carousel effect="fade">
                <div className="divStyling" >
                    <Typography className="title">Web Development And Designing</Typography>
                    <Typography className="desc">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available</Typography>
                    <Space direction="horizontal" className="btns" >
                        <Button className="firstBtn" shape="round" icon={<WeiboCircleOutlined style={{fontSize : '22px'}} />} size="medium">
                            Explore
                        </Button>
                        <Button className="secBtn" shape="round"  size="medium">
                            Check Now
                        </Button>
                    </Space>
                </div>
                <div className="divStyling" >
                    <Typography className="title">Game Development</Typography>
                    <Typography className="desc">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available</Typography>
                    <Space direction="horizontal" className="btns" >
                        <Button className="firstBtn" shape="round" icon={<WeiboCircleOutlined style={{fontSize : '22px'}} />} size="medium">
                            Explore
                        </Button>
                        <Button className="secBtn" shape="round"  size="medium">
                            Check Now
                        </Button>
                    </Space>
                </div>
                <div className="divStyling" >
                    <Typography className="title">Graphics Designing</Typography>
                    <Typography className="desc">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available</Typography>
                    <Space direction="horizontal" className="btns" >
                        <Button className="firstBtn" shape="round" icon={<WeiboCircleOutlined style={{fontSize : '22px'}} />} size="medium">
                            Explore
                        </Button>
                        <Button className="secBtn" shape="round"  size="medium">
                            Check Now
                        </Button>
                    </Space>
                </div>
                <div className="divStyling" >
                    <Typography className="title">Mobile Apps Development</Typography>
                    <Typography className="desc">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available</Typography>
                    <Space direction="horizontal" className="btns" >
                        <Button className="firstBtn" shape="round" icon={<WeiboCircleOutlined style={{fontSize : '22px'}} />} size="medium">
                            Explore
                        </Button>
                        <Button className="secBtn" shape="round"  size="medium">
                            Check Now
                        </Button>
                    </Space>
                </div>
            </Carousel>
        </>
    )
}

export default Slider
