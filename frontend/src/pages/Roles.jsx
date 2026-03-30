import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { hasPermission } from "../utils/permission";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState("");

  const { user } = useContext(AuthContext);

  const fetchRoles = async () => {
    const res = await API.get("/api/roles");
    setRoles(res.data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreate = async () => {
    await API.post("/api/roles", {
      name,
      permissions: permissions.split(",").map(p => p.trim())
    });

    setName("");
    setPermissions("");
    fetchRoles();
  };

  return (
    <div>
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        Role Management
      </h2>

      {/* Card */}
      <div className="bg-white shadow-lg rounded-xl p-6">

        {/* Form */}
        {hasPermission(user, "create_role") && (
          <div className="flex flex-col md:flex-row gap-3 mb-6">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Role Name"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400"
            />

            <input
              value={permissions}
              onChange={(e) => setPermissions(e.target.value)}
              placeholder="Permissions (comma separated)"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400"
            />

            <button
              onClick={handleCreate}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow"
            >
              Create
            </button>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
              <tr>
                <th className="p-3 text-left">Role</th>
                <th className="text-left">Permissions</th>
              </tr>
            </thead>

            <tbody>
              {roles.map((r) => (
                <tr key={r._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{r.name}</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {r.permissions.map((p, i) => (
                        <span
                          key={i}
                          className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-xs"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Roles;