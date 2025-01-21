"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
    const router = useRouter();

    // State สำหรับจัดการข้อมูล
    const [titles, setTitles] = useState<{ id: number; name: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedTitle, setSelectedTitle] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Fetch titles จาก API
    useEffect(() => {
        const fetchTitles = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("http://localhost/api/titles");
                if (!response.ok) {
                    throw new Error("Failed to fetch titles");
                }
                const data = await response.json();
                setTitles(data); // ตั้งค่า titles
                setError(null); // ล้าง error หากไม่มีปัญหา
            } catch (err) {
                setError("Failed to load titles. Please try again later.");
                setTitles([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTitles();
    }, []);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log({
            title: selectedTitle,
            password,
            confirmPassword,
        });

        alert("Form submitted successfully!");
    };

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 pt-24 dark:bg-gray-900 sm:px-8 lg:px-16">
                <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                    <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">
                        Register
                    </h2>
                    {isLoading ? (
                        <div className="text-center text-gray-700 dark:text-gray-300">
                            Loading...
                        </div>
                    ) : error ? (
                        <div className="mb-4 text-center text-red-500">
                            {error}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {/* Title Section */}
                            <div className="mb-4">
                                <label
                                    htmlFor="title_id"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Title
                                </label>
                                <select
                                    id="title_id"
                                    value={selectedTitle}
                                    onChange={(e) =>
                                        setSelectedTitle(e.target.value)
                                    }
                                    className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="" disabled>
                                        Select your title
                                    </option>
                                    {titles.map((title) => (
                                        <option key={title.id} value={title.id}>
                                            {title.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Full Name Section */}
                            <div className="mb-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="first_name"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Enter your first name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="last_name"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Enter your last name"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Class Year Section */}
                            <div className="mb-4">
                                <label
                                    htmlFor="class_year"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Class Year
                                </label>
                                <select
                                    id="class_year"
                                    className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="" disabled>
                                        Select your class year
                                    </option>
                                    <option value="1">Year 1</option>
                                    <option value="2">Year 2</option>
                                    <option value="3">Year 3</option>
                                    <option value="4">Year 4</option>
                                </select>
                            </div>

                            {/* Email Section */}
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            {/* Password Section */}
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="Create a password"
                                    required
                                />
                            </div>

                            {/* Confirm Password Section */}
                            <div className="mb-6">
                                <label
                                    htmlFor="confirm_password"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirm_password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="Confirm your password"
                                    required
                                />
                            </div>

                            {/* Register Button */}
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700"
                            >
                                Register
                            </button>
                        </form>
                    )}
                    <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                        Already have an account?{" "}
                        <button
                            onClick={() => router.push("/sign-in")}
                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
