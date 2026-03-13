import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import "./SidebarLayout.css";

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const closeSidebar = () => setSidebarOpen(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeSidebar();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className={`layout${sidebarOpen ? "" : " sidebar-collapsed"}`}>
            <button
                className="sidebar-toggle"
                aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={sidebarOpen}
                onClick={() => setSidebarOpen((open) => !open)}
            >
                <span className="toggle-icon" aria-hidden="true">{sidebarOpen ? "✕" : "☰"}</span>
                <span className="toggle-label">{sidebarOpen ? "Hide sidebar" : "Show sidebar"}</span>
            </button>

            <aside className={`sidebar${sidebarOpen ? " sidebar-open" : ""}`}>
                <h1 className="sidebar-title">Slot Lounge</h1>

                <nav className="sidebar-nav">
                    <NavLink to="/" end onClick={closeSidebar}>Home</NavLink>
                    <NavLink to="/slot" onClick={closeSidebar}>Slot</NavLink>
                    <NavLink to="/paytable" onClick={closeSidebar}>Paytable</NavLink>
                    <NavLink to="/symbols" onClick={closeSidebar}>Symbols</NavLink>
                    <NavLink to="/history" onClick={closeSidebar}>History</NavLink>
                    <NavLink to="/stats" onClick={closeSidebar}>Stats</NavLink>
                    <NavLink to="/challenges" onClick={closeSidebar}>Challenges</NavLink>
                    <NavLink to="/leaderboard" onClick={closeSidebar}>Leaderboard</NavLink>
                    <NavLink to="/admin" onClick={closeSidebar}>Admin</NavLink>
                </nav>
            </aside>

            <main className="content">
                <Outlet />
            </main>
        </div>
    );
}
