export const resetStoreAC = () => {
    return { type: 'RESET_STORE' as const };
};

export type ResetStoreActionType = ReturnType<typeof resetStoreAC>;
