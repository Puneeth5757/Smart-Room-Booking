import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h2 className="mb-4">Welcome back</h2>
      <Form onSubmit={handleLogin} className="w-50">
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
          Dont have an account? <a href="/owner-register">Sign Up</a>
        </div>
        <br />

        <Button variant="outline-primary" className="w-100 mb-2">
          <i className="fab fa-google"></i> Continue with Google
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
