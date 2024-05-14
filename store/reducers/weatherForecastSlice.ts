import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IBaseReducerState} from '@/store/reducers/sagaSlice';
import {WeatherForecast} from '@/models/weather';

export interface IWeatherDetailsState extends IBaseReducerState {
    weather: WeatherForecast;
}

export interface IGetWeatherForecast {
    lat: number;
    lon: number;
}

export interface ISetWeather {
    weather: WeatherForecast;
}

export interface ISetWeatherDetailsLoading {
    isLoading: boolean;
}

export interface ISetWeatherDetailsError {
    error: string | null;
}

const initialState: IWeatherDetailsState = {
    weather: {
        currentWeather: null,
        dailyForecast: [],
    },
    isLoading: false,
    error: null,
};

const weatherForecastSlice = createSlice({
    name: 'weatherForecast',
    initialState: initialState,
    reducers: {
        getWeatherForecast: {
            reducer: (state: IWeatherDetailsState) => {
                return {
                    ...state,
                    isLoading: true,
                };
            },
            prepare(lat: string, lon: string) {
                return {
                    payload: {lat: lat, lon: lon},
                };
            },
        },
        setWeatherForecast: {
            reducer: (state: IWeatherDetailsState, action: PayloadAction<ISetWeather>) => {
                return {
                    ...state,
                    weather: action.payload.weather,
                    isLoading: false,
                };
            },
            prepare(weather: WeatherForecast) {
                return {
                    payload: {weather},
                };
            },
        },
        setWeatherForecastError: {
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
        setWeatherForecastLoading: {
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
        resetToInitialWeatherState: () => ({...initialState}),
    },
});

export const {getWeatherForecast, setWeatherForecast, setWeatherForecastError, setWeatherForecastLoading, resetToInitialWeatherState} =
    weatherForecastSlice.actions;
export default weatherForecastSlice.reducer;
