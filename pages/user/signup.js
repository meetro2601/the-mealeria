import { TextField, Button } from "@mui/material";
import Link from "next/link";
import {createUserWithEmailAndPassword, getAuth, updateProfile} from 'firebase/auth'
import { useRouter } from "next/router";
import { useState } from "react";
import {db} from '../../firebase/firebaseconfig'

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@[a-zA-Z0-9-]{2,})+(.[a-zA-Z0-9-]{2,})+(?:.[a-zA-Z0-9-]{2,})*$/;
const pswrdRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])\w*$/;

export default function Signup() {
  const router = useRouter()

  const [userInfo, setuserInfo] = useState({
    name:'',
    email: "",
    password: "",
  });

  const [errors, seterrors] = useState({
    nameError:false,
    emailError: false,
    passwordError: false,
  });

  const [errorMsg, seterrorMsg] = useState({
    nameErrMsg:'',
    emailErrMsg: "",
    passwordErrMsg: "",
  });

  const changeHandler = (e) => {
    let { id, value } = e.target;
    setuserInfo({ ...userInfo, [id]: value });

    if(id === 'name'){
      if(value && value.length < 3){
        seterrors({ ...errors, nameError: true });
        seterrorMsg({
          ...errorMsg,
          nameErrMsg: "Name must be atleast 3 characters long",
        });
      } else {
        seterrors({ ...errors, nameError: false });
      }
    }
    else if (id === "email") {
      if (value && !emailRegex.test(value)) {
        seterrors({ ...errors, emailError: true });
        seterrorMsg({
          ...errorMsg,
          emailErrMsg: "Invalid Email",
        });
      } else {
        seterrors({ ...errors, emailError: false });
      }
    } else if (id === "password") {
      if(value && value.length < 6){
        seterrors({ ...errors, passwordError: true });
        seterrorMsg({
          ...errorMsg,
         passwordErrMsg: "Password must be atleast 6 characters long",
        });
      }
       else if (value && !pswrdRegex.test(value)) {
            seterrors({ ...errors, passwordError: true });
            seterrorMsg({
              ...errorMsg,
             passwordErrMsg: "Password should be alphanumeric value with only underscore(_) allowed",
            });
          } else {
            seterrors({ ...errors,passwordError: false });
          }
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();

    if (!userInfo.name && !userInfo.email && !userInfo.name) {
      seterrors({
        nameError: true,
        emailError: true,
        passwordError: true
      });
      seterrorMsg({
        nameErrMsg: "Name Required",
        emailErrMsg: "Email Required",
        passwordErrMsg:'Password Required'
      });
    }
    else if (!userInfo.email && !userInfo.name) {
      seterrors({
        ...errors,
        nameError: true,
        emailError: true,
      });
      seterrorMsg({
        ...errorMsg,
        nameErrMsg: "Name Required",
        emailErrMsg: "Email Required",
      });
    }
    else if (!userInfo.name && !userInfo.password) {
      seterrors({
        ...errors,
       nameError: true,
        passwordError: true,
      });
      seterrorMsg({
        ...errorMsg,
        nameErrMsg: "Name Required",
        passwordErrMsg: "Password Required",
      });
    }
    else if (!userInfo.email && !userInfo.password) {
      seterrors({
        ...errors,
        emailError: true,
        passwordError: true,
      });
      seterrorMsg({...errorMsg,
        emailErrMsg: "Email Required",
        passwordErrMsg: "Password Required",
      });
    }  else if (!userInfo.name) {
      seterrors({ ...errors, nameError: true });
      seterrorMsg({
        ...errorMsg,
       nameErrMsg: "Name Required",
      });
    }  else if (!userInfo.email) {
      seterrors({ ...errors, emailError: true });
      seterrorMsg({
        ...errorMsg,
        emailErrMsg: "Email Required",
      });
    } else if (!userInfo.password) {
      seterrors({ ...errors, passwordError: true });
      seterrorMsg({
        ...errorMsg,
        passwordErrMsg: "Password Required",
      });
    }else{
      const auth = getAuth();
      createUserWithEmailAndPassword(auth,userInfo.email,userInfo.password)
      .then(userCredential => { 
        updateProfile(
          userCredential.user,{displayName:userInfo.name}
        ).then(res => {
          alert('Signed Up Successfully')
          router.push('/user/login')
          setuserInfo({
            name:"",
            email: "",
            password: "",
          })
        })
      })
      .catch(err=>alert(err.message))
    }
  };

  return (
    <div className="container col-lg-4 my-5 p-4 border text-center">
      <h3 className="py-2">SignUp</h3>
      <form className="my-3">
        <TextField
          className="w-100 mb-3"
          id="name"
          label="Name"
          variant="standard"
          value={userInfo.name}
          onChange={changeHandler}
          error={errors.nameError}
          helperText={errors.nameError ? errorMsg.nameErrMsg : ""}
        />
        <TextField
          className="w-100 mb-3"
          id="email"
          label="Email Id"
          variant="standard"
          value={userInfo.email}
          onChange={changeHandler}
          error={errors.emailError}
          helperText={errors.emailError ? errorMsg.emailErrMsg : ""}
        />
        <TextField
          className="w-100 mb-3"
          id="password"
          label="Password"
          value={userInfo.password}
          onChange={changeHandler}
          error={errors.passwordError}
          helperText={errors.passwordError ? errorMsg.passwordErrMsg : ""}
          variant="standard"
        />
        <Button
          onClick={submitHandle}
          className="my-4"
          variant="contained"
          color="success"
        >
          SignUp
        </Button>
      </form>
      <Link href="/user/login">Have an Account?</Link>
    </div>
  );
}
