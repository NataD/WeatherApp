import {combineEpics, Epic, ofType, StateObservable} from 'redux-observable';
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {PayloadAction} from '@reduxjs/toolkit';
import {
    getCurrentWeatherDetails,
    getLocationWeatherDetails,
    IGetLocationWeatherDetails,
    IGetWeatherDetails,
    setCurrentWeatherDetails,
    setCurrentWeatherDetailsError,
    setCurrentWeatherDetailsLoading,
} from '@/store/reducers/currentWeatherSlice';
import {addAlert} from '@/store/reducers/alertSlice';
import {ajax} from 'rxjs/ajax';
import {CurrentWeather} from '@/models/weather';
import {isCityFavouriteSelector, temperatureUnitSelector} from '@/store/selectors/sagaSelectors';
import {RootState} from '@/store/reducers';
import {addCity} from '@/store/reducers/sagaSlice';
import {ApiError, handleErrorAlert} from '@/utils/alertHandlingUtils';

const errorActions = (error: ApiError) => {
    const errorObj = handleErrorAlert(error);
    return [setCurrentWeatherDetailsLoading(false), setCurrentWeatherDetailsError(errorObj.message), addAlert(errorObj)];
};

const fetchWeatherDetailsEpic: Epic = (action$, state$: StateObservable<RootState>) =>
    action$.pipe(
        ofType(getCurrentWeatherDetails.type),
        switchMap((action: PayloadAction<IGetWeatherDetails>) => {
            const query = action.payload.cityId,
                unit = temperatureUnitSelector(state$.value),
                apiKey = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY,
                url = `http://api.openweathermap.org/data/2.5/weather?id=${query}&units=${unit}&appid=${apiKey}`;

            return ajax
                .getJSON<CurrentWeather>(url, {
                    Accept: 'application/ld+json',
                    'Content-type': 'application/json',
                })
                .pipe(
                    switchMap((response) => of(setCurrentWeatherDetails(response))),
                    catchError((error) => of(...errorActions(error.response)))
                );
        })
    );

const fetchWeatherLocationDetailsEpic: Epic = (action$, state$: StateObservable<RootState>) =>
    action$.pipe(
        ofType(getLocationWeatherDetails.type),
        switchMap((action: PayloadAction<IGetLocationWeatherDetails>) => {
            const {lat, lon} = action.payload,
                unit = temperatureUnitSelector(state$.value),
                apiKey = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY,
                url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;

            return ajax
                .getJSON<CurrentWeather>(url, {
                    Accept: 'application/ld+json',
                    'Content-type': 'application/json',
                })
                .pipe(
                    switchMap((response) => {
                        const isCityFavourite = isCityFavouriteSelector(state$.value, String(response.id)),
                            actions: any[] = [setCurrentWeatherDetails(response)];
                        if (!isCityFavourite) {
                            actions.push(addCity({name: response.name, id: String(response.id)}));
                        }
                        return of(...actions);
                    }),
                    catchError((error) => of(...errorActions(error.response)))
                );
        })
    );

const currentWeatherEpic = combineEpics(fetchWeatherDetailsEpic, fetchWeatherLocationDetailsEpic);

export default currentWeatherEpic;
