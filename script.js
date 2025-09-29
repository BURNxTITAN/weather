const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  // IMPORTANT: Apni khud ki API key istemaal karein
  const APIKey = "98740f4ebc0d63bc0f8ba70090e5a091";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      // --- SABHI IMAGE PATHS MEIN SE "images/" HATA DIYA GAYA HAI ---
      switch (json.weather[0].main.toLowerCase()) {
        case "clear":
          image.src = "images/clear.png"; // Path theek kiya gaya
          break;
        case "rain":
          image.src = "images/rain.png"; // Path theek kiya gaya
          break;
        case "snow":
          image.src = "images/snow.png"; // Path theek kiya gaya
          break;
        case "clouds":
          image.src = "images/cloud.png"; // Path theek kiya gaya
          break;

        default:
          image.src = "images/cloud.png";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    })
    .catch((error) => {
      console.error("Error fetching the weather data:", error);
      alert("Failed to fetch weather data. Please check your connection.");
    });
});
