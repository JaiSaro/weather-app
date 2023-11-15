import {
    configureStore,
    ThunkAction,
    Action,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';
import locationInfoSlice from './locationInfoSlice';

export const store = configureStore({
    reducer: {
        locationInfo: locationInfoSlice,
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false,
        }),
    ],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
