import { NavLink, Outlet } from "react-router";
import "./SidebarLayout.css";

export default function Layout() {
    return (
        <div className="layout">
            <aside className="sidebar">
                <h1 className="sidebar-title">Slot Lounge</h1>

                <nav className="sidebar-nav">
                    <NavLink to="/" end>Home</NavLink>
                    <NavLink to="/slot">Slot</NavLink>
                    <NavLink to="/paytable">Paytable</NavLink>
                    <NavLink to="/symbols">Symbols</NavLink>
                    <NavLink to="/history">History</NavLink>
                    <NavLink to="/stats">Stats</NavLink>
                    <NavLink to="/challenges">Challenges</NavLink>
                    <NavLink to="/leaderboard">Leaderboard</NavLink>
                    <NavLink to="/admin">Admin</NavLink>
                </nav>
            </aside>

            <main className="content">
                <Outlet />
            </main>
        </div>
    );
}