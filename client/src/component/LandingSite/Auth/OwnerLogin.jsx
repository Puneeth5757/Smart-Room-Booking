import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, googleProvider, signInWithPopup } from "../../../firebase";
import axios from "axios";

const OwnerLogin = () => {
  const [passShow, setPassShow] = useState(false);
  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = inpval;

    if (email === "") {
      alert("Email is required!");
    } else if (!email.includes("@")) {
      alert("Invalid email format!");
    } else if (password === "") {
      alert("Password is required!");
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters long!");
    } else {
      const data = await fetch("http://localhost:3000/api/owners/login", {
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
        localStorage.setItem("ownersdatatoken", res.result.token);
        localStorage.setItem("authMethod", "token"); // Set the authentication method
        history("/ownerdash");
        setInpval({
          email: "",
          password: "",
        });
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const owner = result.user;

      // Store the UID in localStorage
      localStorage.setItem("uid", owner.uid);

      // Perform login or registration
      await axios.post("http://localhost:3000/api/g-owners/login", {
        uid: owner.uid,
        ownername: owner.displayName,
        email: owner.email,
        phone: "",
        role: "owner",
      });

      localStorage.setItem("authMethod", "google"); // Set the authentication method
      alert("Signed in successfully");
      history("/ownerdash");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("Error signing in with Google: " + error.message);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h2 className="mb-4">
        <b>Welcome back, Owner</b>
      </h2>
      <Form onSubmit={handleLogin} className="w-50">
        <div className="mb-3 px-5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            onChange={setVal}
            value={inpval.email}
            name="email"
            id="email"
            placeholder="Enter Your Email Address"
          />
        </div>
        <div className="mb-3 px-5">
          <label htmlFor="password">Password</label>
          <div className="two">
            <input
              type={!passShow ? "password" : "text"}
              className="form-control"
              onChange={setVal}
              value={inpval.password}
              name="password"
              id="password"
              placeholder="Enter Your password"
            />
            <div
              className="showpass my-3"
              onClick={() => setPassShow(!passShow)}
            >
              {!passShow ? "Show" : "Hide"}
            </div>
          </div>
        </div>

        <Button variant="success" type="submit" className="w-100 mb-3">
          Continue
        </Button>

        <div className="text-center">
          Don’t have an account? <NavLink to="/owner-register">Sign Up</NavLink>
        </div>

        <br />

        <Button
          variant="outline-primary"
          className="w-100 mb-2"
          onClick={handleGoogleSignIn}
        >
          <i className="fab fa-google"></i> Continue with Google
        </Button>
      </Form>
    </Container>
  );
};

export default OwnerLogin;
