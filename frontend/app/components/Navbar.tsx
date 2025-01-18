import React from "react";

export default function Navbar() {
    return (
        <nav className="fixed left-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
                {/* Logo Section */}
                <a
                    href="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8"
                        alt="Logo"
                    />
                    <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                        Self-Learning
                    </span>
                </a>

                {/* Action Buttons */}
                <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Login with Google
                    </button>
                    <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>

                {/* Navigation Menu */}
                <div
                    className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
                    id="navbar-sticky"
                ></div>
            </div>
        </nav>
    );
}
