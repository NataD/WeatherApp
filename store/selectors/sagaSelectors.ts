import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../reducers';

export const selectSagaSlice = (state: RootState) => {
    return state.saga;
};

export const favouriteCitiesSelector = createSelector([selectSagaSlice], (state) => state.favouriteCities);

export const temperatureUnitSelector = createSelector([selectSagaSlice], (state) => state.temperatureUnit);
export const isSagaLoadingSelector = createSelector([selectSagaSlice], (state) => state.isLoading);
export const sagaErrorSelector = createSelector([selectSagaSlice], (state) => state.error);

export const isCityFavouriteSelector = createSelector([favouriteCitiesSelector, (state, id) => id], (cities, id) => {
    return cities?.some((city) => city.id === id);
});

export const defaultFavouriteCitySelector = createSelector([favouriteCitiesSelector], (cities) => {
    return cities.length ? cities[0] : null;
});
