import { CREATE_TODO, DELETE_TODO, UPDATE_TODO } from "./Constants";

export default function TodoReducer(
  state = JSON.parse(localStorage.getItem("todoList")) || [],
  action
) {
  let newState, index;
  switch (action.type) {
    case CREATE_TODO:
      newState = [...state];
      newState.push(action.payload);
      return newState;
    case UPDATE_TODO:
      // newState = [...state];
      // index = newState.findIndex((x) => x.title === action.payload.title);
      // newState.splice(index, 1, action.payload);
      // return newState;
      return action.payload;
    case DELETE_TODO:
      newState = [...state];
      index = newState.findIndex((x) => x.title === action.payload.title);
      newState.splice(index, 1);
      return newState;
    default:
      return state;
  }
}
