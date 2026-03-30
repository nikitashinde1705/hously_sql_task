import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { hasPermission } from "../utils/permission";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ changed
  const [roleId, setRoleId] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const [editUser, setEditUser] = useState(null);

  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/api/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMeta = async () => {
    const rolesRes = await API.get("/api/roles");
    const deptRes = await API.get("/api/departments");

    setRoles(rolesRes.data);
    setDepartments(deptRes.data);
  };

  const handleDelete = async (id) => {
    await API.delete(`/api/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
    fetchMeta();
  }, []);

  // ✅ CREATE USER
  const handleCreateUser = async () => {
    await API.post("/api/users", {
      name,
      email,
      password,
      roleId,
      departmentId,
    });

    fetchUsers();
  };

  // ✅ UPDATE USER
  const handleUpdate = async () => {
    await API.put(`/api/users/${editUser.id}`, {
      roleId: editUser.roleId,
      departmentId: editUser.departmentId,
    });

    setEditUser(null);
    fetchUsers();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        User Management
      </h2>

      <div className="bg-white shadow-lg rounded-xl p-6">

        {/* CREATE USER */}
        {hasPermission(user, "create_user") && (
          <div className="grid md:grid-cols-6 gap-3 mb-6">

            <input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg p-2"
            />

            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg p-2"
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg p-2"
            />

            {/* ROLE */}
            <select
              onChange={(e) => setRoleId(e.target.value)}
              className="border rounded-lg p-2"
            >
              <option>Select Role</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>

            {/* DEPARTMENT */}
            <select
              onChange={(e) => setDepartmentId(e.target.value)}
              className="border rounded-lg p-2"
            >
              <option>Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleCreateUser}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
            >
              Create
            </button>
          </div>
        )}

        {/* TABLE */}
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Role</th>
              <th className="text-left p-3">Department</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t hover:bg-gray-50">

                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>

                {/* ROLE */}
                <td className="p-3">
                  {editUser?.id === u.id ? (
                    <select
                      value={editUser.roleId}
                      onChange={(e) =>
                        setEditUser({ ...editUser, roleId: e.target.value })
                      }
                      className="border rounded p-1"
                    >
                      {roles.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    u.Role?.name
                  )}
                </td>

                {/* DEPARTMENT */}
                <td className="p-3">
                  {editUser?.id === u.id ? (
                    <select
                      value={editUser.departmentId}
                      onChange={(e) =>
                        setEditUser({
                          ...editUser,
                          departmentId: e.target.value,
                        })
                      }
                      className="border rounded p-1"
                    >
                      {departments.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    u.Department?.name || "N/A"
                  )}
                </td>

                {/* ACTIONS */}
                <td className="p-3">
                  <div className="flex gap-2">

                    {hasPermission(user, "edit_user") &&
                      (editUser?.id === u.id ? (
                        <button
                          onClick={handleUpdate}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium shadow transition"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            setEditUser({
                              ...u,
                              roleId: u.roleId,
                              departmentId: u.departmentId,
                            })
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium shadow transition"
                        >
                          Edit
                        </button>
                      ))}

                    {hasPermission(user, "delete_user") && (
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium shadow transition"
                      >
                        Delete
                      </button>
                    )}

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
          </table>
      </div>
    </div>
  );
};

export default Users;