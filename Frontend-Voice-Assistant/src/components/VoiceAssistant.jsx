import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const menuImages = {
  Pizza: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_b18AhX_x9OGzOALgqMRzkatTATIQB3fIww&s",
  Burger: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmrD43KBktCBvB8RCm2i4XCp17Ya_7j-A8AQ&s",
  Pasta: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJCsNQJxG5zy8ScNn5KbnnmgzPB_Stz3QGRg&s",
  Sandwich: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_StpqnWoNp9FFQ2hx3lP8UN1zKTAaqVsN3A&s",
  Biryani: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeXiqpF0SDPxRjXO9LUDHvwg0MskDtiY86sg&s",
  Default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLmKr7mQ6Hf1W4bheGInwjvCeUWvi61rSvig&s",
};

const restaurantImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ1mf5ClOr8XOT1XsjF4aBdARxLErH2PKXrA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrsVAmqUrZ_PlstkfBrS7rzaJoUSpmKb2y8A&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFtdRUXGLta8dB5puOfL4rIIBWExKOQM_Cjw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ71s-hSGP2ZJdePouS0JPIZO_eSY-mMPKSA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVnnC5SCsDoJKl3ZvC990CSCkqYc6Rx14huw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO4mffws3krKRfHnXEikGFUteUlofRYxyG3Q&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTckwuOex-yFXDdQkMRJXtunYsK8Gjo6l_8Tw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLvn2ZgjTDB6Vt4m9p7w8TQywBJaqR1iSl7w&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7o8X0wDfkOJ-r_XpCySXAiBhQFiqVRoR1LQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5aISPioqY6Vi3E72QWWYM5nCr_RBqmLRHbA&s",
];

const VoiceAssistant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  const fetchRestaurants = async () => {
    if (!transcript.trim()) {
      alert("❌ Please speak something before searching!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://hackathon-project-sage.vercel.app/api/restaurants/nearby");
      const data = await response.json();
      if (data.success) {
        const updatedRestaurants = data.restaurants.map((rest, index) => ({
          ...rest,
          image: restaurantImages[index % restaurantImages.length],
        }));
        setRestaurants(updatedRestaurants);
      } else {
        console.log("Failed to fetch restaurants:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      resetTranscript();
    }
  };

  return (
    <div className="container">
      <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>🎙️ Start Listening</button>
      <button onClick={SpeechRecognition.stopListening}>⏹️ Stop</button>
      <button onClick={fetchRestaurants}>🔍 Search</button>
      <p>{listening ? "🎤 Listening..." : `You said: "${transcript}"`}</p>

      {loading && <p>Loading restaurants... 🍽️</p>}

      <div className="restaurant-list">
        {restaurants.map((rest) => (
          <div key={rest.id} className="restaurant-card">
            <img src={rest.image} alt={rest.name} className="restaurant-img" />
            <div className="restaurant-info">
              <h3>{rest.name}</h3>
              <p><strong>📍 Address:</strong> {rest.address}</p>
              <p className="location">📌 Lat: {rest.lat}, Lon: {rest.lon}</p>

              <div className="menu">
                <h4>🍽️ Menu:</h4>
                <ul>
                  {rest.menu.map((item, index) => (
                    <li key={index} className="menu-item">
                      <img src={menuImages[item.name] || menuImages.Default} alt={item.name} className="menu-img" />
                      <div className="menu-details">
                        <strong>{item.name}</strong> - ₹{item.price}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceAssistant;
