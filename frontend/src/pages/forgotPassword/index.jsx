import React, { useState } from "react";
import styles from "./style.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { otpRequest,reset_password } from "@/config/redux/action/authAction";


export default function ForgotPassword() {
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch=useDispatch();
  const [isForgot, setIsForgot] = useState(false);
   const [email,setEmail]=useState("");
  const [otp,setOtp]=useState("");
  const [newPassword,setNewPassword]=useState("");
  const handleOtpRequest = () => {
    
    dispatch(otpRequest({email}));
    
  };

  const handlePasswordReset = () => {
    // Add your password reset logic here
    router.push("/login");
  };

  const submitNewPassword = () => {
    dispatch(reset_password({email,otp,newPassword})).then(() => {
      router.push("/login");
    }).catch((error) => {
      console.error("Error submitting new password:", error);
    });
  };


  return (
    <>
      {isForgot ? (
        <div className={styles.firstParent}>
          <div className={styles.firstContainer}>
            <div className={styles.firstInput}>
              <div>
                <h2>Reset Password</h2>
              </div>
              <div className={styles.firstForm}>
                <input onChange={(e)=>setEmail(e.target.value)}
                  className={styles.inputField}
                  type="text"
                  placeholder="Email"
                ></input>
                <br></br>
                <input onChange={(e)=>setOtp(e.target.value)}
                  className={styles.inputField}
                  type="text"
                  placeholder="OTP"
                ></input>
                <br></br>
                <input onChange={(e)=>setNewPassword(e.target.value)}
                  className={styles.inputField}
                  type="password"
                  placeholder="New Password"
                ></input>
                <br></br>
              </div>
            </div>
          </div>
          <div className={styles.firstParentButton}>
            <div className={styles.firstSubmit} onClick={()=>{
              submitNewPassword();
            }}>
              Submit
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.mainInputContainer}>
            <div className={styles.inputContainer}>
              <h2>Enter Your gmail (High Credential)</h2>
              <input onChange={(e)=>setEmail(e.target.value)} className={styles.inputField} type="text" placeholder="Email"/>
            </div>
          </div>
          <div className={styles.submit}>
            <div style={{cursor:"pointer"}}className={styles.submitButton} onClick={()=>{
              handleOtpRequest();
              setIsForgot(!isForgot);
            }}>
              Submit
            </div>
          </div>
        </div>
      )}
    </>
  );
}
