import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function HomePage() {
    // Mock Data
    const courses = [
        {
            title: "Course 1",
            description: "Learn the basics of programming.",
            image: "https://cdn.pixabay.com/photo/2018/09/27/09/22/artificial-intelligence-3706562_1280.jpg",
        },
        {
            title: "Course 2",
            description: "Master advanced programming techniques.",
            image: "https://cdn.pixabay.com/photo/2018/09/27/09/22/artificial-intelligence-3706562_1280.jpg",
        },
        {
            title: "Course 3",
            description: "Understand web development in depth.",
            image: "https://cdn.pixabay.com/photo/2018/09/27/09/22/artificial-intelligence-3706562_1280.jpg",
        },
        {
            title: "Course 4",
            description: "Dive into data science and analytics.",
            image: "https://cdn.pixabay.com/photo/2018/09/27/09/22/artificial-intelligence-3706562_1280.jpg",
        },
        {
            title: "Course 5",
            description: "Explore the world of AI and machine learning.",
            image: "https://cdn.pixabay.com/photo/2018/09/27/09/22/artificial-intelligence-3706562_1280.jpg",
        },
        {
            title: "Course 6",
            description: "Learn mobile application development.",
            image: "https://cdn.pixabay.com/photo/2018/09/27/09/22/artificial-intelligence-3706562_1280.jpg",
        },
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 px-4 pt-24 transition-colors duration-300 dark:bg-gray-900 sm:px-8 lg:px-16">
                {/* Header */}
                <h1 className="mb-10 text-center text-4xl font-extrabold tracking-tight text-gray-800 dark:text-white">
                    Our Courses
                </h1>

                {/* Course Grid */}
                <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course, index) => (
                        <div
                            key={index}
                            className="transform animate-fade-in overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
                        >
                            <img
                                src={course.image}
                                alt={course.title}
                                className="h-40 w-full object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                    {course.title}
                                </h2>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    {course.description}
                                </p>
                                <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <Footer />
            </main>
        </>
    );
}
