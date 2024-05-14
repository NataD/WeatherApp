import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IBaseReducerState} from '@/store/reducers/sagaSlice';
import {CityItem} from '@/models/city';

export interface ICityListState extends IBaseReducerState {
    cityList: CityItem[] | null;
}

export interface IGetCityList {
    cityName: string;
}

export interface ISetCityList {
    cityList: CityItem[] | null;
}

export interface ISetCityListLoading {
    isLoading: boolean;
}

export interface ISetCityListError {
    error: string | null;
}

const initialState: ICityListState = {
    cityList: null,
    isLoading: false,
    error: null,
};

const cityListSlice = createSlice({
    name: 'cityList',
    initialState: initialState,
    reducers: {
        getCityList: {
            reducer: (state: ICityListState) => {
                return {
                    ...state,
                    isLoading: true,
                };
            },
            prepare(cityName: string) {
                return {
                    payload: {cityName},
                };
            },
        },
        setCityList: {
            reducer: (state: ICityListState, action: PayloadAction<ISetCityList>) => {
                return {
                    ...state,
                    cityList: action.payload.cityList,
                    isLoading: false,
                };
            },
            prepare(cityList: CityItem[] | null) {
                return {
                    payload: {cityList},
                };
            },
        },
        setCityListError: {
            reducer: (state: ICityListState, action: PayloadAction<ISetCityListError>) => {
                return {
                    ...state,
                    error: action.payload.error,
                };
            },
            prepare(error: string | null) {
                return {
                    payload: {error},
                };
            },
        },
        setCityListLoading: {
            reducer: (state: ICityListState, action: PayloadAction<ISetCityListLoading>) => {
                return {
                    ...state,
                    isLoading: action.payload.isLoading,
                };
            },
            prepare(isLoading: boolean) {
                return {
                    payload: {isLoading},
                };
            },
        },
        resetToInitialCityList: () => ({...initialState}),
    },
});

export const {getCityList, setCityList, setCityListLoading, setCityListError, resetToInitialCityList} = cityListSlice.actions;
export default cityListSlice.reducer;
