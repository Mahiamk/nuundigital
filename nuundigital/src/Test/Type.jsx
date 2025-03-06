import { useEffect, useState } from "react";

function Type() {
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const sound = new Audio("/speed.mp3"); // Ensure it's in public/
    sound.volume = 0.5; // Set volume level
    setAudio(sound);

    // Ensure user interaction enables sound
    const enableSound = () => {
      sound.play()
        .then(() => {
          sound.pause();
          sound.currentTime = 0;
        })
        .catch(err => console.error("User interaction needed:", err));

      document.removeEventListener("click", enableSound);
    };

    document.addEventListener("click", enableSound);
  }, []);

  const playspeedSound = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(err => console.error("Audio play error:", err));
    }
  };

  return (
    <div>
      <h1 onClick={playspeedSound} style={{ cursor: "pointer" }}>
        Click Here to Test Sound 🔊
      </h1>
    </div>
  );
}

export default Type;
