const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchData = async (end_point) => {
  try {
    const response = await fetch(`${BASE_URL}${end_point}`, {
      method: "GET",
      headers: {
        Authorization: API_KEY,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`failed to fetch recipe data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
