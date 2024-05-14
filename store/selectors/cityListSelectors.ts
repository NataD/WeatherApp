import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../reducers';

export const cityListSlice = (state: RootState) => {
    return state.cityList;
};

export const cityListSelector = createSelector([cityListSlice], (state) => state.cityList);
export const isCityListLoadingSelector = createSelector([cityListSlice], (state) => state.isLoading);
export const cityListErrorSelector = createSelector([cityListSlice], (state) => state.error);
