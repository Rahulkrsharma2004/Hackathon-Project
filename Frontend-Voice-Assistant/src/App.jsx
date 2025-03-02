import React from "react";
import VoiceAssistant from "./components/VoiceAssistant";
import "./index.css";

const App = () => {
  return (
    <div className="app">
      <h1>🍽️ Restaurant Finder</h1>
      <VoiceAssistant />
    </div>
  );
};

export default App;
