import { errorReducer } from '@/features/Counter/model/error-reducer';
import { minMaxValuesReducer } from '@/features/Counter/model/minMaxValues-reducer';
import { settingsModeReducer } from '@/features/Counter/model/settingsMode-reducer';
import { combineReducers, legacy_createStore } from 'redux';

const rootReducer = combineReducers({
    error: errorReducer,
    minMaxValues: minMaxValuesReducer,
    settingsMode: settingsModeReducer,
});

export const store = legacy_createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
