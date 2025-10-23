import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase/firebase.config";

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
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get additional user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userData = userDoc.data();

          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            ...userData,
          });
        } catch (error) {
          // If no user doc exists, just use auth user data
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Password validation function (client-side only)
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
      // Validate password
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return {
          success: false,
          error: passwordValidation.errors.join(", "),
        };
      }

      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update profile with name and photo
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL || "/images/default-avatar.jpg",
      });

      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        photoURL: photoURL || "/images/default-avatar.jpg",
        createdAt: new Date().toISOString(),
        skills: [],
        ratings: [],
        studentsTaught: 0,
      });

      return { success: true };
    } catch (error) {
      let errorMessage = "Signup failed. Please try again.";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak.";
          break;
        default:
          errorMessage = error.message;
      }

      return { success: false, error: errorMessage };
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No user found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Invalid password.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        default:
          errorMessage = error.message;
      }

      return { success: false, error: errorMessage };
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user exists in Firestore, if not create them
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
          skills: [],
          ratings: [],
          studentsTaught: 0,
          isGoogleUser: true,
        });
      }

      return { success: true };
    } catch (error) {
      let errorMessage = "Google login failed. Please try again.";

      switch (error.code) {
        case "auth/popup-closed-by-user":
          errorMessage = "Login cancelled.";
          break;
        case "auth/popup-blocked":
          errorMessage =
            "Popup was blocked. Please allow popups for this site.";
          break;
        default:
          errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
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
