import { useState, useEffect } from "react";
import { fetchTitles } from "../services/titleService";

export const useTitles = () => {
    const [titles, setTitles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTitles = async () => {
            try {
                const data = await fetchTitles();
                setTitles(data);
                setError(null); // ล้างข้อความ error
            } catch (err) {
                setError("Failed to fetch titles. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        loadTitles();
    }, []);

    return { titles, isLoading, error };
};
