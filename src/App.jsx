import "./index.css";
import Header from "./components/Header.jsx";
import AddingResourceButton from "./components/AddingResourceButton.jsx";
import TagsFilterBar from "./components/TagsFilterBar.jsx";
import ResourcesDisplay from "./components/ResourcesDisplay.jsx";
import { useEffect, useState } from "react";
import resService from "./services/resources.js";

function App() {
        const [resources, setResources] = useState([]);
        const [searchTerm, setSearchTerm] = useState("");
        const [selectedBtn, setSelected] = useState("All");
        const [selectedFilter, setSelectedFilter] = useState("Newest");

        useEffect(() => {
                resService.getAll().then((recievedRes) => {
                        setResources(recievedRes);
                });
        }, []);

        let shownResources = resources;
        if (useState !== "")
                shownResources = resources.filter((res) =>
                        res.title.toLowerCase().includes(searchTerm.toLowerCase()),
                );

        shownResources = handleFiltersBar(
                shownResources,
                selectedBtn,
                selectedFilter,
        );

        function handleResDeletion(id) {
                const newResources = resources.filter((res) => res.id !== id);
                resService
                        .delEntery(id)
                        .then((res) => {
                                setResources(newResources);
                        })
                        .catch((err) => console.log("oy mate invalid id ::: ", err.message));
        }

        return (
                <div className="grid grid-cols-12 space-y-4">
                        <Header setSearchTerm={setSearchTerm} />
                        {/* <Header /> */}
                        <AddingResourceButton resources={resources} setResources={setResources} />
                        <TagsFilterBar
                                selectedBtn={selectedBtn}
                                setSelected={setSelected}
                                setSelectedFilter={setSelectedFilter}
                        />
                        <ResourcesDisplay
                                resources={shownResources}
                                handleResDeletion={handleResDeletion}
                        />
                </div>
        );
}

function handleFiltersBar(resources, selectedBtn, selectedFilter) {
        let shownResources = resources;
        if (selectedBtn != "All")
                shownResources = resources.filter(
                        (resource) =>
                                resource.category.toLowerCase() == selectedBtn.toLowerCase(),
                );

        if (selectedFilter != "Oldest") {
                switch (selectedFilter) {
                        case "Newest":
                                shownResources = shownResources.reverse();
                                break;
                        case "A-Z":
                                shownResources = shownResources.sort((res1, res2) =>
                                        res1.title.toLowerCase().localeCompare(res2.title.toLowerCase()),
                                );
                                break;
                        case "Z-A":
                                shownResources = shownResources.sort((res1, res2) =>
                                        res2.title.toLowerCase().localeCompare(res1.title.toLowerCase()),
                                );
                                break;
                }
        }

        return shownResources;
}

export default App;
