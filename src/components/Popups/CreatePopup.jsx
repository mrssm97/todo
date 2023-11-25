import React, { useState } from "react";
import "./Popup.css";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../../Store/ActionCreator";

export default function CreatePopup(props) {
  const [showMessage, setShowMessage] = useState(false);
  const [items, setItems] = useState({
    title: "Todo",
    status: "Incomplete",
    date: "",
  });
  let x = new Date();
  let dispatch = useDispatch();
  let state = useSelector((x) => x.TodoState);
  let todoList = [...state];

  function handleInput(e) {
    let { name, value } = e.target;
    setItems((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }
  function addTask(e) {
    e.preventDefault();
    let item = todoList.length && todoList.find((x) => x.title === items.title);
    if (item) setShowMessage(true);
    else {
      let date = x
        .toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
        .concat(",", x.toLocaleDateString());
      let data = { ...items, date: date };
      localStorage.setItem(
        "todoList",
        todoList
          ? JSON.stringify(todoList.concat(data))
          : JSON.stringify([data])
      );
      dispatch(createTodo(data));
      props.cancelPopup();
    }
  }
  return (
    <>
      <div className="popups rounded-3">
        <form className="form-control h-100" onSubmit={addTask}>
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
            value={"Incomplete"}
            onChange={handleInput}
          >
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
          <div className="buttons my-5">
            <button type="submit" className="btn btn-success mx-2 w-50">
              Add Task
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
