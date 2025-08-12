import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "../styles/mainlayout.css";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="main-layout">
      <header className="main-header">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </header>

      <div className="layout-content">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
