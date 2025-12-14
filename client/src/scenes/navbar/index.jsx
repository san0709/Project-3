import { useState } from "react";
import {
    MdDarkMode,
    MdLightMode,
    MdNotifications,
    MdMessage,
    MdHelp,
    MdSearch,
    MdMenu,
    MdClose,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const mode = useSelector((state) => state.mode);

    // Basic colors
    const alt = mode === "dark" ? "bg-neutral-dark" : "bg-white";
    const fullName = user ? `${user.firstName} ${user.lastName}` : "Guest";

    return (
        <FlexBetween className={`p-4 ${alt} shadow-sm`}>
            <FlexBetween className="gap-7">
                <div
                    className="font-bold text-3xl text-primary cursor-pointer hover:text-secondary transition"
                    onClick={() => navigate("/home")}
                >
                    Sociopedia
                </div>
                {/* DESKTOP SEARCH */}
                <div className="hidden md:flex bg-neutral-light dark:bg-neutral-medium rounded-lg px-4 py-2 gap-3 items-center">
                    <input
                        placeholder="Search..."
                        className="bg-transparent focus:outline-none w-full"
                    />
                    <MdSearch className="text-xl" />
                </div>
            </FlexBetween>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex gap-8 items-center cursor-pointer">
                <div onClick={() => dispatch(setMode())}>
                    {mode === "dark" ? (
                        <MdDarkMode className="text-2xl" />
                    ) : (
                        <MdLightMode className="text-2xl" />
                    )}
                </div>
                <MdMessage className="text-2xl" />
                <MdNotifications className="text-2xl" />
                <MdHelp className="text-2xl" />
                <div className="bg-neutral-light dark:bg-neutral-dark p-2 rounded-md font-medium text-sm">
                    {fullName}
                </div>
                <button
                    onClick={() => dispatch(setLogout())}
                    className="p-2 border rounded hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                    Log Out
                </button>
            </div>

            {/* MOBILE NAV TOGGLE */}
            <div className="flex md:hidden">
                <button onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    <MdMenu className="text-2xl" />
                </button>
            </div>

            {/* MOBILE MENU */}
            {isMobileMenuToggled && (
                <div className="fixed right-0 bottom-0 h-full z-10 max-w-[500px] min-w-[300px] bg-background-alt dark:bg-background-dark p-8 shadow-2xl transition-transform">
                    {/* CLOSE ICON */}
                    <div className="flex justify-end p-4">
                        <button onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <MdClose className="text-2xl" />
                        </button>
                    </div>

                    {/* MENU ITEMS */}
                    <div className="flex flex-col justify-center items-center gap-12 text-2xl">
                        <div onClick={() => dispatch(setMode())}>
                            {mode === "dark" ? (
                                <MdDarkMode className="text-2xl" />
                            ) : (
                                <MdLightMode className="text-2xl" />
                            )}
                        </div>
                        <MdMessage className="text-2xl" />
                        <MdNotifications className="text-2xl" />
                        <MdHelp className="text-2xl" />
                        <div className="p-2 bg-neutral-light dark:bg-neutral-medium rounded text-sm">
                            {fullName}
                        </div>
                        <button
                            onClick={() => dispatch(setLogout())}
                            className="text-sm p-2 border rounded"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            )}
        </FlexBetween>
    );
};

export default Navbar;
