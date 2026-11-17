import { useEffect, useState } from "react";
import { X, UserPlus, Save } from "lucide-react";

const emptyForm = {
    name: "",
    email: "",
    role: "",
    department: "Development",
    available: true,
};

export default function MemberModal({
    isOpen,
    onClose,
    onSave,
    editingMember,
}) {
    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        if (editingMember) {
            setForm({
                name: editingMember.name,
                email: editingMember.email,
                role: editingMember.role,
                department: editingMember.department,
                available: editingMember.available,
            });
        } else {
            setForm(emptyForm);
        }
    }, [editingMember, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSave(form);
    };

    return (
        <div className="modal-overlay" onMouseDown={onClose}>
            <div
                className="member-modal"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <div>
                        <div className="modal-icon">
                            {editingMember ? (
                                <Save size={21} />
                            ) : (
                                <UserPlus size={21} />
                            )}
                        </div>

                        <h2>
                            {editingMember ? "Edit Member" : "Add New Member"}
                        </h2>

                        <p>
                            {editingMember
                                ? "Update your team member details."
                                : "Add a new member to your workspace."}
                        </p>
                    </div>

                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name *</label>

                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            required
                            maxLength={60}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address *</label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Job Role *</label>

                        <input
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            placeholder="e.g. Frontend Developer"
                            required
                            maxLength={60}
                        />
                    </div>

                    <div className="form-group">
                        <label>Department</label>

                        <select
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                        >
                            <option>Development</option>
                            <option>Design</option>
                            <option>AI & ML</option>
                            <option>Management</option>
                            <option>Marketing</option>
                            <option>Human Resources</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Availability Status</label>

                        <select
                            name="available"
                            value={String(form.available)}
                            onChange={(e) =>
                                setForm((previous) => ({
                                    ...previous,
                                    available: e.target.value === "true",
                                }))
                            }
                        >
                            <option value="true">Available</option>
                            <option value="false">Unavailable</option>
                        </select>
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button type="submit" className="save-btn">
                            {editingMember ? "Save Changes" : "Add Member"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}