import React , {useState} from 'react'
import { Row, Col,Button ,Menu, Dropdown ,Typography, Checkbox, Drawer} from 'antd';
import { DownOutlined ,MenuOutlined} from '@ant-design/icons';
import './FilterBtns.css'

const FilterButtons = () => {
    // for drawer
    const [visible, setVisible] = useState(false);
    const openDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

  // for checkbox
    const  changeHomeType = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }
    const minPrice = (
        <Menu className="priceRngMenu" >
            <Menu.Item className="priceRngMenuItem" >
                150 ($)
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                300 ($)
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                450 ($)
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                800 ($)
            </Menu.Item>
        </Menu>
    )
    const maxPrice = (
        <Menu className="priceRngMenu" >
            <Menu.Item className="priceRngMenuItem" >
                950 ($)
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                1200 ($)
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                2500 ($)
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                5000 ($)
            </Menu.Item>
        </Menu>
    )
    // price menu
    const priceMenu = (
    <div className="priceRanger" >
        <Typography  className="priceRangerHead">Select Price Range</Typography>
        <div className="priceDrop">
            <Dropdown overlay={minPrice} className="inputPrice" placement="bottomLeft" arrow >
                <Button>Min <DownOutlined style={{fontSize : '15px' , fontWeight : 700}} /></Button>
            </Dropdown>
            <Dropdown overlay={maxPrice} className="inputPrice" placement="bottomLeft" arrow >
                <Button>Max <DownOutlined style={{fontSize : '15px' , fontWeight : 700}} /></Button>
            </Dropdown>
        </div>
        </div>
    );

    //bedroom menu
    const bedRoomMenu = (
        <Menu className="priceRngMenu bedRooms"  >
            <Menu.Item className="priceRngMenuItem" >
                1+
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                2+
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                3+
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                4+
            </Menu.Item>
        </Menu>
    )

    // all home types menu
    const HomeTypesMenu = (
        <Menu className="priceRngMenu"  >
            <Menu.Item className="priceRngMenuItem" >
                <Checkbox onChange={changeHomeType} className="homeCheckBox"  >Home</Checkbox>
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                <Checkbox onChange={changeHomeType} className="homeCheckBox">Condo</Checkbox>
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                <Checkbox onChange={changeHomeType} className="homeCheckBox">Multifamily</Checkbox>
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                <Checkbox onChange={changeHomeType} className="homeCheckBox">Land</Checkbox>
            </Menu.Item>
            <Menu.Item className="priceRngMenuItem" >
                <Checkbox onChange={changeHomeType} className="homeCheckBox">Others</Checkbox>
            </Menu.Item>
        </Menu>
    )
    return (
        <>
                <Row style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' , height : '60px'}} >
                    <Col xs={24} sm={20} md={20} lg={15} >
                        <div className="filterButtons" >
                            <Button className="filterBtn">Agent Listings  (500+)</Button>
                            <Button className="filterBtn dull hideDull otherBtn">Other (161)</Button>
                            <Dropdown overlay={priceMenu} className="filterBtn filterHideSec" placement="bottomLeft" arrow >
                                <Button>Any Price <DownOutlined style={{fontSize : '15px' , fontWeight : 700}} /></Button>
                            </Dropdown>
                            <Dropdown overlay={bedRoomMenu} className="filterBtn filterHideFirst" placement="bottomLeft" arrow >
                                <Button>Bedrooms <DownOutlined style={{fontSize : '15px' , fontWeight : 700}} /></Button>
                            </Dropdown>
                            <Dropdown overlay={HomeTypesMenu} className="filterBtn filterHideFirst" placement="bottomLeft" arrow >
                                <Button>Home Types <DownOutlined style={{fontSize : '15px' , fontWeight : 700}} /></Button>
                            </Dropdown>
                            <Button className="filterBtn borderBtn filterHideFirst hideSearch">Save Search</Button>
                            <MenuOutlined className="filterMenu" onClick={openDrawer} />
                        </div>
                    </Col>
                </Row>

                <Drawer
                    title="Search Filters"
                    placement="right"
                    width={250}
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <div className="drawerFirstDiv" >
                        <Dropdown overlay={bedRoomMenu} trigger={['click']} className="filterBtn" placement="bottomLeft" arrow  >
                            <Button style={{marginBottom : '10px'}} >Bedrooms <DownOutlined style={{fontSize : '15px' , fontWeight : 700}} /></Button>
                        </Dropdown>
                        <Dropdown overlay={HomeTypesMenu} trigger={['click']} className="filterBtn" placement="bottomLeft" arrow >
                            <Button style={{marginBottom : '10px'}}>Home Types <DownOutlined style={{fontSize : '15px' , fontWeight : 700}} /></Button>
                        </Dropdown>
                        <Button className="filterBtn borderBtn">Save Search</Button>
                    </div>
                    <div className="drawerFirstDivSec" >
                        <Dropdown overlay={priceMenu} trigger={['click']} className="filterBtn priceBtn" placement="bottomLeft" arrow  >
                            <Button style={{marginBottom : '10px'}} >Any Price <DownOutlined style={{fontSize : '15px' , fontWeight : 700}} /></Button>
                        </Dropdown>
                    </div>
                    <Button className="filterBtn dull showDull" style={{minWidth : '100%'}} >Other (161)</Button>
                </Drawer>
        </>
    )
}

export default FilterButtons
