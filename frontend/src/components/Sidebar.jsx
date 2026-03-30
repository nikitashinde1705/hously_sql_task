import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { hasPermission } from "../utils/permission";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-64 bg-gray-900 text-white p-5 hidden md:block">
      
      <h2 className="text-2xl font-bold mb-6">RBAC</h2>

      <ul className="space-y-3">

        {hasPermission(user, "view_user") && (
          <li>
            <Link className="block p-2 rounded hover:bg-gray-700" to="/users">
              Users
            </Link>
          </li>
        )}

        {hasPermission(user, "view_role") && (
          <li>
            <Link className="block p-2 rounded hover:bg-gray-700" to="/roles">
              Roles
            </Link>
          </li>
        )}

        {hasPermission(user, "view_department") && (
          <li>
            <Link className="block p-2 rounded hover:bg-gray-700" to="/departments">
              Departments
            </Link>
          </li>
        )}

      </ul>
    </div>
  );
};

export default Sidebar;