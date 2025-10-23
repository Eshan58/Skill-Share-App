import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate, Link, NavLink } from "react-router";
import { FaGoogle } from "react-icons/fa";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);

  const { signup, googleLogin, validatePassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      const validation = validatePassword(value);
      setPasswordErrors(validation.errors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errors.join(", "));
      setLoading(false);
      return;
    }

    const result = await signup(
      formData.name,
      formData.email,
      formData.photoURL,
      formData.password
    );

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    const result = await googleLogin();

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Your Account</h2>
        <p>Join our community of skilled learners</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="photoURL">Photo URL (Optional)</label>
            <input
              type="url"
              id="photoURL"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="Image url"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            {passwordErrors.length > 0 && (
              <div className="password-errors">
                {passwordErrors.map((error, index) => (
                  <div key={index} className="password-error">
                    {error}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* <NavLink to="/"> */}
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          {/* </NavLink> */}
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="google-btn"
          disabled={loading}
        >
          <FaGoogle />
          Continue with Google
        </button>

        <div className="auth-links">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
