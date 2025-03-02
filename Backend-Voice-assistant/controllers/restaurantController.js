const axios = require("axios");

exports.getNearbyRestaurants = async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: "restaurant",
        format: "json",
        lat,
        lon,
        limit: 5,
      },
    });

    let restaurants = response.data.map((place) => ({
      id: place.place_id,
      address: place.display_name,
      lat: place.lat,
      lon: place.lon,
    }));

    res.json({ success: true, restaurants });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ success: false, message: "Error fetching restaurants", error });
  }
};
