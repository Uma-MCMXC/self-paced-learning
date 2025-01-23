"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { fetchTitles } from "../services/titleService";
import { fetchBranch } from "../services/branchService";
import Select from "../components/froms/Select";
import Input from "../components/froms/Input";
import Button from "../components/froms/Button";

const RegisterPage: React.FC = () => {
    const router = useRouter();

    // State สำหรับจัดการข้อมูล
    const [titles, setTitles] = useState<{ id: number; name: string }[]>([]);
    const [branches, setBranches] = useState<{ id: number; name: string }[]>(
        [],
    );
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Fetch titles จาก API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const titlesData = await fetchTitles();
                const branchData = await fetchBranch();

                setTitles(titlesData);
                setBranches(branchData);
                setError(null);
            } catch (err) {
                setError("Failed to load titles. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
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
            branch: selectedBranch,
            year: selectedYear,
            password,
            confirmPassword,
        });

        alert("Form submitted successfully!");
    };

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 pt-24 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 sm:px-8 lg:px-16">
                <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
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
                            <Select
                                id="branchID"
                                value={selectedBranch}
                                onChange={(e) =>
                                    setSelectedBranch(e.target.value)
                                }
                                options={branches.map((branch) => ({
                                    value: branch.id,
                                    label: branch.name,
                                }))}
                                label="Branch"
                                placeholder="Select your branch"
                                required
                            />
                            <Select
                                id="classYear"
                                value={selectedYear}
                                onChange={(e) =>
                                    setSelectedYear(e.target.value)
                                }
                                options={[
                                    { value: 1, label: "Year 1" },
                                    { value: 2, label: "Year 2" },
                                    { value: 3, label: "Year 3" },
                                    { value: 4, label: "Year 4" },
                                ]}
                                label="Class Year"
                                placeholder="Select your class year"
                                required
                            />
                            <Select
                                id="titleId"
                                value={selectedTitle}
                                onChange={(e) =>
                                    setSelectedTitle(e.target.value)
                                }
                                options={titles.map((title) => ({
                                    value: title.id,
                                    label: title.name,
                                }))}
                                label="Title"
                                placeholder="Select your title"
                                required
                            />

                            <div className="grid gap-4 md:grid-cols-2">
                                <Input
                                    id="firstName"
                                    type="text"
                                    label="First Name"
                                    placeholder="Enter your first name"
                                    required
                                />
                                <Input
                                    id="lastName"
                                    type="text"
                                    label="Last Name"
                                    placeholder="Enter your last name"
                                    required
                                />
                            </div>

                            <Input
                                id="studentId"
                                type="text"
                                label="Student ID"
                                placeholder="Enter your Student ID"
                                required
                            />

                            <Input
                                id="email"
                                type="email"
                                label="Email"
                                placeholder="Enter your email"
                                required
                            />

                            <div className="grid gap-4 md:grid-cols-2">
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    label="Password"
                                    placeholder="Enter your password"
                                    required
                                />

                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    label="Confirm Password"
                                    placeholder="Enter your confirm password"
                                    required
                                />
                            </div>

                            <Button type="submit">Register</Button>
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
