import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import "./App.css";

function App() {
  console.log("App component is rendering"); // Debug log
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
