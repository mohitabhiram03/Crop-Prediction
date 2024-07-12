import { useState, useEffect } from 'react';

const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeather = async (apiKey, latitude, longitude) => {
      const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const weatherData = await response.json();
          return weatherData;
        } else {
          throw new Error('Failed to fetch weather data');
        }
      } catch (error) {
        throw new Error('Failed to fetch weather data');
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const apiKey = '39ff62275bmsh536489ab363adb8p13d747jsncdd72b5f311a';
          console.log(latitude, longitude);

          try {
            const weatherData = await getWeather(apiKey, latitude, longitude);
            setWeatherData(weatherData);
          } catch (error) {
            setError('Failed to fetch weather data');
          }
        },
        error => {
          setError('Failed to get location');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);
  return { weatherData, error };
};

export default useWeather;
