import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { auth, googleProvider, signInWithPopup } from '../../../firebase';
import axios from "axios";

const OwnerSignUp = () => {
  const [ownername, setOwnername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const owner = result.user;
      // console.log(user);


      await axios.post("http://localhost:3000/api/owners/login", {
        uid: owner.uid,
        ownername: owner.displayName || ownername,
        email: owner.email,
        phone: '',  // Optional, you can add a separate form for phone number
        role: 'owner'
      });

      alert("Signed in successfully");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("Error signing in with Google: " + error.message);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h2 className="mb-4">Create Owner account</h2>
      <Form className="w-50">
        <div className="mb-3 px-5">
          <label htmlFor="formBasicOwnername" className="form-label">
            Owner Name
          </label>
          <input
            type="text"
            className="form-control"
            id="formBasicOwnername"
            placeholder="Enter owner name"
            value={ownername}
            onChange={(e) => setOwnername(e.target.value)}
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
        <Button variant="success" type="submit" className="w-100 mb-3">
          Continue
        </Button>

        <div className="text-center">
          Do you have an account? <a href="/owner-login">Login</a>
        </div>
        <br />

        <Button variant="outline-primary" className="w-100 mb-2" onClick={handleGoogleSignIn}>
          <i className="fab fa-google"></i> Continue with Google
        </Button>
      </Form>
    </Container>
  );
};

export default OwnerSignUp;