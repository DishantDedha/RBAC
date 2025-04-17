import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withRoleGuard = (Component, allowedRoles = []) => {
  return function ProtectedPage(props) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace("/login");
      } else if (!allowedRoles.includes(user.role)) {
        router.replace("/unauthorized");
      }
    }, [user]);

    if (!user || !allowedRoles.includes(user.role)) {
      return null;
    }

    return <Component {...props} />;
  };
};

export default withRoleGuard;
