import {combineEpics, Epic, ofType, StateObservable} from 'redux-observable';
import {catchError, map, switchMap} from 'rxjs/operators';
import {forkJoin, of} from 'rxjs';
import {PayloadAction} from '@reduxjs/toolkit';
import {addAlert} from '@/store/reducers/alertSlice';
import {ajax} from 'rxjs/ajax';
import {CurrentWeather, WeatherForecast, WeatherForecastResponse} from '@/models/weather';
import {temperatureUnitSelector} from '@/store/selectors/sagaSelectors';
import {RootState} from '@/store/reducers';
import {
    getWeatherForecast,
    IGetWeatherForecast,
    setWeatherForecast,
    setWeatherForecastError,
    setWeatherForecastLoading,
} from '@/store/reducers/weatherForecastSlice';
import {ApiError, handleErrorAlert} from '@/utils/alertHandlingUtils';

const errorActions = (error: ApiError) => {
    const errorObj = handleErrorAlert(error);
    return [setWeatherForecastLoading(false), setWeatherForecastError(errorObj.message), addAlert(errorObj)];
};

const fetchWeatherForecastEpic: Epic = (action$, state$: StateObservable<RootState>) =>
    action$.pipe(
        ofType(getWeatherForecast.type),
        switchMap((action: PayloadAction<IGetWeatherForecast>) => {
            const {lat, lon} = action.payload,
                unit = temperatureUnitSelector(state$.value),
                apiKey = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY,
                forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`,
                weatherUrl = `http://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;

            return forkJoin({
                forecast: ajax.getJSON<WeatherForecastResponse>(forecastUrl, {
                    Accept: 'application/ld+json',
                    'Content-type': 'application/json',
                }),
                weather: ajax.getJSON<CurrentWeather>(weatherUrl, {
                    Accept: 'application/ld+json',
                    'Content-type': 'application/json',
                }),
            }).pipe(
                map(({forecast, weather}) => {
                    const weatherDetails: WeatherForecast = {
                        currentWeather: weather,
                        dailyForecast: forecast.list,
                    };
                    return setWeatherForecast(weatherDetails);
                }),
                catchError((error) => of(...errorActions(error.response)))
            );
        })
    );

const weatherForecastEpic = combineEpics(fetchWeatherForecastEpic);

export default weatherForecastEpic;
