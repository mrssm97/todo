import { CREATE_TODO, DELETE_TODO, UPDATE_TODO } from "./Constants";

export function createTodo(item) {
  return { type: CREATE_TODO, payload: item };
}
export function updateTodo(item) {
  return { type: UPDATE_TODO, payload: item };
}
export function deleteTodo(item) {
  return { type: DELETE_TODO, payload: item };
}
