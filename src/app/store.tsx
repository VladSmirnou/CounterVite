import {
    ErrorActions,
    errorReducer,
} from '@/features/Counter/model/error-reducer';
import {
    MinMaxValuesActions,
    minMaxValuesReducer,
} from '@/features/Counter/model/minMaxValues-reducer';
import {
    SettingsActions,
    settingsModeReducer,
} from '@/features/Counter/model/settingsMode-reducer';
import { combineReducers, legacy_createStore } from 'redux';
import { thunk, ThunkDispatch } from 'redux-thunk';
import { applyMiddleware } from 'redux';

const rootReducer = combineReducers({
    error: errorReducer,
    minMaxValues: minMaxValuesReducer,
    settingsMode: settingsModeReducer,
});

export const store = legacy_createStore(
    rootReducer,
    {},
    applyMiddleware(thunk),
);

type AppActions = ErrorActions | SettingsActions | MinMaxValuesActions;

export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<void, unknown, AppActions>;
