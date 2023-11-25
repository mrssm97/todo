import React, { useState } from "react";
import "./Popup.css";
import { useSelector, useDispatch } from "react-redux";
import { updateTodo } from "../../Store/ActionCreator";

export default function UpdatePopup(props) {
  let state = useSelector((x) => x.TodoState);
  let dispatch = useDispatch();
  const index = state.findIndex((x) => x.title === props.title);
  const [showMessage, setShowMessage] = useState(false);
  const [items, setItems] = useState({
    title: state[index].title,
    status: state[index].status,
    date: state[index].date,
  });

  function handleInput(e) {
    let { name, value } = e.target;
    setItems((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }
  function updateTask(e) {
    e.preventDefault();
    let todoList = [...state];
    let item = [...state];
    item.splice(index, 1);
    item = item.find((x) => x.title === items.title);
    if (item) setShowMessage(true);
    else {
      todoList.splice(index, 1, { ...items });
      localStorage.setItem("todoList", JSON.stringify(todoList));
      dispatch(updateTodo(todoList));
      props.cancelPopup();
    }
  }
  return (
    <>
      <div className="popups rounded-3">
        <form className="form-control h-100" onSubmit={updateTask}>
          <h2 className="my-2 py-2 fw-bold text-secondary">To List</h2>
          {showMessage ? (
            <p className="text-danger text-italic">
              This Todo is already Listed!!
            </p>
          ) : (
            ""
          )}
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={items.title}
            className="form-control mb-3"
            onChange={handleInput}
          />
          <label htmlFor="status">Status</label>
          <select
            name="status"
            className="form-select my-2 py-2 w-100"
            id="status"
            onChange={handleInput}
            value={items.status}
          >
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
          <div className="buttons my-5">
            <button type="submit" className="btn btn-success mx-2 w-50">
              Update Task
            </button>
            <button className="btn btn-danger w-25" onClick={props.cancelPopup}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
