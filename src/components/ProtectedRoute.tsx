
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import MainLayout from "./MainLayout";

const ProtectedRoute = () => {
  // This is a simple auth check for demo purposes
  // In a real app, you'd check for a valid token or session
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("carverse-user");
    setIsAuthenticated(!!user);
  }, []);
  
  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return null;
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // If authenticated, render the protected route within the main layout
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default ProtectedRoute;
