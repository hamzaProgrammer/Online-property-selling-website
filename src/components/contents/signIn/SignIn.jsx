import React , {useState} from 'react';
import { Row, Col ,Typography ,Form, Input, Button , Carousel , Alert } from 'antd';
import './SignIn.css'
import {signInAdmin} from '../../../server_api/Api'
import {Link , useNavigate } from 'react-router-dom'



const init = {
    email : '',
    password : '',
}

const SignUp = () => {
    const [ userDataSignIn , setUserData ] = useState(init)
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const location = useNavigate();

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [isSuccess , setSuccess ] = useState(false)
    const [isError , setError ] = useState(false)
    const [msg , setMsg ] = useState("")

    const moveToSignIn = () => {
        location(-1)
    }

    const handleSignIn = async () => {
        setSuccess(false);
        setError(false);
        setMsg(false);
        if(userDataSignIn?.email === "" || userDataSignIn?.password === "" || userDataSignIn?.address === "" ){
            setError(true);
            setMsg("Please Fill All Required Fileds")
        }else{
            const {data} = await signInAdmin(userDataSignIn);
            if(data?.success === true){
                setSuccess(true);
                setMsg("User Sign In SuccessFully");
                localStorage.setItem("profile", JSON.stringify(data));
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
                <Link to="/" >
                    <Typography className="signInLogo">Trulia</Typography>
                </Link>
                <div className="signUpCompDiv" >
                    <Typography className="SignInFormHead">Welcome Back !  </Typography>
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
                            <Alert message={msg}  type="error" showIcon closable />
                        )
                    }
                    <Form.Item
                        label="Email"
                        name="username"
                        className="formItemHead"
                        style={{fontWeight : 700}}
                    >
                        <Input className="formItemSignUp" placeholder="jhone@gmail.com" name="email" value={userDataSignIn?.email} onChange={(e) => setUserData({...userDataSignIn , [e.target.name] : e.target.value })} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"  
                        className="formItemHead"
                        style={{fontWeight : 700}}
                    >
                        <Input.Password className="formItemSignUp" placeholder="3:6F)ED£O!N74?-%Wqg48" name="password" value={userDataSignIn?.password} onChange={(e) => setUserData({...userDataSignIn , [e.target.name] : e.target.value })} />
                    </Form.Item>
                    <Link to="/forgetPassword">
                        <Typography className="forgetPass">forget Password?</Typography>
                    </Link>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button block className="signinBtn"  onClick={handleSignIn} >
                            Sign In
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
                 <Link to="/signup">
                    <Typography className="SignInAltText">Do not have an Account yet? Sign Up Here</Typography>
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

export default SignUp;
