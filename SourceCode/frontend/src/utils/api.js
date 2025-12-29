const API_BASE = process.env.REACT_APP_API_BASE_URL || "/api";

export const fetchData = async (endpoint) => {
    const response = await fetch(`${API_BASE}${endpoint}`);
    return response.json();
};
