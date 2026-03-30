import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="bg-white shadow px-6 py-3 flex justify-between items-center">
      
      <h1 className="text-xl font-semibold text-gray-700">
        Admin Panel
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">{user?.name}</span>
        
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default Navbar;