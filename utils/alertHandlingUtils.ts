import {AlertObject, AlertType} from '@/store/reducers/alertSlice';

export type ApiError = {
    cod: number;
    message: string;
};

export const handleErrorMessage = (error: ApiError | string): string => {
    if (typeof error === 'string') {
        return error;
    }

    return error.message;
};

export const handleErrorAlert = (error: ApiError | string): AlertObject => ({
    message: handleErrorMessage(error),
    type: AlertType.ERROR,
});

export const handleSuccessAlert = (message: string): AlertObject => ({
    message: message,
    type: AlertType.SUCCESS,
});
