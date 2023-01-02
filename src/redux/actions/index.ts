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
export const GET_TASK_TODO_LIST = "GET_TODO_LIST";
export const SET_TASK_TODO_LIST = "SET_TODO_LIST";
export const DELETE_TASK_TODO_LIST = "DELETE_TASK_TODO_LIST";
export const CREATE_TASK_TODO_LIST = "NEW_TASK_TODO_LIST";
export const UPDATE_TASK_TODO_LIST = "UPDATE_TASK_TODO_LIST";
export const CREATE_TODO = "CREATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const EDIT_TODO= "EDIT_TODO";

/**
 * Export actions.
 */
export * from "./auth/auth.action";
export * from "./user/user.action";
export * from "./todo/todo.action";