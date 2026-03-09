
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("carverse-user");
    
    // Redirect to dashboard if logged in, otherwise to login
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);

  // This return statement won't be shown as we immediately redirect
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to CarVerse</h1>
        <p className="text-xl text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};

export default Index;
