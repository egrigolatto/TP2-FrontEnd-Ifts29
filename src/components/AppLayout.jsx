import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="app-shell">
      <button
        className="mobile-menu-toggle"
        type="button"
        aria-expanded={sidebarOpen}
        aria-controls="team-sidebar"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Cerrar menú" : "Menú"}
      </button>
      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Cerrar menú"
          onClick={closeSidebar}
        />
      )}
      <Sidebar isOpen={sidebarOpen} onNavigate={closeSidebar} />
      <main className="app-main">
        <div className="page-shell">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
