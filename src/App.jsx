import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import UserHome from "./pages/user/UserHome";
import UserProfile from "./pages/user/UserProfile";
import NeuCursor from "./components/NeuCursor";
import { RequireUser, RequireAdmin, GuestOnly } from "./components/RouteGuards";

export default function App() {
  return (
    <>
      <NeuCursor />
      <Routes>
        {/* Layout A — auth (logged-out only) */}
        <Route element={<AuthLayout />}>
          <Route element={<GuestOnly />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        </Route>

        {/* Layout B — guest (public) */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Layout C — user (member area, protected) */}
        <Route element={<UserLayout />}>
          <Route element={<RequireUser />}>
            <Route path="/user" element={<UserHome />} />
            <Route path="/user/profile" element={<UserProfile />} />
          </Route>
        </Route>

        {/* Layout D — admin (role-protected) */}
        <Route element={<AdminLayout />}>
          <Route element={<RequireAdmin />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* old member URL → new member area (optional safety net) */}
        <Route path="/dashboard" element={<Navigate to="/user" replace />} />
      </Routes>
    </>
  );
}
