import { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile as firebaseUpdateProfile, 
  googleProvider,
} from "../firebase/firebase.config";
import { doc, setDoc, updateDoc } from "firebase/firestore"; 
import { db } from "../firebase/firebase.config";

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
  const [firestoreError, setFirestoreError] = useState(null);

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      setFirestoreError(null);
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error("No user is currently signed in");
      }

      // Update profile in Firebase Authentication
      await firebaseUpdateProfile(currentUser, {
        displayName: profileData.displayName,
        photoURL: profileData.photoURL,
      });

      // Update the user state with new data
      setUser({
        ...currentUser,
        displayName: profileData.displayName,
        photoURL: profileData.photoURL,
      });

      // Try to update user document in Firestore
      try {
        await updateDoc(doc(db, "users", currentUser.uid), {
          displayName: profileData.displayName,
          photoURL: profileData.photoURL,
          updatedAt: new Date(),
        });
      } catch (firestoreError) {
        console.warn("Firestore update failed:", firestoreError);
        setFirestoreError(
          "Note: Profile updated, but some features may not work due to database connection issues."
        );
      }

      return { success: true, user: currentUser };
    } catch (error) {
      // console.error("Update profile error:", error);

      let errorMessage = "Failed to update profile";

      switch (error.code) {
        case "auth/requires-recent-login":
          errorMessage = "Please log in again to update your profile";
          break;
        case "auth/network-request-failed":
          errorMessage =
            "Network error. Please check your internet connection.";
          break;
        default:
          errorMessage = error.message || "Failed to update profile";
      }

      return { success: false, error: errorMessage };
    }
  };

  // Sign up with email and password
  const signup = async (email, password, displayName, photoURL = null) => {
    try {
      setFirestoreError(null);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;

      // Update profile
      if (displayName || photoURL) {
        await firebaseUpdateProfile(user, {
          // Use the renamed import
          displayName: displayName,
          photoURL: photoURL || null,
        });
      }

      // Try to create user document in Firestore
      try {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: displayName,
          email: email,
          photoURL: photoURL,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } catch (firestoreError) {
        console.warn("Firestore write failed:", firestoreError);
        setFirestoreError(
          "Note: Some features may not work due to database connection issues."
        );
      }

      return { success: true, user: user };
    } catch (error) {
      let errorMessage = "Signup failed";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email already in use";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Email/password sign-up is not enabled";
          break;
        default:
          errorMessage = error.message;
      }

      return { success: false, error: errorMessage };
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      // console.log("Firebase login error:", error.code, error.message);

      let errorMessage = "Login failed";

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
        case "auth/operation-not-allowed":
          errorMessage =
            "Email/password login is not enabled. Please contact support.";
          break;
        case "auth/network-request-failed":
          errorMessage =
            "Network error. Please check your internet connection.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid login credentials";
          break;
        default:
          errorMessage = `Login error: ${error.message}`;
      }

      return { success: false, error: errorMessage };
    }
  };

  // Google login
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return { success: true, user: result.user };
    } catch (error) {
      // console.log("Google login error:", error.code, error.message);

      let errorMessage = "Google login failed";

      switch (error.code) {
        case "auth/popup-closed-by-user":
          errorMessage = "Login cancelled";
          break;
        case "auth/popup-blocked":
          errorMessage =
            "Popup was blocked by your browser. Please allow popups for this site.";
          break;
        case "auth/unauthorized-domain":
          errorMessage = "This domain is not authorized for login.";
          break;
        case "auth/network-request-failed":
          errorMessage =
            "Network error. Please check your internet connection.";
          break;
        case "auth/internal-error":
          errorMessage = "Internal authentication error. Please try again.";
          break;
        default:
          errorMessage = `Google login error: ${error.message}`;
      }

      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      // console.error("Logout error:", error);
      return { success: false, error: error.message };
    }
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    signup,
    login,
    googleLogin,
    logout,
    updateProfile,
    loading,
    firestoreError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
