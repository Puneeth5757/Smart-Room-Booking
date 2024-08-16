import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { userAuth , userGoogleProvider, signInWithPopup } from '../../../user-firebase';
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("", {
        username,
        email,
        phone,
        password,
      });
      alert("User registered successfully");
    } catch (err) {
      setError("Error registering user");
      console.error("Error:", err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(userAuth , userGoogleProvider);
      const user = result.user;
      // console.log(user);


      await axios.post("http://localhost:3000/api/users/login", {
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
      <h2 className="mb-4">Create User Account</h2>
      <Form onSubmit={handleSignUp} className="w-50">
        {error && <div className="alert alert-danger mb-3">{error}</div>}

        <div className="mb-3 px-5">
          <label htmlFor="formBasicUsername" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="formBasicUsername"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 px-5">
          <label htmlFor="formBasicEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="formBasicEmail"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 px-5">
          <label htmlFor="formBasicPhone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="formBasicPhone"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 px-5">
          <label htmlFor="formBasicPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="formBasicPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 px-5">
          <label htmlFor="formConfirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="formConfirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <Button variant="success" type="submit" className="w-100 mb-3 px-5">
          Sign Up
        </Button>

        <div className="text-center px-5">
          Already have an account? <a href="/login">Login</a>
        </div>
        <br />

  
  <Button variant="outline-primary" className="w-100 mb-2" onClick={handleGoogleSignIn}  >
          <i className="fab fa-google"></i> Continue with Google
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
