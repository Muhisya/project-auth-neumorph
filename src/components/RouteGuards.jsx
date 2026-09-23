import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/store/auth";

/** Blocks the page unless signed in → bounces to /sign-in */
export function RequireAuth() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/sign-in" replace />;
}

/** Blocks sign-in/sign-up when already logged in → bounces to / */
export function GuestOnly() {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : <Outlet />;
}

export function RequireAdmin() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/sign-in" replace />;
  return user.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
}

export function RequireUser() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/sign-in" replace />;
  return user.role === "admin" ? <Navigate to="/admin" replace /> : <Outlet />;
}
