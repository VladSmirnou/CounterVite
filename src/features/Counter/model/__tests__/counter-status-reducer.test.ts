import {
    counterStatusReducer,
    setCounterStatusAC,
} from '../counter-status-reducer';

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
        setCounterStatusAC(nextStatus),
    );

    expect(res).toBe(CounterStatus.ERROR);
    // result
});
