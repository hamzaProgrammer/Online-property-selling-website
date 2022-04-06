import React , {useState} from 'react';
import {Space , Image ,  Anchor, Dropdown , Typography , Input , Modal } from 'antd'
import {MenuFoldOutlined , SearchOutlined} from '@ant-design/icons'
import './NewHeaderStyles.css'


const { Link } = Anchor;
const { Search } = Input;

const NewSidebar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const menu = (
    <Anchor>
      <div className="dropMenu" >
        <Link href="#hero" className="linkItem"> <Typography className="linkItemText" >Home</Typography> </Link>
        <Link href="#about"  className="linkItem"> <Typography className="linkItemText" >About</Typography></Link>
        <Link href="#feature" className="linkItem"> <Typography className="linkItemText" >Features</Typography></Link>
      </div>
    </Anchor>
    );
    const onSearch = value => console.log(value);
  return (
    <>
        <Space direction="horizontal" className="mainSpace">
            <div className="logoDiv">
                <Image
                  className="logoImage"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/2048px-Xiaomi_logo.svg.png"
                />
            </div>
            <div  className="searchField" >
              <Search className="search" allowClear={true} onPressEnter={onSearch} size="medium" enterButton  placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
              <SearchOutlined onClick={showModal} className="searchIcon" />
            </div>
            <div  className="flexDiv" ></div>
            <div style={{flex : 1}}></div>
            <div className="myMenu" >
                <Anchor>
                  <div style={{display : 'flex' , justifyContent : 'space-between' , alignItems : 'center'}}>
                    <Link href="#hero" className="linkItem"> <Typography className="linkItemText" >Home</Typography> </Link>
                    <Link href="#about"  className="linkItem"> <Typography className="linkItemText" >About</Typography></Link>
                    <Link href="#feature" className="linkItem"> <Typography className="linkItemText" >Features</Typography></Link>
                  </div>
                </Anchor>
            </div>
            <div className="menuIcon">
              <Dropdown overlay={menu} trigger={['click']}  >
                  <MenuFoldOutlined  />
              </Dropdown>
            </div>
        </Space>

        <Modal title="Search Here" maskClosable = {false} visible={isModalVisible} onCancel={handleCancel}>
          <Search  allowClear={true} onPressEnter={onSearch} size="medium" enterButton  placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
        </Modal>
    </>
  );
}

export default NewSidebar;
