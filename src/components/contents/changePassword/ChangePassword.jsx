import React , {useState} from 'react';
import { Row, Col ,Typography ,Form, Input, Button , Carousel , Alert  } from 'antd';
import '../forgetPassword/ForgetPassword.css'
import {useNavigate , Link} from 'react-router-dom'
import {updatePassword} from '../../../server_api/Api'


const ForgetPassword = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const [myEmail , setMyEmail ] = useState({password : ''});
    const location = useNavigate();


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [isSuccess , setSuccess ] = useState(false)
    const [isError , setError ] = useState(false)

    const [msg , setMsg ] = useState("")

    const moveToSignIn = () => {
        location("/signin")
    }

    const SendEmail = async () => {
        setSuccess(false);
        setError(false);
        setMsg(false);
        if(myEmail=== "" ){
            setError(true);
            setMsg("Please Provide Email")
        }else{
            const userEmail = JSON.parse(localStorage.getItem('userEmail'))
            if(!userEmail){
                setError(true);
                setMsg("User must request for password change first.");
                return;
            }

            const {data} = await updatePassword(myEmail , userEmail);
            console.log("data :", data)
            if(data?.success === true){
                setSuccess(true);
                setMsg(data?.message);
                localStorage.removeItem("userEmail");
                setTimeout(moveToSignIn, 3000)
            }else{
                setError(true);
                setMsg(data?.message)
            }
        }
    }

  return (
    <>
        <Row>
            <Col xs={24} sm={24} md={14} lg={12} className="signupmaindiv" >
                <Typography className="signInLogo">Trulia</Typography>
                <div className="signUpCompDiv" >
                    <Typography className="SignInFormHead">Change Password</Typography>
                    <Form
                        name="basic"
                        layout="vertical"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                    {
                        isSuccess === true && (
                            <Alert message={msg} type="success" showIcon closable  />
                        )
                    }
                    {
                        isError === true && (
                            <Alert message={msg} type="error" showIcon closable />
                        )
                    }
                    <Form.Item
                        label="New Password"
                        name="username"
                        className="formItemHead"
                        style={{fontWeight : 700}}
                    >
                        <Input className="formItemSignUp" type="password" placeholder="ut%3Gdfhy£*hts874" onChange={(e) => setMyEmail({myEmail : e.target.value})} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button block className="signinBtn" onClick={SendEmail} >
                            Update Password
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
                <Link  to="/signin">
                    <Typography className="SignInAltText">Back to Login</Typography>
                </Link>
            </Col>
            <Col xs={0} sm={0} md={8} lg={12}  >
                <Carousel className="signUpcarousel" autoplay >
                    <div>
                        <img alt="Slider Cover" className="slImage" src="https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  />
                    </div>
                    <div>
                        <img alt="Slider Cover" className="slImage" src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aG9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  />
                    </div>
                    <div>
                        <img alt="Slider Cover" className="slImage" src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"  />
                    </div>
                    <div>
                        <img alt="Slider Cover" className="slImage" src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"  />
                    </div>
                </Carousel>
            </Col>
        </Row>
    </>
  );
}

export default ForgetPassword;
