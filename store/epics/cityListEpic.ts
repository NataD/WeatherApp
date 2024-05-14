import {combineEpics, Epic, ofType} from 'redux-observable';
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {PayloadAction} from '@reduxjs/toolkit';
import {getCityList, IGetCityList, setCityList, setCityListError, setCityListLoading} from '@/store/reducers/cityListSlice';
import {addAlert} from '@/store/reducers/alertSlice';
import {ajax} from 'rxjs/ajax';
import {CityResponse} from '@/models/city';
import {ApiError, handleErrorAlert} from '@/utils/alertHandlingUtils';

const errorActions = (error: ApiError) => {
    const errorObj = handleErrorAlert(error);
    return [setCityListLoading(false), setCityListError(errorObj.message), addAlert(errorObj)];
};

const getCityListEpic: Epic = (action$) =>
    action$.pipe(
        ofType(getCityList.type),
        switchMap((action: PayloadAction<IGetCityList>) => {
            const query = action.payload.cityName,
                apiKey = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY,
                url = `https://api.openweathermap.org/data/2.5/find?q=${query}&type=like&sort=population&cnt=10&appid=${apiKey}`;

            return ajax
                .getJSON<CityResponse>(url, {
                    Accept: 'application/ld+json',
                    'Content-type': 'application/json',
                })
                .pipe(
                    switchMap((response) => {
                        const cityList = response.list;
                        return of(setCityList(cityList));
                    }),
                    catchError((error) => of(...errorActions(error.response)))
                );
        })
    );

const cityListEpic = combineEpics(getCityListEpic);

export default cityListEpic;
