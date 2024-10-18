export const settingsModeReducer = (
    state: boolean,
    action: SettingsAction,
): boolean => {
    switch (action.type) {
        case 'TURN_SETTINGS_MODE_ON': {
            return true;
        }
        case 'TURN_SETTINGS_MODE_OFF': {
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

type SettingsAction =
    | TurnSettingsModeOnActionType
    | TurnSettingsModeOffActionType;
