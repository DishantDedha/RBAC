import { useState } from "react";
import withRoleGuard from "@/Component/guard";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const AssignRolePage = () => {
  const { token } = useAuth();
  const [username, setUsername] = useState("");
  const [rolename, setRoleName] = useState("");

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/assign",
        { username, rolename },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`Role '${rolename}' assigned to '${username}'`);
      setUsername("");
      setRoleName("");
    } catch (err) {
      alert("Failed to assign role");
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Assign Role</h2>
      <form onSubmit={handleAssign} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Role Name (e.g. admin, editor)"
          value={rolename}
          onChange={(e) => setRoleName(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Assign Role
        </button>
      </form>
    </div>
  );
};

export default withRoleGuard(AssignRolePage, ["admin"]);
