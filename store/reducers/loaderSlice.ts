import {createSlice} from '@reduxjs/toolkit';

export interface ILoaderState {
    isLoading: boolean;
}

export interface ISetIsLoading {
    readonly payload: {
        isLoading: boolean;
    };
}

const initialState: ILoaderState = {
    isLoading: false,
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState: initialState,
    reducers: {
        setIsLoading: {
            reducer: (state: ILoaderState, action: ISetIsLoading) => {
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
    },
});

export const {setIsLoading} = loaderSlice.actions;
export default loaderSlice.reducer;
