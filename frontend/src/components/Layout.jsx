import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="p-6">
          <Outlet />   {/* 🔥 VERY IMPORTANT */}
        </div>

      </div>
    </div>
  );
};

export default Layout;