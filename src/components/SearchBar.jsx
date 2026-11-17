import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchBar({
    search,
    setSearch,
    filter,
    setFilter,
}) {
    return (
        <div className="toolbar">
            <div className="search-box">
                <Search size={19} />

                <input
                    type="text"
                    placeholder="Search team members..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="filter-box">
                <SlidersHorizontal size={18} />

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Members</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                </select>
            </div>
        </div>
    );
}