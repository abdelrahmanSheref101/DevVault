import { IoSearch } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

import "../index.css";

function Header({ setSearchTerm }) {
        return (
                <div className=" mt-3 col-span-12 md:col-start-2 md:col-span-10 bg-generalBg   flex  items-center justify-between h-13 px-1 sticky top-0 md:h-20  shadow-md ">
                        <div className="text-logoClr font-bold text-xl md:text-4xl  text-shadow-[0_0_25px_#4f46e5] ">
                                DevVault
                        </div>

                        <SearchFilter setSearchTerm={setSearchTerm} />
                        {/* <SearchFilter /> */}
                        <ThemeTogglerButton />
                </div>
        );
}

function SearchFilter({ setSearchTerm }) {
        return (
                <div className="bg-searchBg text-searchColor inline-flex items-center h-8 rounded-md w-[240px] pl-2 md:max-w-2xl md:w-200 lg:w-400 md:h-12 md:text-2xl  shadow-[0_0_10px_#4f46e5]  ">
                        <IoSearch />
                        <input
                                className="w-full text-[20px] text-left flex flex-grow align-middle pl-2 md:text-3xl md:pl-4 focus:outline-none "
                                placeholder="search resources..."
                                onChange={(event) => setSearchTerm(event.target.value)}
                        />
                </div>
        );
}

function ThemeTogglerButton({ themeToggler, theme }) {
        return (
                <div className="w-10 "></div>
                // <button
                //         className="text-[#929CAD] align-middle items-center text-btnColor bg-secBg inline-flex items-center text-2xl p-1 rounded-full md:text-4xl"
                //         onClick={themeToggler}
                // >
                //         {theme ? (
                //                 <MdOutlineDarkMode className="" />
                //         ) : (
                //                 <MdOutlineLightMode className="" />
                //         )}
                // </button>
        );
}

export default Header;
