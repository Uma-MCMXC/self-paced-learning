interface InputProps {
    id: string;
    type: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    placeholder: string;
    required?: boolean;
    error?: string;
}

const Input: React.FC<InputProps> = ({
    id,
    type,
    value,
    onChange,
    label,
    placeholder,
    required = false,
    error,
}) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`mt-1 w-full rounded-lg border ${
                    error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } bg-gray-50 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default Input;
