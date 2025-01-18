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
        <div className="transform overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:scale-105 hover:shadow-lg dark:bg-gray-800">
            <img
                src={image}
                alt={title}
                className="h-40 w-full rounded-t-xl object-cover"
            />
            <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {title}
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {description}
                </p>
                <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                    View Details
                </button>
            </div>
        </div>
    );
}
