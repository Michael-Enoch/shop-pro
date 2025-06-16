import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!user) {
        navigate("/login");
      }
    }, [user, navigate]);
  
    const handleLogout = () => {
      logout(); 
      navigate("/login"); 
    };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.fullName || "User"} 👋</h1>
      <p className="text-gray-600 mb-8">This is your dashboard.</p>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};