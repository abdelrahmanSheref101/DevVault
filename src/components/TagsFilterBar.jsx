import { useState } from "react";

const tags = [
        { name: "All", id: 1 },
        { name: "Docs", id: 2 },
        { name: "Video", id: 3 },
        { name: "Tool", id: 4 },
        { name: "Blog", id: 5 },
        { name: "Other", id: 6 },
];

function TagsFilterBar({ selectedBtn, setSelected, setSelectedFilter }) {
        return (
                <div className="filter-bar-wrapper col-span-12 md:col-start-2 md:col-span-10 md:px-2 ">
                        <div className="tags-container">
                                {tags.map((t) => (
                                        <TagButton
                                                key={t.id}
                                                name={t.name}
                                                isActive={selectedBtn === t.name}
                                                onClick={() => setSelected(t.name)}
                                        />
                                ))}
                        </div>
                        <select
                                className="filter-select"
                                onChange={(e) => setSelectedFilter(e.target.value)}
                        >
                                <option value="Newest">Newest First</option>
                                <option value="Oldest">Oldest First</option>
                                <option value="A-Z">A-Z</option>
                                <option value="Z-A">Z-A</option>
                        </select>
                </div>
        );
}

function TagButton({ name, isActive, onClick }) {
        // Added isActive and onClick props for state management
        return (
                <button
                        onClick={onClick}
                        className={`tag-button ${isActive ? "tag-button-active" : ""}`} // Applied conditional styling classes
                >
                        {name}
                </button>
        );
}

export default TagsFilterBar;

//
// className="btn bg-secBg rounded-3xl  font-medium text-lg "
//className=" flex flex-row  gap-1 md:col-start-2 md:col-span-10 px-1"
