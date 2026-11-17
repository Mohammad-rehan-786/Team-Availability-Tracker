import { useMemo, useState } from "react";
import { Plus, Users, Search, X } from "lucide-react";

import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import StatsCards from "./components/StatsCards";
import TeamList from "./components/TeamList";
import MemberModal from "./components/MemberModal";

import { initialTeamData } from "./data/teamdata";
import useLocalStorage from "./hooks/useLocalStorage";

import "./App.css";

const avatarColors = [
  "#6366f1",
  "#0ea5e9",
  "#ec4899",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
];

function App() {
  const [team, setTeam] = useLocalStorage(
    "teampulse-members-v2",
    initialTeamData
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("Dashboard");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle availability
  const handleToggle = (id) => {
    setTeam((previous) =>
      previous.map((member) =>
        member.id === id
          ? { ...member, available: !member.available }
          : member
      )
    );
  };

  // Open add modal
  const handleAdd = () => {
    setEditingMember(null);
    setModalOpen(true);
  };

  // Open edit modal
  const handleEdit = (member) => {
    setEditingMember(member);
    setModalOpen(true);
  };

  // Add or update member
  const handleSave = (form) => {
    const normalizedEmail = form.email.trim().toLowerCase();

    const duplicate = team.some(
      (member) =>
        member.email.trim().toLowerCase() === normalizedEmail &&
        member.id !== editingMember?.id
    );

    if (duplicate) {
      alert("A member with this email already exists.");
      return;
    }

    if (editingMember) {
      setTeam((previous) =>
        previous.map((member) =>
          member.id === editingMember.id
            ? { ...member, ...form, email: normalizedEmail }
            : member
        )
      );
    } else {
      const newMember = {
        ...form,
        id: crypto.randomUUID(),
        email: normalizedEmail,
        avatar: form.name
          .trim()
          .split(/\s+/)
          .slice(0, 2)
          .map((part) => part[0].toUpperCase())
          .join(""),
        color:
          avatarColors[Math.floor(Math.random() * avatarColors.length)],
      };

      setTeam((previous) => [...previous, newMember]);
    }

    setModalOpen(false);
    setEditingMember(null);
  };

  // Delete member
  const handleDelete = (member) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${member.name}?`
    );

    if (!confirmed) return;

    setTeam((previous) =>
      previous.filter((item) => item.id !== member.id)
    );
  };

  // Search and filter
  const filteredTeam = useMemo(() => {
    return team.filter((member) => {
      const searchText = search.toLowerCase();

      const matchesSearch = [
        member.name,
        member.email,
        member.role,
        member.department,
      ].some((value) =>
        value.toLowerCase().includes(searchText)
      );

      const matchesFilter =
        filter === "all" ||
        (filter === "available" && member.available) ||
        (filter === "unavailable" && !member.available);

      const matchesTab =
        activeTab === "Team Members" ||
        activeTab === "Analytics" ||
        activeTab === "Settings" ||
        activeTab === "Dashboard";

      return matchesSearch && matchesFilter && matchesTab;
    });
  }, [team, search, filter, activeTab]);

  const isTeamView = activeTab === "Dashboard" ||
    activeTab === "Team Members";

  return (
    <div className="app-layout">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-wrapper">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          search={search}
          setSearch={setSearch}
        />

        <main className="dashboard-content">
          <section className="welcome-section">
            <div>
              <div className="eyebrow">
                WORKSPACE OVERVIEW
              </div>

              <h1>
                {activeTab === "Dashboard"
                  ? "Team Dashboard"
                  : activeTab}
              </h1>

              <p>
                Manage your people. Track availability. Stay connected.
              </p>
            </div>

            {isTeamView && (
              <button className="primary-btn" onClick={handleAdd}>
                <Plus size={19} />
                Add Member
              </button>
            )}
          </section>

          {activeTab !== "Settings" && (
            <StatsCards team={team} />
          )}

          {isTeamView && (
            <section className="team-section">
              <div className="team-section-header">
                <div>
                  <h2>
                    {activeTab === "Dashboard"
                      ? "Your Team"
                      : "All Team Members"}
                  </h2>

                  <p>
                    Manage your team members and their availability.
                  </p>
                </div>

                <div className="total-members">
                  <Users size={16} />
                  {team.length} Members
                </div>
              </div>

              <div className="filters-row">
                <div className="content-search">
                  <Search size={18} />

                  <input
                    placeholder="Search by name, email, role..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  {search && (
                    <button onClick={() => setSearch("")}>
                      <X size={16} />
                    </button>
                  )}
                </div>

                <select
                  className="filter-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Members</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>

              <TeamList
                team={
                  activeTab === "Dashboard"
                    ? filteredTeam.slice(0, 6)
                    : filteredTeam
                }
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              {activeTab === "Dashboard" && team.length > 6 && (
                <button
                  className="view-all-btn"
                  onClick={() => setActiveTab("Team Members")}
                >
                  View All Members
                </button>
              )}
            </section>
          )}

          {activeTab === "Analytics" && (
            <section className="simple-panel">
              <h2>Team Analytics</h2>
              <p>
                Your team currently has{" "}
                <strong>{team.length}</strong> members, with{" "}
                <strong>
                  {team.filter((m) => m.available).length}
                </strong>{" "}
                available members.
              </p>
              <p>Use the dashboard overview to monitor live availability.</p>
            </section>
          )}

          {activeTab === "Settings" && (
            <section className="simple-panel">
              <h2>Workspace Settings</h2>
              <p>TeamPulse local workspace configuration.</p>

              <button
                className="reset-btn"
                onClick={() => {
                  if (
                    window.confirm(
                      "Reset all members to the original demo data?"
                    )
                  ) {
                    setTeam(initialTeamData);
                  }
                }}
              >
                Reset Demo Data
              </button>
            </section>
          )}

          <footer className="dashboard-footer">
            <span>© 2026 TeamPulse</span>
            <span>Built with React & localStorage</span>
          </footer>
        </main>
      </div>

      <MemberModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingMember(null);
        }}
        onSave={handleSave}
        editingMember={editingMember}
      />
    </div>
  );
}

export default App;