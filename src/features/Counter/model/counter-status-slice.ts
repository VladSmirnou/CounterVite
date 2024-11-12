import { createSlice } from '@reduxjs/toolkit';
import { CounterStatus } from '../lib/enums/enums';
import { counterTypeChanged } from './common-actions';

const initialState = 'idle' as CounterStatus;

const counterStatusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: (create) => ({
        counterStatusChanged: create.reducer<CounterStatus>((_, action) => {
            return action.payload;
        }),
    }),
    extraReducers: (builder) => {
        builder.addCase(counterTypeChanged, () => {
            return initialState;
        });
    },
});

export const counterStatusReducer = counterStatusSlice.reducer;
export const { counterStatusChanged } = counterStatusSlice.actions;
export const counterStatusSliceName = counterStatusSlice.name;

export type CounterStatusSliceActions = ReturnType<typeof counterStatusChanged>;
