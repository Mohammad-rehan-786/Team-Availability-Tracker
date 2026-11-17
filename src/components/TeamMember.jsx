import {
    Mail,
    Briefcase,
    Pencil,
    Trash2,
    CheckCircle2,
} from "lucide-react";

export default function TeamMember({
    member,
    onToggle,
    onEdit,
    onDelete,
}) {
    return (
        <article className="member-card">
            <div className="member-card-top">
                <div
                    className="member-avatar"
                    style={{ background: member.color }}
                >
                    {member.avatar}
                </div>

                <div className="card-actions">
                    <button
                        className="icon-action edit-action"
                        onClick={() => onEdit(member)}
                        aria-label={`Edit ${member.name}`}
                        title="Edit member"
                    >
                        <Pencil size={16} />
                    </button>

                    <button
                        className="icon-action delete-action"
                        onClick={() => onDelete(member)}
                        aria-label={`Delete ${member.name}`}
                        title="Delete member"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <div className="member-main-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
            </div>

            <div className="member-extra-info">
                <div>
                    <Mail size={15} />
                    <span>{member.email}</span>
                </div>

                <div>
                    <Briefcase size={15} />
                    <span>{member.department}</span>
                </div>
            </div>

            <div className="member-card-footer">
                <div
                    className={`availability-status ${member.available ? "available" : "unavailable"
                        }`}
                >
                    <CheckCircle2 size={15} />
                    {member.available ? "Available" : "Unavailable"}
                </div>

                <button
                    className={`toggle ${member.available ? "active" : ""
                        }`}
                    onClick={() => onToggle(member.id)}
                    role="switch"
                    aria-checked={member.available}
                    aria-label={`Change availability for ${member.name}`}
                >
                    <span></span>
                </button>
            </div>
        </article>
    );
}