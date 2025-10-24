import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { auth } from "./firebase/firebase.config";
import { useEffect } from "react";

// Add this debug component
function FirebaseDebug() {
  useEffect(() => {
    // console.log("===  FIREBASE CONFIGURATION DEBUG  ===");
    // console.log("Auth object exists:", !!auth);
    // console.log("Auth app:", auth?.app);
    // console.log("API Key being used:", auth?.app?.options?.apiKey);
    // console.log("Project ID:", auth?.app?.options?.projectId);
    // console.log("Auth Domain:", auth?.app?.options?.authDomain);
    // console.log("Full Firebase config:", auth?.app?.options);
    // console.log("=== END DEBUG  ===");

    // Test if Firebase is properly initialized
    if (auth && auth.app) {
      // console.log(" Firebase appears to be initialized");
    } else {
      // console.log("Firebase NOT properly initialized");
    }
  }, []);

  return null;
}

function App() {
  return (
    <div className="App">
      <FirebaseDebug /> {/* Add this line */}
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
