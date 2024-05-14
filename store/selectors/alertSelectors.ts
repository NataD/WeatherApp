import {createSelector} from '@reduxjs/toolkit';
import type {IAlertState} from '../reducers/alertSlice';
import {RootState} from '@/store/reducers';

export const selectAlert = (state: RootState): IAlertState => {
    return state.alert;
};

export const alertsSelector = createSelector([selectAlert], (state: IAlertState) => state.alerts);

export const disabledAlertsSelector = createSelector([selectAlert], (state: IAlertState) => state.alertsDisabled);
