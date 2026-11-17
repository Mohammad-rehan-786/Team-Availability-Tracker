import {
    LayoutDashboard,
    Users,
    Activity,
    Settings,
    Zap,
    X,
} from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab, open, onClose }) {
    const menu = [
        { name: "Dashboard", icon: LayoutDashboard },
        { name: "Team Members", icon: Users },
        { name: "Analytics", icon: Activity },
        { name: "Settings", icon: Settings },
    ];

    return (
        <>
            {open && (
                <div className="sidebar-overlay" onClick={onClose}></div>
            )}

            <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
                <div className="sidebar-brand">
                    <div className="brand-symbol">
                        <Zap size={23} />
                    </div>

                    <div>
                        <h2>TeamPulse</h2>
                        <span>WORKSPACE</span>
                    </div>

                    <button className="sidebar-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="sidebar-label">MENU</div>

                <div className="sidebar-menu">
                    {menu.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.name}
                                className={`menu-item ${activeTab === item.name ? "menu-active" : ""
                                    }`}
                                onClick={() => {
                                    setActiveTab(item.name);
                                    onClose();
                                }}
                            >
                                <Icon size={19} />
                                <span>{item.name}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="sidebar-bottom">
                    <div className="workspace-card">
                        <div className="workspace-icon">
                            <Zap size={18} />
                        </div>

                        <h4>TeamPulse Pro</h4>
                        <p>Keep your team connected and productive.</p>
                    </div>

                    <div className="sidebar-user">
                        <div className="admin-avatar">RK</div>
                        <div>
                            <h4>Administrator</h4>
                            <span>Workspace Admin</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}