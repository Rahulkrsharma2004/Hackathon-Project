import axios from "axios";

const BASE_URL = "https://hackathon-project-sage.vercel.app";

export const fetchRestaurants = async (lat, lng) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/restaurants`, {
      params: { lat, lng },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
};
