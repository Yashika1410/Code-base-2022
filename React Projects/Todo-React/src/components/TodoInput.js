import { React, useRef } from "react";
import styles from "./TodoInput.module.css";

const TodoInput = (props) => {
  const newTodoRef = useRef();
  const submitHandler = () => {
    props.addTodoHandler(newTodoRef.current.value);
    newTodoRef.current.value = "";
  };
  return (
    <div className={`row ${styles.body}`}>
      <h1>Task Management Application</h1>
      <input
        className={`col-8 ${styles.input}`}
        type="text"
        ref={newTodoRef}
        placeholder="Enter your task . . ."
      ></input>
      <button className={`col-3 ${styles.btn}`} onClick={submitHandler}>
        Add
      </button>
    </div>
  );
};

export default TodoInput;
