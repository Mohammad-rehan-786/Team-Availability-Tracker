import TeamMember from "./TeamMember";
import { Users } from "lucide-react";

export default function TeamList({
    team,
    onToggle,
    onEdit,
    onDelete,
}) {
    if (team.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">
                    <Users size={30} />
                </div>

                <h3>No team members found</h3>

                <p>
                    Try changing your search or add a new team member.
                </p>
            </div>
        );
    }

    return (
        <div className="team-grid">
            {team.map((member) => (
                <TeamMember
                    key={member.id}
                    member={member}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}