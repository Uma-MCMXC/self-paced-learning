import React from "react";

interface InputProps {
    id: string;
    type: string;
    value?: string; // Optional
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Optional
    label?: string;
    placeholder?: string;
    required?: boolean;
}

const Input: React.FC<InputProps> = ({
    id,
    type,
    value,
    onChange,
    label,
    placeholder,
    required,
}) => {
    return (
        <div className="mb-4">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required={required}
            />
        </div>
    );
};

export default Input;
