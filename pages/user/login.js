import { TextField, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export default function Login() {

  const router = useRouter();
   
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const [errors, seterrors] = useState({
    emailError: false,
    passwordError: false,
  });

  const changeHandler = (e) => {
    let { id, value } = e.target;
    setuser({ ...user, [id]: value });

    if (id === "email") {
      seterrors({ ...errors, emailError: false });
    } else if (id === "password") {
      seterrors({ ...errors, passwordError: false });
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();
    
    if (!user.email && !user.password) {
      seterrors({
        emailError: true,
        passwordError: true,
      });
    } else if (!user.email) {
      seterrors({ ...errors, emailError: true });
    } else if (!user.password) {
      seterrors({ ...errors, passwordError: true });
    } else {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        alert("Signed In Successfully !!")
        router.push('/')
        setuser({
          email: "",
          password: "",
        })
      })
      
      .catch((err) => alert('Incorrect Email or Password'));
    }
   
  };

  return (
    <div className="container col-lg-4 my-5 p-4 border text-center">
      <h3 className="py-2">Login</h3>
      <form className="my-3">
        <TextField
          error={errors.emailError}
          className="w-100 mb-3"
          id="email"
          label="Email Id"
          variant="standard"
          value={user.email}
          onChange={changeHandler}
          helperText={errors.emailError ? "Email Required" : ""}
        />
        <TextField
          error={errors.passwordError}
          className="w-100 mb-3"
          id="password"
          label="Password"
          value={user.password}
          onChange={changeHandler}
          helperText={errors.passwordError ? "Password Required" : ""}
          variant="standard"
        />
        <Button
          onClick={submitHandle}
          className="my-4"
          variant="contained"
          color="secondary"
        >
          Login
        </Button>
      </form>
      <Link href="/user/signup">Click here for SignUp</Link>
    </div>
  );
}