const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchTitles = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/titles`);
        if (!response.ok) {
            throw new Error("Failed to fetch titles");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching titles:", error);
        throw error;
    }
};
