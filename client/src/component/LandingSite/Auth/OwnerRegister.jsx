import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { auth, googleProvider, signInWithPopup } from "../../../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const OwnerSignUp = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    ownername: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const history = useNavigate();

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { ownername, email, phone, password, cpassword } = inpval;

    if (
      ownername === "" ||
      email === "" ||
      phone === "" ||
      password === "" ||
      cpassword === ""
    ) {
      alert("All fields are required!");
      return;
    } else if (phone.length !== 10) {
      alert("Phone number is invalid!");
      return;
    } else if (!email.includes("@")) {
      alert("Email is invalid!");
      return;
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    } else if (password !== cpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/owners/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ownername,
            email,
            phone,
            password,
            cpassword,
          }),
        }
      );

      const res = await response.json();

      if (response.status === 201) {
        history("/owner-login");
        alert("Registration Successful!");
        setInpval({
          ownername: "",
          email: "",
          phone: "",
          password: "",
          cpassword: "",
        });
      } else {
        alert(`Error: ${res.error}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const owner = result.user;
      // console.log(user);

      await axios.post("http://localhost:3000/api/g-owners/login", {
        uid: owner.uid,
        ownername: owner.displayName,
        email: owner.email,
        phone: "",
        role: "owner",
      });

      alert("Signed in successfully");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("Error signing in with Google: " + error.message);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h2 className="mb-4">
        <b>Create Owner account</b>
      </h2>
      <Form onSubmit={handleSignUp} className="w-50">
        <div className="mb-3 px-5">
          <label htmlFor="ownername" className="form-label">
            Owner Name
          </label>
          <input
            type="text"
            className="form-control"
            id="ownername"
            placeholder="Enter owner name"
            value={inpval.ownername}
            name="ownername"
            onChange={setVal}
          />
        </div>

        <div className="mb-3 px-5">
          <label htmlFor="formBasicEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="Email"
            onChange={setVal}
            value={inpval.email}
            name="email"
            placeholder="Enter Your Email Address"
          />
        </div>

        <div className="mb-3 px-5">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="number"
            id="phone"
            className="form-control"
            onChange={setVal}
            value={inpval.phone}
            name="phone"
            placeholder="Enter Your phone number"
          />
        </div>
        <div className="mb-3 px-5">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="two">
            <input
              type={!passShow ? "password" : "text"}
              id="password"
              className="form-control"
              onChange={setVal}
              value={inpval.password}
              name="password"
              placeholder="Enter Your password"
            />
            <div className="showpass" onClick={() => setPassShow(!passShow)}>
              {!passShow ? "Show" : "Hide"}
            </div>
          </div>
        </div>

        <div className="mb-3 px-5">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <div className="two">
            <input
              type={!cpassShow ? "password" : "text"}
              id="cpassword"
              className="form-control"
              onChange={setVal}
              value={inpval.cpassword}
              name="cpassword"
              placeholder="Confirm password"
            />
            <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
              {!cpassShow ? "Show" : "Hide"}
            </div>
          </div>
        </div>
        <Button variant="success" type="submit" className="w-100 mb-3">
          Continue
        </Button>

        <div className="text-center">
          Do you have an account? <NavLink to="/owner-login">Sign Up</NavLink>
          {/* <a href="/owner-login">Login</a> */}
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

export default OwnerSignUp;
