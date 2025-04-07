'use client';
import { useEffect, useState } from "react";

export default function LocationFinderClient() {
  const [locationInfo, setLocationInfo] = useState<{ City: string; lat?: number; lon?: number }>({ City: 'N/A' });
  const [temp, setTemp] = useState<number | null>(null);

  const getLocationAndWeather = async () => {
    // Get location info
    const response = await fetch('https://apip.cc/json');
    const locationData = await response.json();
    setLocationInfo(locationData);

    console.log(locationData);

    const { Latitude,Longitude } = locationData;

    // Get weather info from 7timer
    if (Latitude && Longitude) {
      const weatherRes = await fetch(`https://www.7timer.info/bin/astro.php?lon=${Longitude}&lat=${Latitude}&ac=0&unit=metric&output=json&tzshift=0`);
      const weatherData = await weatherRes.json();
      console.log(weatherData);
      const tempFromApi = weatherData.dataseries[0].temp2m;
      setTemp(tempFromApi);
    }
  };

  useEffect(() => {
    getLocationAndWeather();
  }, []);

  return (
    <>
      <h1>Hello from {locationInfo?.City} - Client</h1>
      <p>Current temperature: {temp}°C</p>
    </>
  );
}
