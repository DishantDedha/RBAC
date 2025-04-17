import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  if (!user) return null;

  // Handle multiple roles, whether string or object
  const displayRoles = () => {
    if (!user.role) return "N/A";

    if (Array.isArray(user.role)) {
      return user.role
        .map((r) => (typeof r === "string" ? r : r.name))
        .join(", ");
    }

    return typeof user.role === "string" ? user.role : user.role.name;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Welcome to Your Dashboard</h1>
        <p className="text-lg text-gray-700 mb-2">
          Hello, <span className="font-semibold">{user.username || user.email}</span>!
        </p>
        <p className="text-md text-gray-600 mb-6">
          <span className="font-medium text-gray-800">Roles:</span>{" "}
          <span className="text-blue-600 font-semibold">{displayRoles()}</span>
        </p>

        {/* New Role Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={() => router.push("/admin/create-roles")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition"
          >
            Create Role
          </button>
          <button
            onClick={() => router.push("/admin/assign-roles")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full transition"
          >
            Assign Role
          </button>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
