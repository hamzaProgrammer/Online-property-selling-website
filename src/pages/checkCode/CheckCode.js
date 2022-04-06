import React from 'react'
import '../forgetPassword/ForgetPass.css'
import CheckCode from '../../components/contents/checkOtpCode/ChacekOtp'

const ChangePass = () => {
  return (
    <>
        <div className="signupPageMain" >
            <CheckCode />
        </div>
    </>
  )
}

export default ChangePass