"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
    const router = useRouter();

    return (
        <nav className="fixed left-0 top-0 z-20 w-full border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4">
                {/* Logo Section */}
                <button
                    onClick={() => router.push("/")}
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
                </button>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <button
                        onClick={() => router.push("/sign-in")}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
