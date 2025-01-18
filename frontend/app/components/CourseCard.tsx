import React from "react";

interface CourseCardProps {
    title: string;
    description: string;
    image: string;
}

export default function CourseCard({
    title,
    description,
    image,
}: CourseCardProps) {
    return (
        <div className="transform overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 hover:scale-105">
            <img src={image} alt={title} className="h-40 w-full object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="mt-2 text-gray-600">{description}</p>
                <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                    View Details
                </button>
            </div>
        </div>
    );
}
