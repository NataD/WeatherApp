import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IBaseReducerState} from '@/store/reducers/sagaSlice';
import {CurrentWeather} from '@/models/weather';

export interface IWeatherDetailsState extends IBaseReducerState {
    weather: CurrentWeather | null;
}

export interface IGetWeatherDetails {
    cityId: string;
}

export interface IGetLocationWeatherDetails {
    lat: string;
    lon: string;
}

export interface ISetWeather {
    weather: CurrentWeather | null;
}

export interface ISetWeatherDetailsLoading {
    isLoading: boolean;
}

export interface ISetWeatherDetailsError {
    error: string | null;
}

const initialState: IWeatherDetailsState = {
    weather: null,
    isLoading: false,
    error: null,
};

const currentWeatherSlice = createSlice({
    name: 'currentWeather',
    initialState: initialState,
    reducers: {
        getCurrentWeatherDetails: {
            reducer: (state: IWeatherDetailsState) => {
                return {
                    ...state,
                    isLoading: true,
                };
            },
            prepare(cityId: string) {
                return {
                    payload: {cityId},
                };
            },
        },
        getLocationWeatherDetails: {
            reducer: (state: IWeatherDetailsState) => {
                return {
                    ...state,
                };
            },
            prepare(lat: string, lon: string) {
                return {
                    payload: {lat, lon},
                };
            },
        },
        setCurrentWeatherDetails: {
            reducer: (state: IWeatherDetailsState, action: PayloadAction<ISetWeather>) => {
                return {
                    ...state,
                    weather: action.payload.weather,
                    isLoading: false,
                };
            },
            prepare(weather: CurrentWeather | null) {
                return {
                    payload: {weather},
                };
            },
        },
        setCurrentWeatherDetailsError: {
            reducer: (state: IWeatherDetailsState, action: PayloadAction<ISetWeatherDetailsError>) => {
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
        setCurrentWeatherDetailsLoading: {
            reducer: (state: IWeatherDetailsState, action: PayloadAction<ISetWeatherDetailsLoading>) => {
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
        resetToInitialCurrentWeatherState: () => ({...initialState}),
    },
});

export const {
    getCurrentWeatherDetails,
    setCurrentWeatherDetails,
    setCurrentWeatherDetailsError,
    setCurrentWeatherDetailsLoading,
    getLocationWeatherDetails,
    resetToInitialCurrentWeatherState,
} = currentWeatherSlice.actions;
export default currentWeatherSlice.reducer;
