import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DtoLocationData } from '../dto/LocationInfo.dto';

const defaultValue: DtoLocationData = {
    center: null,
};

export const locationInfoSlice = createSlice({
    name: 'locationInfo',
    initialState: defaultValue,
    reducers: {
        setLocationCoordinates: (
            state: any,
            action: PayloadAction<google.maps.LatLngLiteral>
        ) => {
            let newValueState: DtoLocationData = { ...state };
            newValueState.center = { ...action.payload };
            return newValueState;
        },
    },
});

export const { setLocationCoordinates } = locationInfoSlice.actions;

export default locationInfoSlice.reducer;
