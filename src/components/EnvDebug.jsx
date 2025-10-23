const EnvDebug = () => {
  return (
    <div
      style={{
        background: "#ffebee",
        padding: "20px",
        margin: "20px",
        border: "1px solid red",
      }}
    >
      <h3>Environment Variables Debug</h3>
      <p>
        <strong>API Key exists:</strong>{" "}
        {import.meta.env.VITE_FIREBASE_API_KEY ? "YES" : "NO"}
      </p>
      <p>
        <strong>API Key length:</strong>{" "}
        {import.meta.env.VITE_FIREBASE_API_KEY?.length || 0} characters
      </p>
      <p>
        <strong>API Key starts with:</strong>{" "}
        {import.meta.env.VITE_FIREBASE_API_KEY?.substring(0, 10) || "None"}
      </p>
      <p>
        <strong>Project ID:</strong>{" "}
        {import.meta.env.VITE_FIREBASE_PROJECT_ID || "Not found"}
      </p>
      <p>
        <strong>Auth Domain:</strong>{" "}
        {import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "Not found"}
      </p>
    </div>
  );
};

export default EnvDebug;
