"use client";

import React from "react";

export default function Button({
    label,
    onClick,
}: {
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="rounded bg-blue-500 px-4 py-2 text-white"
        >
            {label}
        </button>
    );
}
