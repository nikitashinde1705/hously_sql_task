import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { hasPermission } from "../utils/permission";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");

  const { user } = useContext(AuthContext);

  const fetchDepartments = async () => {
    const res = await API.get("/api/departments");
    setDepartments(res.data);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleCreate = async () => {
    await API.post("/api/departments", { name });
    setName("");
    fetchDepartments();
  };

  return (
    <div>
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        Department Management
      </h2>

      {/* Card */}
      <div className="bg-white shadow-lg rounded-xl p-6">

        {/* Form */}
        {hasPermission(user, "create_department") && (
          <div className="flex gap-3 mb-6">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Department Name"
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
                <th className="p-3 text-left">Department Name</th>
              </tr>
            </thead>

            <tbody>
              {departments.map((d) => (
                <tr key={d._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{d.name}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Departments;