import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../reducers';

export const selectWeatherForecastSlice = (state: RootState) => {
    return state.weatherForecast;
};

export const weatherForecastSelector = createSelector([selectWeatherForecastSlice], (state) => state.weather);
export const currentForecastWeatherSelector = createSelector([weatherForecastSelector], (weather) => weather.currentWeather);

export const dailyForecastWeatherSelector = createSelector([weatherForecastSelector], (weather) => weather.dailyForecast);

export const isWeatherForecastLoadingSelector = createSelector([selectWeatherForecastSlice], (state) => state.isLoading);
export const weatherFOrecastErrorSelector = createSelector([selectWeatherForecastSlice], (state) => state.error);
