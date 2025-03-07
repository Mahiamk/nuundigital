import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

function Type() {
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const sound = new Audio("/speed.mp3"); // Ensure it's in public/
    sound.volume = 0.5; // Adjust volume
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

  const playTypingSound = () => {
    if (audio) {
      audio.currentTime = 0; // Restart sound
      audio.play().catch(err => console.error("Audio play error:", err));
    }
  };

  return (
    <div style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>
      <Typewriter
        options={{
          strings: [
            "Software Developing",
            "Photographing",
            "Designing",
            "Content Creating",
            "Consulting",
            "Printing Services",
          ],
          autoStart: true,
          loop: true,
          delay: 50, // Controls typing speed
          deleteSpeed: 30,
        }}
        onCreateTextNode={() => {
          playTypingSound(); // Plays sound for each character typed
        }}
      />
    </div>
  );
}

export default Type;
