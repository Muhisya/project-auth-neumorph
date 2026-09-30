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
import UserBio from "./pages/user/UserBio";
import NotFound from "./pages/NotFound";
import NeuCursor from "./components/NeuCursor";
import { RequireUser, RequireAdmin, GuestOnly } from "./components/RouteGuards";

export default function App() {
  return (
    <>
      <NeuCursor />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route element={<GuestOnly />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        </Route>

        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<UserLayout />}>
          <Route element={<RequireUser />}>
            <Route path="/user" element={<UserHome />} />
            <Route path="/user/bio" element={<UserBio />} />
            <Route path="/user/profile" element={<UserProfile />} />
          </Route>
        </Route>

        <Route element={<AdminLayout />}>
          <Route element={<RequireAdmin />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* old member URL → new member area */}
        <Route path="/dashboard" element={<Navigate to="/user" replace />} />

        {/* 404 — must stay last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
