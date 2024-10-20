import type { SetMinMaxValues } from './minMaxValues-reducer';

const initialState = false;

export const settingsModeReducer = (
    state: boolean = initialState,
    action: SettingsActions,
): boolean => {
    switch (action.type) {
        case 'TURN_SETTINGS_MODE_ON': {
            return true;
        }
        case 'TURN_SETTINGS_MODE_OFF': {
            return false;
        }
        case 'SET_MIN_MAX_VALUES': {
            return false;
        }
        default:
            return state;
    }
};

export const turnSettingsModeOnAC = () => {
    return {
        type: 'TURN_SETTINGS_MODE_ON',
    };
};

export const turnSettingsModeOffAC = () => {
    return {
        type: 'TURN_SETTINGS_MODE_OFF',
    };
};

type TurnSettingsModeOnActionType = ReturnType<typeof turnSettingsModeOnAC>;
type TurnSettingsModeOffActionType = ReturnType<typeof turnSettingsModeOffAC>;

export type SettingsActions =
    | SetMinMaxValues
    | TurnSettingsModeOnActionType
    | TurnSettingsModeOffActionType;
