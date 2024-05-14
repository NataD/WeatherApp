import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../reducers';

export const selectCurrentWeatherSlice = (state: RootState) => {
    return state.currentWeather;
};

export const currentWeatherSelector = createSelector([selectCurrentWeatherSlice], (state) => state.weather);
export const isCurrentWeatherDetailsLoadingSelector = createSelector([selectCurrentWeatherSlice], (state) => state.isLoading);
export const currentWeatherDetailsErrorSelector = createSelector([selectCurrentWeatherSlice], (state) => state.error);
