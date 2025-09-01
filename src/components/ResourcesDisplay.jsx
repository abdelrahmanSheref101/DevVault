import { FaRegTrashAlt } from "react-icons/fa";
import { PiStarBold } from "react-icons/pi";
import { PiStarFill } from "react-icons/pi";

import { FaExternalLinkAlt } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa6";
import { useState } from "react";

function ResourcesDisplay({ resources, handleResDeletion }) {
        if (!resources || resources.length === 0)
                return (
                        <div className="col-span-12 md:col-start-2 md:col-span-10 p-2 flex flex-col justify-center align-middle content-center items-center text-gray-400 text-3xl mt-2 space-y-3">
                                <FaRegFolder className="text-8xl text-gray-600 mb-4 mt-6" />
                                <p>No resources added yet</p>
                                <p>Add your first resource using the form above!</p>
                        </div>
                );

        return (
                <div className="col-span-12 md:col-start-2 md:col-span-10 p-2 ">
                        <div className="grid gird-cols-1 md:grid-cols-2 gap-3">
                                {resources.map((resc) => (
                                        <ResourceCard
                                                resource={resc}
                                                key={resc.id}
                                                deletionHandle={handleResDeletion}
                                        />
                                ))}
                        </div>
                </div>
        );
}

function ResourceCard({ resource, deletionHandle }) {
        const [isStarred, setIsStarred] = useState(false);

        return (
                <div className="resource-card rounded-lg p-6 border border-gray-700 bg-[#1F2937] ">
                        {/* ###########RESOURCE HEADER####################################################### */}
                        <div className="mb-4 text-logoClr flex flex-wrap md:flex-row justify-between">
                                <a href={resource.url} className="group">
                                        <h1 className="text-primary-clr text-2xl font-semibold mb-2 flex items-center gap-2 group-hover:underline ">
                                                {resource.title}
                                                <FaExternalLinkAlt className="resource-icon w-4 h-4 flex-shrink-0" />
                                        </h1>
                                </a>
                                <div className="  bg-[#312E81]  text-logoClr px-3 py-1 rounded-full text-lg font-semibold">
                                        {resource.category}
                                </div>
                        </div>
                        {/* ###########RESOURCE DESCRIPTION####################################################### */}
                        <div className="text-mainText mb-6 leading-relaxed text-xl ">
                                {resource.description}
                        </div>
                        {/* ###########RESOURCE FOOTER####################################################### */}
                        <div className="flex justify-end gap-3 border-t border-gray-700 pt-2 ">
                                {/* <button */}
                                {/*         onClick={() => setIsStarred(!isStarred)} */}
                                {/*         className={`${isStarred ? "text-yellow-400" : "text-gray-400"} hover:text-yellow-400 transition-colors duration-200 p-2 rounded `} */}
                                {/* > */}
                                {/*         {isStarred ? ( */}
                                {/*                 <PiStarFill className="resource-icon w-6 h-6" /> */}
                                {/*         ) : ( */}
                                {/*                 <PiStarBold className="resource-icon w-6 h-6" /> */}
                                {/*         )} */}
                                {/* </button> */}

                                <button
                                        className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-2 rounded "
                                        onClick={() => deletionHandle(resource.id)}
                                >
                                        <FaRegTrashAlt className="resource-icon w-6 h-6" />
                                </button>
                        </div>
                </div>
        );
}

export default ResourcesDisplay;
