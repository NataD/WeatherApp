import {combineEpics} from 'redux-observable';
import currentWeatherEpic from './currentWeatherEpic';
import cityListEpic from '@/store/epics/cityListEpic';
import weatherForecastEpic from '@/store/epics/weatherForecastEpic';
import sagaEpic from '@/store/epics/sagaEpic';

export const rootEpic = combineEpics(cityListEpic, currentWeatherEpic, weatherForecastEpic, sagaEpic);
