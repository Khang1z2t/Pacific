import { useState } from "react";

export const AdminAside = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-gray-800 text-white w-64 z-50`}>
            <button onClick={toggleSidebar} className="p-4 focus:outline-none">
                {isOpen ? 'Close' : 'Open'} Sidebar
            </button>
            <nav className="mt-10">
                <a href="/admin" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Dashboard</a>
                <a href="/admin-dat" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Bookings</a>
                {/* Add more links as needed */}
            </nav>
        </div>
    );
};