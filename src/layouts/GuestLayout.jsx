import { Outlet } from "react-router-dom";
import SiteNavbar from "@/components/SiteNavbar"; // was site-navbar

export default function GuestLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}