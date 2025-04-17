import withRoleGuard from "@/Component/guard";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const PERMISSION_OPTIONS = [
  "view",
  "create",
  "edit",
  "delete",
  "manage-users",
  "access-dashboard",
];

const CreateRolePage = () => {
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState([]);
  const { token } = useAuth();

  const handleCheckboxChange = (perm) => {
    setPermissions((prev) =>
      prev.includes(perm)
        ? prev.filter((p) => p !== perm)
        : [...prev, perm]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/create",
        { name: role, permissions },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(" Role created successfully!");
      setRole("");
      setPermissions([]);
    } catch (err) {
      console.error(err);
      alert("Error creating role");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Create New Role</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-700">Role Name</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter role name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2 text-gray-700">Permissions</label>
            <div className="grid grid-cols-2 gap-3">
              {PERMISSION_OPTIONS.map((perm) => (
                <label key={perm} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={permissions.includes(perm)}
                    onChange={() => handleCheckboxChange(perm)}
                    className="form-checkbox text-blue-600"
                  />
                  <span className="text-gray-800">{perm}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Create Role
          </button>
        </form>
      </div>
    </div>
  );
};

export default withRoleGuard(CreateRolePage, ["admin"]);
