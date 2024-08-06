import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Handle sign-up logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h2 className="mb-4">Create Owner account</h2>
      <Form onSubmit={handleSignUp} className="w-50 ">
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
          Already have an account? <a href="/owner-login">Login</a>
        </div>
        <br />

        <Button variant="outline-primary" className="w-100 mb-2">
          <i className="fab fa-google"></i> Continue with Google
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
