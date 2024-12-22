import { counterTypeChanged } from '../common-actions';
import { counterStatusReducer } from '../counter-status-slice';
import { minMaxValuesReducer } from '../min-max-values-slice';

export enum CounterStatus {
    ERROR = 'error',
    IDLE = 'idle',
    TYPING = 'typing',
}

const initialStoreData = {
    status: 'idle' as CounterStatus,
    minMaxValues: {
        initialMinValue: 0,
        minValue: 0,
        maxValue: 5,
    },
};

const modifiedStoreData = {
    status: 'typing' as CounterStatus,
    minMaxValues: {
        initialMinValue: 4,
        minValue: 6,
        maxValue: 10,
    },
};

test('store is correctly reset', () => {
    // data
    // action
    const finalStatus = counterStatusReducer(
        modifiedStoreData.status,
        counterTypeChanged(),
    );
    const finalMinMaxValues = minMaxValuesReducer(
        modifiedStoreData.minMaxValues,
        counterTypeChanged(),
    );

    // result
    expect({ status: finalStatus, minMaxValues: finalMinMaxValues }).toEqual(
        initialStoreData,
    );
});
