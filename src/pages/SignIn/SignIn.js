import React , {useState} from 'react'
import {Grid , Box , TextField , Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'
import { Button } from 'antd';
import { Spin ,Alert, notification} from 'antd';
import {useNavigate , Link} from 'react-router-dom'
import {signInAdmin} from '../../server_api/Api'

const useStyles = makeStyles(() => ({
    head : {
        paddingTop: '100px',
        background : '#ecf0f1',
        minHeight : '102vh'
    },
    box : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        background : '#FFFFFF',
        borderRadius : '10px',
        padding: '10px 15px',
        alignItems : 'center',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
    },
    textfield : {

    },
    mainText : {
        textAlign : 'left',
        fontSize : '25px',
        fontWeight : 600,
        color: '#524eb7',
        marginBottom: '10px'
    },
    text : {
        color: '#2e3131',
        fontWeight : 600,
        fontSize : '22px',
        marginTop: '20px'
    },
    btn : {
        color : '#FFFFFF',
        background: '#524eb7',
        border : 'transparent',
        marginTop: '20px',
        borderRadius : '10px',
        '&:hover' : {
            background : '#FFFFFF',
            color: '#c23616',
            border: '1px solid #c23616'
        }
    },
    signin : {
        color: '#303952',
        fontSize : '15px',
        marginTop: '25px',
        textDecoration : 'underline',
        '@media screen  and (max-width: 320px )': {
            fontSize : '14px'
        }
     },
}))


const init = {
    email : '',
    password : ''
}

const SignUp = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [userData , setUserData ] = useState(init);
    const [ showLoader , setShowLoader ] = useState(false)
    const [isSuccess , setIsSuccess ] = useState(false)
    const [isError , setIsError] = useState(false)
    const [errorMsg  , seterrorMsg ] = useState('')

    // notification
    const openNotification = () => {
        const args = {
            message: 'Sign In SuccessFull',
            duration: 3,
            style: {
                border: '1px solid #FFFFFF',
                background: '#2ecc71',
            },
        };
        notification.open(args);
    };

    const handleSubmit = async () => {
        setShowLoader(true);
        setIsSuccess(false);
        setIsError(false)
        const updProf = async () => {
            const { data} = await signInAdmin(userData);
            console.log("res : ", data)
            if (data?.success === true) {
                    openNotification()
                    setIsSuccess(true)
                    localStorage.setItem("profile", JSON.stringify(data));
                    navigate("/")
            } else {
               seterrorMsg(data?.message)
                setIsError(true)
            }
            setShowLoader(false)
        }
        updProf();
    }
  return (
    <>
        <Grid container spacing={2} className={classes.head} >
            <Grid item xs={0.5} sm={1} md={4}>
            </Grid>
            <Grid item xs={11} sm={10} md={4}>
                <Box className={classes.box}>
                    <Typography className={classes.mainText} >Welcome to Retailors</Typography>
                    <Typography className={classes.text}>Log In Now</Typography>
                    {
                        isSuccess  === true && (
                            <Alert
                                message="Sign In SuccessFull"
                                type="success"
                                showIcon
                                closable
                                style={{minWidth : '100%'}}
                            />
                        )
                    }
                    {

                        isError === true && (
                             <Alert
                                message="Operation UnSuccessFull"
                                showIcon
                                closable
                                description={errorMsg}
                                style={{minWidth : '100%'}}
                                type="error"
                            />
                        )
                    }
                    <TextField id="standard-basic" label="Email" variant="standard"
                        fullWidth
                        className={classes.textfield}
                        autoFocus
                        required
                        placeholder="admin@gmail.com"
                        type = "email"
                        value={userData?.email}
                        name="email"
                        onChange={(e) => setUserData({...userData , [e.target.name] : e.target.value })}
                        InputLabelProps={{
                            style: {
                                color: '#353b48'
                            }
                        }}
                        InputProps={{
                            style: {
                                borderBottom : '1px solid transparent',
                                //color : '#1C6786'
                            }
                        }}
                    />
                    <TextField id="standard-basic" label="Password" variant="standard"
                        fullWidth
                        required
                        placeholder="7%40%$*/-T53Wqs"
                        type = "password"
                        style={{marginTop: '15px'}}
                        value={userData?.password}
                        name="password"
                        onChange={(e) => setUserData({...userData , [e.target.name] : e.target.value })}
                        InputLabelProps={{
                            style: {
                                color: '#353b48'
                            }
                        }}
                        InputProps={{
                            style: {
                                borderBottom : '1px solid #1C6786',
                                color : '#1C6786'
                            }
                        }}
                    />
                    {
                        showLoader === true ? (
                            <Spin tip="Wait..." style={{marginTop: '5px'}} >
                                 <Button
                                    type="primary"
                                    onClick={handleSubmit}
                                    className={classes.btn}
                                >
                                Sign Up
                            </Button>
                            </Spin>
                        ) : (
                            <Button
                                    type="primary"
                                    onClick={handleSubmit}
                                    className={classes.btn}
                                >
                                Sign In
                            </Button>
                        )
                    }
                    <Link to="/signup" style={{textDecoration : 'none'}} >
                        <Typography className={classes.signin}>Do not have an Account? Sign Up Now</Typography>
                    </Link>
                </Box>
            </Grid>
            <Grid item xs={0.5} sm={1} md={4}>
            </Grid>
        </Grid>
    </>
  )
}

export default SignUp