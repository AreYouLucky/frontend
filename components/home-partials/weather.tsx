"use client";

import { useEffect, useState } from "react";
import { WiDaySunny, WiRain, WiCloud } from "react-icons/wi";

type Weather = {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
};

export default function WeatherWidget() {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
      );

      const data = await res.json();
      setWeather(data);
    });
  }, []);

  const getIcon = (code: number) => {
    if (code === 0) return <WiDaySunny size={28} />;
    if (code >= 1 && code <= 3) return <WiCloud size={28} />;
    if (code >= 51) return <WiRain size={28} />;
    return <WiDaySunny size={28} />;
  };

  if (!weather) return <div className="lg:min-w-120 md:min-w-100 w-80 text-white animate-pulse">Loading weather...</div>;

  return (
    <div className=" text-white rounded-xl lg:px-10 px-8  min-h-100  flex justify-center items-center lg:min-w-120 md:min-w-80 w-full">
      {
        weather ? (
          <div className="w-full">
            <h2 className="font-semibold mb-2">Current Location</h2>
            {/* Current */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                {getIcon(weather.current_weather.weathercode)}
                <span className="text-4xl font-bold">
                  {weather.current_weather.temperature}°C
                </span>
              </div>

              <p className="text-sm">
                Wind {weather.current_weather.windspeed} km/h
              </p>
            </div>

            {/* Forecast */}
            <div className="space-y-2">
              {weather.daily.time.slice(0, 7).map((day, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b px-3 py-2 border-white/30"
                >
                  <span>
                    {new Date(day).toLocaleDateString("en-US", { weekday: "short" })}
                  </span>

                  <div className="flex items-center gap-2">
                    {getIcon(weather.daily.weathercode[i])}

                    <span>
                      {weather.daily.temperature_2m_max[i]}° /
                      {weather.daily.temperature_2m_min[i]}°
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-center text-[20px] font-bold">Location Unavailable</h2>
          </>
        )
      }
    </div>
  );
}