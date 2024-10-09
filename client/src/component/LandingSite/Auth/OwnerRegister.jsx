import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { auth, googleProvider, signInWithPopup } from "../../../firebase";
import { NavLink, useNavigate} from "react-router-dom";
import axios from "axios";

const OwnerSignUp = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const history = useNavigate();

  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    phone:"",
    password: "",
    cpassword: "",
  });

  const setVal = (e) => {
    console.log(e.target.value);
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
    const { name, email, phone, password, cpassword } = inpval;
  
    if (name === "" || email === "" || phone === "" || password === "" || cpassword === "") {
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
      const response = await fetch("http://localhost:3000/api/owners/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, password, cpassword }),
      });
  
      const res = await response.json();
      // console.log(res);
  
      if (response.status === 201) {
        alert("Registration Successful!");
        setInpval({
          name: "",
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
      history("/owner-login");
      
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
        <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={setVal}
                value={inpval.name}
                name="name"
                id="name"
                placeholder="Enter Your Name"
              />
        </div>

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
        <label htmlFor="phone">Phone</label>
              <input
                type="number"
                className="form-control"
                onChange={setVal}
                value={inpval.phone}
                name="phone"
                id="phone"
                placeholder="Enter Your phone number"
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

        <div className="mb-3 px-5">
        <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  className="form-control"
                  onChange={setVal}
                  value={inpval.cpassword}
                  name="cpassword"
                  id="cpassword"
                  placeholder="Confirm password"
                />
                <div
                  className="showpass my-3"
                  onClick={() => setCPassShow(!cpassShow)}
                >
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
        </div>
        <Button variant="success" type="submit" className="w-100 mb-3">
          Continue
        </Button>

        <div className="text-center">
          Do you have an account? <NavLink to="/owner-login">Sign in</NavLink>
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
