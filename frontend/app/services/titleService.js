const API_BASE_URL = "http://localhost/api";

export const fetchTitles = async () => {
    const response = await fetch(`${API_BASE_URL}/titles`);
    if (!response.ok) {
        throw new Error("Failed to fetch titles");
    }
    return await response.json();
};
