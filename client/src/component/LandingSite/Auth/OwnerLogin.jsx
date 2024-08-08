import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { auth, googleProvider, signInWithPopup } from '../../../firebase';
import axios from "axios";

const OwnerLogin = () => {
  const [email, setEmail] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const owner = result.user;
      

      await axios.post("http://localhost:3000/api/owners/login", {
        uid: owner.uid,
        ownername: owner.displayName,
        email: owner.email,
        phone: '',  
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
      <h2 className="mb-4">Welcome back, Owner</h2>
      <Form className="w-50">
        <div className="mb-3">
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

        <Button variant="success" type="submit" className="w-100 mb-3">
          Continue
        </Button>

        <div className="text-center">
          Don-t have an account? <a href="/owner-register">Sign Up</a>
        </div>
        <br />

        <Button variant="outline-primary" className="w-100 mb-2" onClick={handleGoogleSignIn}>
          <i className="fab fa-google"></i> Continue with Google
        </Button>
      </Form>
    </Container>
  );
};

export default OwnerLogin;
