/**
 * Actions for user & auth service.
 */
export const SET_USER = "SET_USER";
export const SET_USER_CHATS = "SET_USER_CHATS";
export const REGISTER_EMAIL = "REGISTER_EMAIL";
export const LOGIN_EMAIL = "LOGIN_EMAIL";

/**
 * Actions for todo service.
 */
export const GET_TODO_LIST = "GET_TODO_LIST";

/**
 * Export actions.
 */
export * from "./auth/auth.action";
export * from "./user/user.action";
export * from "./todo/todo.action";