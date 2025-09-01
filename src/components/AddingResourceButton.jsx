import { FaPlus } from "react-icons/fa";

import { useState } from "react";
import "../index.css";
import resService from "../services/resources";

function AddingResourceButton({ resources, setResources }) {
        const [isForm, setIsForm] = useState(false);
        const [errMsg, setErrMsg] = useState({
                title: "",
                url: "",
        });

        function handleSubmiting(event) {
                event.preventDefault();
                const formData = Object.fromEntries(new FormData(event.currentTarget));

                const formObj = {
                        title: formData.title,
                        url: formData.url,
                        category: formData.category,
                        description: formData.description,
                };

                if (
                        formObj.title === "" ||
                        !formObj.title ||
                        formObj.url === "" ||
                        !formObj.url
                )
                        handleError(
                                `please fill out this field`,
                                formObj.title === "" ? "title" : "",
                                formObj.url === "" ? "url" : "",
                        );
                else if (!isUrlValid(formObj.url))
                        handleError("please enter a valid url", "url");
                else {
                        resService.create(formObj).then((addedRes) => {
                                setResources(resources.concat(addedRes));
                                setIsForm(false);
                        });
                }
        }

        function isUrlValid(url) {
                try {
                        const urlObj = new URL(url);
                        return (
                                urlObj.protocol.includes("http") || urlObj.protocol.includes("https")
                        );
                } catch (err) {
                        return false;
                }
        }

        function handleError(message, ...fields) {
                let errObj = {
                        ...errMsg,
                };
                fields.forEach((f) => {
                        errObj[f] = message;
                });
                setErrMsg(errObj);
                setTimeout(() => setErrMsg({ title: "", url: "" }), 5000);
        }

        if (isForm)
                return (
                        <div className=" col-span-12 md:col-start-2 md:col-span-10 w-full flex items-center content-center justify-center p-2 text-xl">
                                <form
                                        className="w-full text-mainText flex flex-col space-y-4 p-3  rounded-lg bg-cardsBg "
                                        onSubmit={handleSubmiting}
                                >
                                        <h1 className="font-bold">Add New Resource</h1>

                                        <div className="md:flex md:flex-row md:space-x-3 space-y-3">
                                                <Input name="title" message={errMsg} />
                                                <Input name="url" message={errMsg} />
                                        </div>

                                        <TagSelector />

                                        <div className="flex flex-col ">
                                                <label htmlFor="description">description</label>
                                                <textarea
                                                        name="description"
                                                        className="bg-secBg focus:outline-none rounded-md p-2"
                                                ></textarea>
                                        </div>

                                        <div className="flex justify-end items-center space-x-2">
                                                <button
                                                        onClick={() => setIsForm(false)}
                                                        className=" btn hover:bg-secBg px-4"
                                                >
                                                        close
                                                </button>
                                                <button type="submit" className="btn bg-primaryClr font-medium">
                                                        Add Resource
                                                </button>
                                        </div>
                                </form>
                        </div>
                );
        return (
                <button
                        className="col-span-12 min-h-11 md:col-start-2 md:col-span-10 mx-1 btn bg-secBg text-logoClr  flex flex-row content-center items-center justify-center gap-1.5 font-semibold"
                        onClick={() => setIsForm(true)}
                >
                        <FaPlus />
                        <h2 className="text-xl md:text-3xl text-shadow-[0_0_25px_#4f46e5] ">
                                Add New Resource
                        </h2>
                </button>
        );
}

function Input({ name, classes, message }) {
        const [value, setValue] = useState("");

        const className = "bg-secBg rounded-md focus:outline-none p-1 ".concat(
                classes ? classes : "",
        );
        return (
                <div className="flex flex-col flex-grow space-y-1 relative">
                        <label htmlFor={name}>{name.toUpperCase()} *</label>

                        <input
                                className={className}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                name={name}
                        />

                        {message[name] && message[name] !== "" ? (
                                <div className="mt-2 text-lg text-red-500">{message[name]}</div>
                        ) : (
                                <div></div>
                        )}
                </div>
        );
}

function TagSelector() {
        return (
                <div className=" w-full flex flex-grow flex-col space-y-1">
                        <label htmlFor="tagsSelector">Category</label>
                        <select
                                name="category"
                                className=" bg-secBg w-full  rounded-md focus:outline-none"
                        >
                                <option value="Docs">Documentation</option>
                                <option value="Video">Video</option>
                                <option value="Tool">Tool</option>
                                <option value="Bolg">Bolg</option>
                                <option value="Other">Other</option>
                        </select>
                </div>
        );
}

export default AddingResourceButton;
