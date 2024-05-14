import {combineReducers} from '@reduxjs/toolkit';
import sagaSlice from '@/store/reducers/sagaSlice';
import alertSlice from '@/store/reducers/alertSlice';
import loaderSlice from '@/store/reducers/loaderSlice';
import cityListSlice from '@/store/reducers/cityListSlice';
import currentWeatherSlice from '@/store/reducers/currentWeatherSlice';
import weatherForecastSlice from '@/store/reducers/weatherForecastSlice';

const appReducer = combineReducers({
    alert: alertSlice,
    loader: loaderSlice,
    saga: sagaSlice,
    currentWeather: currentWeatherSlice,
    weatherForecast: weatherForecastSlice,
    cityList: cityListSlice,
});

const rootReducer = (state: any, action: any) => {
    return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
