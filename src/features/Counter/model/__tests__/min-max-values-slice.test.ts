import {
    minValueIncremented,
    minMaxValuesReducer,
    minValueReset,
    minMaxValuesSet,
} from '../min-max-values-slice';

type State = {
    initialMinValue: number;
    minValue: number;
    maxValue: number;
};

let initialState: State = { initialMinValue: 0, minValue: 0, maxValue: 5 };

beforeEach(() => {
    initialState = { initialMinValue: 0, minValue: 0, maxValue: 5 };
});

test('correct min, initialMin, and max values are set', () => {
    // data
    const nextMinMaxValues = {
        minValue: 4,
        maxValue: 9,
    };

    // action
    const res = minMaxValuesReducer(
        initialState,
        minMaxValuesSet(nextMinMaxValues),
    );

    // result
    expect(res).toEqual({ minValue: 4, maxValue: 9, initialMinValue: 4 });
});

test('min value is correctly incremented', () => {
    // data
    // action
    const res = minMaxValuesReducer(initialState, minValueIncremented());

    // result
    expect(res).toEqual({ minValue: 1, maxValue: 5, initialMinValue: 0 });
});

test('min value is correctly reset', () => {
    // data
    const modifiedState = { initialMinValue: 2, minValue: 4, maxValue: 7 };

    // action
    const res = minMaxValuesReducer(modifiedState, minValueReset());

    // result
    expect(res).toEqual({ minValue: 2, maxValue: 7, initialMinValue: 2 });
});
