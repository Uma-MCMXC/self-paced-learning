"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Input from "../components/froms/Input";
import Button from "../components/froms/Button";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
    const router = useRouter();

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
                <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800">
                    {/* Logo Section */}
                    <div className="text-center">
                        <h2 className="mt-4 text-4xl font-bold text-gray-800 dark:text-white">
                            Welcome Back!
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Sign in to continue your journey with us.
                        </p>
                    </div>

                    {/* Login Form */}
                    <form className="mt-8 space-y-6">
                        <div className="space-y-4">
                            {/* Email Field */}
                            <div>
                                <Input
                                    id="email"
                                    type="email"
                                    label="Email"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <Input
                                    id="password"
                                    type="password"
                                    label="Password"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        {/* Login Button */}
                        <Button type="submit">
                            <svg
                                className="mr-2 h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 12h14M12 5l7 7-7 7"
                                ></path>
                            </svg>
                            Sign In
                        </Button>
                    </form>

                    {/* Register Section */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{" "}
                            <button
                                onClick={() => router.push("/register")}
                                className="inline-flex items-center font-medium text-blue-600 hover:underline dark:text-blue-400"
                            >
                                <svg
                                    className="mr-1 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4v16m8-8H4"
                                    ></path>
                                </svg>
                                Register
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
