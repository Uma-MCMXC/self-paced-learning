const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchBranch = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/branches`);
        if (!response.ok) {
            throw new Error("Failed to fetch branches");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching branches:", error);
        throw error;
    }
};
