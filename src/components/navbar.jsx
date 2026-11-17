import { Menu, Search, Bell } from "lucide-react";

export default function Navbar({ onMenuClick, search, setSearch }) {
    return (
        <header className="topbar">
            <div className="topbar-left">
                <button className="mobile-menu" onClick={onMenuClick}>
                    <Menu size={22} />
                </button>

                <div>
                    <span className="breadcrumb">Workspace /</span>
                    <strong>Team Management</strong>
                </div>
            </div>

            <div className="topbar-right">
                <div className="nav-search">
                    <Search size={17} />

                    <input
                        type="text"
                        placeholder="Search members..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <span>⌘ K</span>
                </div>

                <button className="notification-btn" aria-label="Notifications">
                    <Bell size={19} />
                    <span></span>
                </button>

                <div className="top-profile">RK</div>
            </div>
        </header>
    );
}