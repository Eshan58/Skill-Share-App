import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const signup = async (name, email, photoURL, password) => {
    try {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return {
          success: false,
          error: passwordValidation.errors.join(", "),
        };
      }

      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = existingUsers.find((user) => user.email === email);

      if (userExists) {
        return { success: false, error: "User with this email already exists" };
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        photoURL: photoURL || "/images/default-avatar.jpg",
        createdAt: new Date().toISOString(),
      };

      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      setUser(newUser);
      localStorage.setItem("authToken", "fake-jwt-token");
      localStorage.setItem("userData", JSON.stringify(newUser));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const user = existingUsers.find((user) => user.email === email);

      if (user) {
        setUser(user);
        localStorage.setItem("authToken", "fake-jwt-token");
        localStorage.setItem("userData", JSON.stringify(user));
        return { success: true };
      }

      return { success: false, error: "Invalid email or password" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const googleLogin = async () => {
    try {
      const googleUser = {
        id: Date.now(),
        name: "Google User",
        email: "googleuser@example.com",
        photoURL: "/images/google-avatar.jpg",
        isGoogleUser: true,
      };

      setUser(googleUser);
      localStorage.setItem("authToken", "fake-google-token");
      localStorage.setItem("userData", JSON.stringify(googleUser));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  };

  const value = {
    user,
    signup,
    login,
    googleLogin,
    logout,
    loading,
    validatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
