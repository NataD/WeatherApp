import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum TemperatureUnit {
    METRIC = 'metric',
    IMPERIAL = 'imperial',
}

export interface IFavouriteCity {
    name: string;
    id: string;
    country?: string;
}

export interface IBaseReducerState {
    isLoading: boolean;
    error: string | null;
}

export interface ISagaState extends IBaseReducerState {
    favouriteCities: IFavouriteCity[];
    temperatureUnit: TemperatureUnit;
}

export interface IAddFavouriteCity {
    city: IFavouriteCity;
}

export interface IChangeTemperatureUnit {
    unit: TemperatureUnit;
}

export interface IRemoveFavouriteCity {
    cityId: string;
}

export interface ISetLoading {
    isLoading: boolean;
}
export interface ISetError {
    error: string | null;
}

const initialState: ISagaState = {
    isLoading: false,
    error: null,
    favouriteCities: [],
    temperatureUnit: TemperatureUnit.METRIC,
};

const sagaSlice = createSlice({
    name: 'saga',
    initialState: initialState,
    reducers: {
        addCity: {
            reducer: (state: ISagaState, action: PayloadAction<IAddFavouriteCity>) => {
                const cities = [...state.favouriteCities];
                return {
                    ...state,
                    favouriteCities: [...cities, action.payload.city],
                    isLoading: false,
                };
            },
            prepare(city: IFavouriteCity) {
                return {
                    payload: {city},
                };
            },
        },
        removeCity: {
            reducer: (state: ISagaState, action: PayloadAction<IRemoveFavouriteCity>) => {
                const cities = [...state.favouriteCities];
                return {
                    ...state,
                    favouriteCities: cities.filter((city) => city.id !== action.payload.cityId),
                    isLoading: false,
                };
            },
            prepare(cityId: string) {
                return {
                    payload: {cityId},
                };
            },
        },
        changeTemperatureUnit: {
            reducer: (state: ISagaState, action: PayloadAction<IChangeTemperatureUnit>) => {
                return {
                    ...state,
                    temperatureUnit: action.payload.unit,
                    isLoading: false,
                };
            },
            prepare(unit: TemperatureUnit) {
                return {
                    payload: {unit},
                };
            },
        },
        setSagaError: {
            reducer: (state: ISagaState, action: PayloadAction<ISetError>) => {
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
        setSagaLoading: {
            reducer: (state: ISagaState, action: PayloadAction<ISetLoading>) => {
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
        resetToInitialSagaState: () => ({...initialState}),
    },
});

export const {addCity, removeCity, changeTemperatureUnit, setSagaError, setSagaLoading, resetToInitialSagaState} = sagaSlice.actions;
export default sagaSlice.reducer;
