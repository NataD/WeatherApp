import {RootState} from '../reducers';
import {createSelector} from '@reduxjs/toolkit';
import {isCityListLoadingSelector} from '@/store/selectors/cityListSelectors';
import {isSagaLoadingSelector} from '@/store/selectors/sagaSelectors';
import {isCurrentWeatherDetailsLoadingSelector} from '@/store/selectors/currentWeatherSelectors';
import {isWeatherForecastLoadingSelector} from '@/store/selectors/weatherForecastSelectors';

export const selectLoadingSlice = (state: RootState) => state.loader;
export const isLoadingSelector = createSelector(
    [
        selectLoadingSlice,
        isCityListLoadingSelector,
        isSagaLoadingSelector,
        isCurrentWeatherDetailsLoadingSelector,
        isWeatherForecastLoadingSelector,
    ],
    (loader, cityListIsLoading, sagaIsLoading, currentWeatherIsLoading, isForecastLoading) =>
        loader.isLoading || cityListIsLoading || sagaIsLoading || currentWeatherIsLoading || isForecastLoading
);
