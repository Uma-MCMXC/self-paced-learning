import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CourseCard from "./components/CourseCard";

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
            <div className="px-4 pt-20">
                <h1 className="mb-6 text-center text-3xl font-bold">
                    Our Courses
                </h1>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course, index) => (
                        <CourseCard
                            key={index}
                            title={course.title}
                            description={course.description}
                            image={course.image}
                        />
                    ))}
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
