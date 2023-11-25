import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import CreatePopup from "./components/Popups/CreatePopup";
import { deleteTodo, updateTodo } from "./Store/ActionCreator";
import UpdatePopup from "./components/Popups/UpdatePopup";

export default function App() {
  let dispatch = useDispatch();
  let state = useSelector((x) => x.TodoState);
  // let todoList = JSON.parse(localStorage.todoList);
  let todoList = [];
  const [poper, setPoper] = useState(false);
  const [sorted, setSorted] = useState([]);
  const [select, setSelect] = useState("All");
  let updateTitle = useRef("");
  let update = useRef(false);
  let create = useRef(false);

  function cancelPopup() {
    setPoper(false);
    updateTitle.current = "";
    create.current = false;
    update.current = false;
  }
  function removdeTodoItem(title) {
    todoList = [...state];
    let indexOfItem = todoList.findIndex((x) => x.title === title);
    todoList.splice(indexOfItem, 1);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    dispatch(deleteTodo({ title: title }));
  }
  function handleCheckbox(e, title) {
    todoList = [...state];
    let { checked } = e.target;
    let status = checked ? "Completed" : "Incomplete";
    let indexOfItem = todoList.findIndex((x) => x.title === title);
    todoList.splice(indexOfItem, 1, {
      ...todoList[indexOfItem],
      status: status,
    });
    localStorage.setItem("todoList", JSON.stringify(todoList));
    dispatch(updateTodo(todoList));
    setSorted([...state]);
  }
  function handleSelect(e) {
    let { value } = e.target;
    setSelect(value);
  }

  useEffect(() => {
    // console.log(state);
    let items = state.filter((x) =>
      select === "All" ? true : x.status === select
    );
    setSorted(items);
  }, [state, select]);
  // console.log(state);
  // console.log(state);
  return (
    <>
      <div className={`popers ${poper ? "d-block" : "d-none"}`}>
        <div className={`child`}>
          <div className="create-update h-100 w-100 position-absolute top-0 z-2">
            <div
              className="remove position-relative mb-0"
              style={{ height: "12%" }}
            >
              <button
                className="btn btn-danger float-end"
                onClick={() => cancelPopup()}
              >
                <i className="fa-solid fa-xmark fw-bold fs-4"></i>
              </button>
            </div>
            <div className="w-100" style={{ height: "88%" }}>
              {create.current ? (
                <CreatePopup cancelPopup={cancelPopup} />
              ) : update.current ? (
                <UpdatePopup
                  title={updateTitle.current}
                  cancelPopup={cancelPopup}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="main d-flex flex-column align-items-center">
        <h1
          className="text-secondary fw-bold text-center my-1 my-4"
          style={{ height: "5%" }}
        >
          TODO LIST
        </h1>
        <div className="todo">
          <div className="header d-flex justify-content-between">
            <button
              className="btn btn-success fw-bold ms-3"
              onClick={() => {
                create.current = true;
                setPoper(true);
              }}
            >
              Add Task
            </button>
            <select
              name="status"
              className="form-select me-3"
              id="status"
              onChange={handleSelect}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>

          <div
            className="task my-3 pb-3 rounded-3 d-flex flex-column align-items-center position-relative w-100"
            // style={{ backgroundColor: "red" }}
          >
            {/* {poper ? (
              <div className="create-update h-50 w-75 position-absolute top-0 z-2">
                <div className="remove position-relative mb-0">
                  <button
                    className="btn btn-danger float-end"
                    onClick={() => cancelPopup()}
                  >
                    <i className="fa-solid fa-xmark fw-bold fs-4"></i>
                  </button>
                </div>
                <div>
                  {create.current ? (
                    <CreatePopup cancelPopup={cancelPopup} />
                  ) : (
                    <UpdatePopup
                      title={updateTitle.current}
                      cancelPopup={cancelPopup}
                    />
                  )}
                </div>
              </div>
            ) : (
              ""
            )} */}

            {sorted.length ? (
              sorted.map((item, index) => {
                return (
                  <div key={index} className="inner rounded-2 d-flex mt-3">
                    <div className="checkbox-task w-75 h-100 d-flex ">
                      <input
                        type="checkbox"
                        className="mt-1 ms-2"
                        checked={item.status === "Completed" ? "checked" : ""}
                        onChange={(e) => handleCheckbox(e, item.title)}
                      />
                      <div className="task-list ms-2 mt-1 h-50">
                        <p
                          className={`mb-0 ms-2 py-0  ${
                            item.status === "Completed"
                              ? "text-decoration-line-through text-secondary"
                              : "text-secondary-emphais"
                          } fs-6 fw-bold`}
                        >
                          {item.title}
                        </p>
                        <small className="mt-0 ms-2">{item.date}</small>
                      </div>
                    </div>
                    <div className="update w-25 h-100 d-flex justify-content-end align-items-center">
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => removdeTodoItem(item.title)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                      <button
                        className="btn btn-success me-2"
                        onClick={() => {
                          setPoper(true);
                          updateTitle.current = item.title;
                          update.current = true;
                        }}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2 className="my-2 py-2 fw-bold text-secondary border-1">
                No Todos
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
