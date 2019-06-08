import { createAction } from 'redux-actions';

export const DASHBOARD_ABOUT_INSERT_NAME = 'DASHBOARD_ABOUT_INSERT';
export const DASHBOARD_ABOUT_INSERT = createAction(DASHBOARD_ABOUT_INSERT_NAME);

export const DASHBOARD_ABOUT_RESET_NAME = 'DASHBOARD_ABOUT_RESET';
export const DASHBOARD_ABOUT_RESET = createAction(DASHBOARD_ABOUT_RESET_NAME);

export const DASHBOARD_ABOUT_UPDATE_NAME = 'DASHBOARD_ABOUT_UPDATE';
export const DASHBOARD_ABOUT_UPDATE = createAction(DASHBOARD_ABOUT_UPDATE_NAME);

export const DASHBOARD_ABOUT_ONMOUNT_NAME = 'DASHBOARD_ABOUT_ONMOUNT';
export const DASHBOARD_ABOUT_ONMOUNT = createAction(DASHBOARD_ABOUT_ONMOUNT_NAME);