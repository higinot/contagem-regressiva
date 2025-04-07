import React, { useState, useEffect } from "react";
import "./App.css"; // Certifique-se de ter um arquivo CSS
import img1 from "/355b6677-ac6a-4529-a551-ab917f092f40.jpeg";
import img2 from "/b4aa7784-b509-40ee-8f81-c1de6791c3fd.jpeg";

function App() {
  const targetDate = new Date("2025-05-15T00:00:00").getTime();
  const startDate = new Date("2025-03-22T00:00:00").getTime(); // Data de início fixa

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [progress, setProgress] = useState(0);

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setProgress(100);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });

    // Atualizar progresso
    const totalDuration = targetDate - startDate;
    const passed = now - startDate;
    const percentage = Math.min((passed / totalDuration) * 100, 100);
    setProgress(percentage);
  };

  useEffect(() => {
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    new URL(img1, import.meta.url).href,
    new URL(img2, import.meta.url).href,
  ];

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(imageInterval);
  }, []);

  return (
    <div className="app-container">
      {/* Carrossel */}
      <div className="carousel-container">
        <div
          className="carousel"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div className="carousel-item" key={index}>
              <img src={image} alt={`Imagem ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Contagem Regressiva */}
      <div className="countdown-container">
        <h1>Contagem Regressiva</h1>
        <div className="countdown">
          <div className="time-block">
            <p>{timeLeft.days}</p>
            <span>dias</span>
          </div>
          <div className="time-block">
            <p>{timeLeft.hours}</p>
            <span>horas</span>
          </div>
          <div className="time-block">
            <p>{timeLeft.minutes}</p>
            <span>minutos</span>
          </div>
          <div className="time-block">
            <p>{timeLeft.seconds}</p>
            <span>segundos</span>
          </div>
        </div>
        {/* Barra de Progresso */}
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="progress-label">
          {progress.toFixed(2)}% do tempo já passou
        </p>
      </div>
    </div>
  );
}

export default App;
