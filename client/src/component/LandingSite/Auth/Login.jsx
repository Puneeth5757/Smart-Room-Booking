import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { auth, googleProvider, createUserWithEmailAndPassword, signInWithPopup } from '../../../firebase';
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      alert("Logged in successfully");
      // Redirect or update UI as needed
    } catch (err) {
      setError("Error logging in");
      console.error("Error:", err);
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
      // You can redirect the user or display a success message here
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User signed in with Google:", result.user);
      alert("Signed in Successfully");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("Error signing in with Google: " + error.message);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h2 className="mb-4">Welcome Back</h2>
      <Form onSubmit={handleLogin} className="w-50">
        {error && <div className="alert alert-danger mb-3">{error}</div>}

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

        <Button variant="success" type="submit" className="w-100 mb-3 px-5">
          Continue
        </Button>

        <div className="text-center px-5">
          Don-t have an account? <a href="/register">Sign Up</a>
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
