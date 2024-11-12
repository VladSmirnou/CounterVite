import {
    counterStatusReducer,
    counterStatusChanged,
} from '../counter-status-slice';

export enum CounterStatus {
    ERROR = 'error',
    IDLE = 'idle',
    TYPING = 'typing',
}

const initialState = 'idle' as CounterStatus;

test('correct counter status is set', () => {
    // data
    const nextStatus = CounterStatus.ERROR;

    // action
    const res = counterStatusReducer(
        initialState,
        counterStatusChanged(nextStatus),
    );

    expect(res).toBe(CounterStatus.ERROR);
    // result
});
