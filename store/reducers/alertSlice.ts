import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';

export enum AlertType {
    INFO = 'info',
    WARNING = 'warning',
    SUCCESS = 'success',
    ERROR = 'error',
    NOTIFICATION = 'notification',
}

export interface AlertObject {
    message: string;
    title?: string;
    displayFor?: number;
    id?: string | number;
    displayDate?: number;
    priority?: number;
    type?: AlertType;
}

export interface IAlertState {
    alerts: AlertObject[];
    alertsDisabled: boolean;
}

export interface IAddAlert {
    alert: AlertObject;
}

export interface IRemoveAlert {
    id: number | string;
}

export interface IChangeAlertsDisabled {
    alertsDisabled: boolean;
}

const initialState: IAlertState = {
    alerts: [],
    alertsDisabled: false,
};

const alertSlice = createSlice({
    name: 'alert',
    initialState: initialState,
    reducers: {
        addAlert: {
            reducer: (state: IAlertState, action: PayloadAction<IAddAlert>) => {
                const alerts = [...state.alerts];
                const alert = {
                    id: nanoid(),
                    displayDate: Date.now(),
                    displayFor: 5000,
                    message: action.payload.alert.message,
                    type: action.payload.alert?.type || AlertType.ERROR,
                };

                return {
                    alerts: [...alerts, alert],
                    alertsDisabled: state.alertsDisabled,
                };
            },
            prepare(alert: AlertObject) {
                return {
                    payload: {alert: alert},
                };
            },
        },
        removeAlert: {
            reducer: (state: IAlertState, action: PayloadAction<IRemoveAlert>) => {
                const alerts =
                    Array.isArray(state.alerts) && state.alerts.length > 0
                        ? state.alerts.filter((alert) => alert.id !== action.payload.id)
                        : [];
                return {
                    alerts: alerts,
                    alertsDisabled: state.alertsDisabled,
                };
            },
            prepare(id: string | number) {
                return {
                    payload: {id: id},
                };
            },
        },
        changeAlertsDisabled: {
            reducer: (state: IAlertState, action: PayloadAction<IChangeAlertsDisabled>) => {
                return {
                    alerts: state.alerts,
                    alertsDisabled: action.payload.alertsDisabled,
                };
            },
            prepare(disableErrors: boolean) {
                return {
                    payload: {alertsDisabled: disableErrors},
                };
            },
        },
    },
});

export const {addAlert, removeAlert, changeAlertsDisabled} = alertSlice.actions;
export default alertSlice.reducer;
