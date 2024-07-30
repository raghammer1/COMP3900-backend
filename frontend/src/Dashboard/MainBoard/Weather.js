import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { fetchWeather } from '../../services/api';
import useUserStore from '../../zustand/useUserStore';

// This is the styling for the weather bar container
const WeatherBar = styled('div')(({ theme }) => ({
  backgroundColor: '#111',
  color: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  maxWidth: '100%',
  margin: '0 auto',
}));

// This is the styling for the weather information container
const WeatherInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 10px',
});

// This is the styling for the weather text
const WeatherText = styled('p')(({ theme }) => ({
  margin: 0,
  fontSize: '14px',
  [theme.breakpoints.up('sm')]: {
    fontSize: '16px',
  },
}));

// This is the styling for the weather icon
const WeatherIcon = styled('img')({
  width: '60px',
  height: '60px',
  margin: '0 10px',
});

// This is the styling for the loading message
const Loading = styled('div')(({ theme }) => ({
  color: theme.palette.common.white,
  margin: theme.spacing(2, 0),
}));

// This is the styling for the error message
const Error = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  margin: theme.spacing(2, 0),
}));

// Component to display the latest weather data on user's location on the dashboard
const Weather = () => {
  const { user, setUser } = useUserStore();
  const [weather, setWeather] = useState(user.weather || null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!weather);

  // Fetch the latest weather data when the component mounts
  useEffect(() => {
    const getWeather = async (lat, lon) => {
      try {
        const data = await fetchWeather(lat, lon);
        setWeather(data);
        setUser({ weather: data });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!weather) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getWeather(latitude, longitude);
          },
          (error) => {
            setError('Permission to access location was denied');
            setLoading(false);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [weather, setUser]);

  // Display loading message if data is being fetched
  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  // Display error message if there was an error fetching the data
  if (error) {
    return <Error>Error: {error}</Error>;
  }

  // Here, we return the JSX for rendering the weather information
  return (
    <WeatherBar>
      <WeatherIcon
        src={`https:${weather.current.condition.icon}`}
        alt={weather.current.condition.text}
      />
      <WeatherInfo>
        <WeatherText>{weather.location.name}</WeatherText>
        <WeatherText>
          {weather.location.region}, {weather.location.country}
        </WeatherText>
      </WeatherInfo>
      <WeatherInfo>
        <WeatherText>{weather.current.temp_c} °C</WeatherText>
        <WeatherText>{weather.current.condition.text}</WeatherText>
      </WeatherInfo>
      <WeatherInfo>
        <WeatherText>Humidity: {weather.current.humidity}%</WeatherText>
        <WeatherText>
          Wind: {weather.current.wind_kph} kph {weather.current.wind_dir}
        </WeatherText>
      </WeatherInfo>
    </WeatherBar>
  );
};

export default Weather;
