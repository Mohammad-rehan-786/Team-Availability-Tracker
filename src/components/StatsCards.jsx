import {
    Users,
    UserCheck,
    UserX,
    TrendingUp,
} from "lucide-react";

export default function StatsCards({ team }) {
    const total = team.length;

    const available = team.filter(
        (member) => member.available
    ).length;

    const unavailable = total - available;

    const percentage = total
        ? Math.round((available / total) * 100)
        : 0;

    const stats = [
        {
            title: "Total Members",
            value: total,
            icon: Users,
            color: "blue",
            description: "Registered team members",
        },
        {
            title: "Available Now",
            value: available,
            icon: UserCheck,
            color: "green",
            description: "Ready to collaborate",
        },
        {
            title: "Unavailable",
            value: unavailable,
            icon: UserX,
            color: "red",
            description: "Currently unavailable",
        },
        {
            title: "Availability Rate",
            value: `${percentage}%`,
            icon: TrendingUp,
            color: "purple",
            description: "Team availability",
        },
    ];

    return (
        <div className="stats-grid">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div className="stat-card" key={stat.title}>
                        <div className={`stat-icon ${stat.color}`}>
                            <Icon size={23} />
                        </div>

                        <div className="stat-content">
                            <p>{stat.title}</p>
                            <h2>{stat.value}</h2>
                            <span>{stat.description}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}