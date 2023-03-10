/**
 * Actions for user & auth service.
 */
export const SET_USERS = "SET_USERS";
export const SET_USER_CHATS = "SET_USER_CHATS";
export const REGISTER_EMAIL = "REGISTER_EMAIL";
export const LOGIN_EMAIL = "LOGIN_EMAIL";
export const GET_USERS = "GET_USERS";

/**
 * Actions for todo service.
 */
export const GET_TASK_TODO_LIST = "GET_TODO_LIST";
export const SET_TASK_TODO_LIST = "SET_TODO_LIST";
export const SET_TASK_TODO_LIST_SHARED = "SET_TASK_TODO_LIST_SHARED";
export const DELETE_TASK_TODO_LIST = "DELETE_TASK_TODO_LIST";
export const CREATE_TASK_TODO_LIST = "NEW_TASK_TODO_LIST";
export const CREATE_TASK_TODO_LIST_SHARED = "NEW_TASK_TODO_LIST_SHARED";
export const UPDATE_TASK_TODO_LIST = "UPDATE_TASK_TODO_LIST";
export const CREATE_TODO = "CREATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const EDIT_TODO= "EDIT_TODO";
export const SHARE_TASK= "SHARE_TASK";
export const UNSHARE_TASK= "UNSHARE_TASK";
export const GET_SHARED_TASK = "GET_SHARED_TASK";

/**
 * Export actions.
 */
export * from "./auth/auth.action";
export * from "./user/user.action";
export * from "./todo/todo.action";