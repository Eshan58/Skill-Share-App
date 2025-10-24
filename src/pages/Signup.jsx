import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [imageErrors, setImageErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef(null);

  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 6) {
      errors.push("At least 6 characters");
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("One lowercase letter");
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("One uppercase letter");
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push("One number");
    }
    // if (!/(?=.*[@$!%*?&])/.test(password)) {
    //   errors.push("One special character (@$!%*?&)");
    // }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  // Image file validation
  const validateImageFile = (file) => {
    if (!file) return "";

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return "Please select a valid image (JPEG, PNG, GIF, WebP)";
    }

    if (file.size > maxSize) {
      return "Image must be smaller than 5MB";
    }

    return "";
  };

  // Image URL validation
  const validateImageURL = (url) => {
    if (!url.trim()) return "";

    try {
      new URL(url);

      const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".bmp",
        ".webp",
      ];
      const pathname = url.toLowerCase();
      const isImageUrl = imageExtensions.some((ext) => pathname.includes(ext));

      if (!isImageUrl) {
        return "URL should point to an image file (jpg, png, gif, etc.)";
      }

      return "";
    } catch (error) {
      return "Please enter a valid URL";
    }
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const error = validateImageFile(file);

    if (error) {
      setImageErrors(error);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        photoURL: e.target.result,
      }));
      setImageErrors("");
    };
    reader.onerror = () => {
      setImageErrors("Failed to read image file");
    };
    reader.readAsDataURL(file);
  };

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

    if (name === "photoURL") {
      const error = validateImageURL(value);
      setImageErrors(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (
      !formData.displayName?.trim() ||
      !formData.email?.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all required fields");
      setLoading(false);
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password strength
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      toast.error("Please fix password requirements");
      setLoading(false);
      return;
    }

    // Validate image URL if provided
    if (formData.photoURL?.trim()) {
      const imageError = validateImageURL(formData.photoURL);
      if (imageError) {
        toast.error(imageError);
        setLoading(false);
        return;
      }
    }

    try {
      const result = await signup(
        formData.email.trim(),
        formData.password,
        formData.displayName.trim(),
        formData.photoURL?.trim() || null
      );

      if (result.success) {
        toast.success("Account created successfully!");
        navigate("/", { replace: true });
      } else {
        toast.error(result.error || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const result = await googleLogin();

      if (result.success) {
        toast.success("Logged in successfully!");
        navigate("/", { replace: true });
      } else {
        toast.error(result.error || "Google login failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600">
            Join our community of skilled learners
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo (Optional)
            </label>

            <div className="space-y-3">
              {/* File Upload Option */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  Upload Image
                </button>
                <span className="text-sm text-gray-500">
                  or enter URL below
                </span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/jpeg, image/jpg, image/png, image/gif, image/webp"
                  className="hidden"
                />
              </div>

              {/* URL Input */}
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />

              {/* Image Preview */}
              {formData.photoURL && !imageErrors && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={formData.photoURL}
                    alt="Preview"
                    className="w-12 h-12 rounded-lg object-cover border"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <span className="text-sm text-gray-600">Image preview</span>
                </div>
              )}

              {/* Error Messages */}
              {imageErrors && (
                <div className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
                  {imageErrors}
                </div>
              )}

              {/* Help Text */}
              <p className="text-xs text-gray-500">
                Supported formats: JPEG, PNG, GIF, WebP • Max size: 5MB
              </p>
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                disabled={loading}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                disabled={loading}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {/* Password Requirements */}
            {passwordErrors.length > 0 && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-medium text-yellow-800 mb-2">
                  Password must contain:
                </p>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {passwordErrors.map((error, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Password strength:</span>
                  <span>
                    {passwordErrors.length === 0
                      ? "Strong"
                      : passwordErrors.length <= 2
                      ? "Medium"
                      : "Weak"}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordErrors.length === 0
                        ? "bg-green-500 w-full"
                        : passwordErrors.length <= 2
                        ? "bg-yellow-500 w-2/3"
                        : "bg-red-500 w-1/3"
                    }`}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                disabled={loading}
                className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  formData.confirmPassword &&
                  formData.password !== formData.confirmPassword
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                disabled={loading}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
            {formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  Passwords do not match
                </p>
              )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              loading ||
              passwordErrors.length > 0 ||
              imageErrors ||
              (formData.confirmPassword &&
                formData.password !== formData.confirmPassword)
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaGoogle className="w-5 h-5 text-red-500" />
          {loading ? "Signing in..." : "Continue with Google"}
        </button>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
