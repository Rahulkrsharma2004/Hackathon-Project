const axios = require("axios");

exports.getNearbyRestaurants = async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: "restaurant",
        format: "json",
        limit: 5,
        lat,
        lon,
        radius: 5000, 
      },
    });

    let restaurants = response.data.map((place) => ({
      id: place.place_id,
      name: place.display_name.split(",")[0],
      address: place.display_name,
      lat: place.lat,
      lon: place.lon,
      menu: [
        { name: "Pizza", price: 250 },
        { name: "Burger", price: 150 },
        { name: "Pasta", price: 200 },
        { name: "Sandwich", price: 120 },
        { name: "Biryani", price: 300 },
      ],
    }));

    res.json({ success: true, restaurants });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ success: false, message: "Error fetching restaurants", error });
  }
};
