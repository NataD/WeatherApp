import {combineEpics, Epic, ofType} from 'redux-observable';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {addAlert} from '@/store/reducers/alertSlice';
import {changeTemperatureUnit} from '@/store/reducers/sagaSlice';
import {getCurrentWeatherDetails} from '@/store/reducers/currentWeatherSlice';
import {currentWeatherSelector} from '@/store/selectors/currentWeatherSelectors';
import {handleErrorAlert} from '@/utils/alertHandlingUtils';

const changeTemperatureUnitEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(changeTemperatureUnit.type),
        switchMap(() => {
            const weather = currentWeatherSelector(state$.value);
            if (weather) {
                return of(getCurrentWeatherDetails(String(weather.id)));
            } else {
                return of(addAlert(handleErrorAlert('Something went wrong, please try again later')));
            }
        })
    );

const sagaEpic = combineEpics(changeTemperatureUnitEpic);

export default sagaEpic;
