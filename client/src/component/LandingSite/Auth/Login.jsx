import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { userAuth, userGoogleProvider, signInWithPopup } from '../../../user-firebase';
import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";

const Login = () => {

  const [passShow, setPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });
  // console.log(inpval)

  const history = useNavigate();


  const setVal = (e) => {
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    if (email === "") {
      alert("password is required!");
    } else if (!email.includes("@")) {
      alert("password is required!");
    } else if (password === "") {
      alert("password is required!");
    } else if (password.length < 6) {
      alert("password must be 6 char!");
    } else {
      const data = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await data.json();
      console.log(res);

      if (res.status === 201) {
        localStorage.setItem("usersdatatoken", res.result.token);
        history("/dashboard");
        console.log("login sucessfully");
        setInpval({
          ...inpval,
          email: "",
          password: "",
        });
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(userAuth , userGoogleProvider);
      const user = result.user;
      // console.log(user);


      await axios.post("http://localhost:3000/api/g-users/login", {
        uid: user.uid,
        username: user.displayName ,
        email: user.email,
        phone: '', 
        role: 'user'
      });

      alert("Signed in successfully");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("Error signing in with Google: " + error.message);
    }
  };
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h2 className="mb-4">Welcome Back</h2>
      <Form onSubmit={handleLogin} className="w-50">

      <div className="mb-3 px-5">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={setVal}
                value={inpval.email}
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="mb-3 px-5">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={setVal}
                  value={inpval.password}
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter Your password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

        <Button variant="success" type="submit" className="w-100 mb-3 px-5">
          Continue
        </Button>

        <div className="text-center px-5">
          Don-t have an account? <NavLink to="/register">Sign Up</NavLink>
          {/* <a href="/register">Sign Up</a> */}
        </div>
        
        <br />

        <Button variant="outline-primary" className="w-100 mb-2" onClick={handleGoogleSignIn}>
          <i className="fab fa-google"></i> Continue with Google
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
