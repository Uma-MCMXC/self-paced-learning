"use client";
import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav className="fixed left-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3">
                {/* Logo Section */}
                <a
                    href="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        alt="Logo"
                        className="h-8"
                    />
                    <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Self-Paced Learning
                    </span>
                </a>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
                    >
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
