import { createAction } from '@reduxjs/toolkit';

export const counterTypeChanged = createAction('reset-store');

export type CommonActionTypes = ReturnType<typeof counterTypeChanged>;
