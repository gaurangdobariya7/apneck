import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password
      });
      // Assuming your JWT token is in response.data.token
      const token = response.data.token;
      // Save token to local storage
      localStorage.setItem('token', token);
      setError('Login successful');
      setEmail('');
      setPassword('');
      // console.log(response.data); 
    } catch (error) {
      setError('Invalid email or password');
      console.error(error); // Log error for debugging
    }
  };

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Add any additional logout logic here
  };

  return (
    <section className="login-wrapper p-5">
      <div className="container-xxl">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-8 col-sm-10">
            <div className="card">
              <div className="card-body p-5">
                <h2 className="text-center">LOGIN</h2>
                <p className="text-center mb-4">Welcome Back!!</p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label mb-3">
                      Enter Your Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="enter email here ..."
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label mb-3">
                      Enter Your password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="enter password here..."
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </div>
                  {error && (
                    <div className="alert alert-danger">{error}</div>
                  )}
                  <div className="mb-3">
                    <Link to="/forgotpassword" className="form-link">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="m-0">Don t have an account?</p>
                    <Link to="/signup" className="form-link">
                      Sign up
                    </Link>
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </form>
                <div className="text-center mt-3">
                  <button onClick={handleLogout} className="btn btn-outline-danger">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
