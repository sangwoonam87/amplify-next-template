export default async function LocationFinderServer() {
    // Fetch location info
    const response = await fetch('https://apip.cc/json');
    const locationData = await response.json();
    const { City, Latitude, Longitude } = locationData;
  
    let temp: number | null = null;
  
    // Fetch weather info from 7timer
    if (Latitude && Longitude) {
        const weatherRes = await fetch(`https://www.7timer.info/bin/astro.php?lon=${Longitude}&lat=${Latitude}&ac=0&unit=metric&output=json&tzshift=0`);
        const weatherData = await weatherRes.json();
        temp = weatherData.dataseries[0].temp2m;
    }
  
    return (
      <>
        <h1>Hello from {City} - Server</h1>
        <p>Current temperature: {temp}°C</p>
      </>
    );
  }
  