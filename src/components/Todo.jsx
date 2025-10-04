import React, { useContext, useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import Todoitems from "./Todoitems";
import { ThemeContext } from "../context/ThemeContext";
import useTodos from "../hooks/useTodos";
import todo_icon from "../assets/todo_icon.png";
import dark_mode_icon from "../assets/dark_mode_icon.png"; // 🌙 single theme icon

const Todo = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dueDateFilter, setDueDateFilter] = useState("");

  const {
    filteredTodos,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addTodo,
    deleteTodo,
    toggleTodo,
  } = useTodos(categoryFilter, dueDateFilter);

  // Keyboard shortcut: Ctrl + D to toggle theme
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        toggleTheme();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme]);

  return (
    <div
      className={`place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl transition-all duration-300
        ${
          darkMode
            ? "bg-gray-900 text-white border border-gray-700"
            : "bg-white text-black border border-gray-300"
        }`}
    >
      {/*------------ Header------------------- */}
      <div className="flex items-center justify-between mt-0 gap-2">
        <div className="flex items-center gap-2">
          <img className="w-8" src={todo_icon} alt="todo icon" />
          <h1 className="text-3xl font-semibold">To-Do List</h1>
        </div>

        {/*--------  Dark mode toggle icon---------------- */}
        <img
          src={dark_mode_icon}
          alt="toggle theme"
          onClick={toggleTheme}
          className={`w-10 h-10 cursor-pointer transition-all duration-300 hover:scale-110 
            ${
              darkMode
                ? "drop-shadow-[0_0_6px_#facc15]" 
                : "opacity-70 hover:opacity-100"
            }`}
        />
      </div>

      {/*-------------------- Search----------------- */}
      <input
        type="text"
        placeholder="Search tasks..."
        className={`mt-4 p-2 rounded-full w-full border ${
          darkMode
            ? "bg-gray-800 text-white placeholder:text-gray-400 border-gray-600"
            : "bg-gray-200 text-black placeholder:text-slate-600 border-gray-300"
        }`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/*----------------- Add Task Form --------------------- */}
      <AddTodoForm addTodo={addTodo} />

      {/*-------------- Filters------------------ */}
      <div className="flex gap-2 mt-3 mb-4 items-center">
        {/*--------------- Category Filter----------------- */}
        <div className="flex-1 flex flex-col">
          <label className="text-sm text-gray-500">Filter by category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 rounded w-full bg-white text-black border-2"
          >
            <option value="All">All</option>
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        {/*----------- Due Date Filter------------------*/}
        <div className="flex-1 flex flex-col">
          <label className="text-sm text-gray-500">Filter by due date</label>
          <input
            type="date"
            value={dueDateFilter}
            onChange={(e) => setDueDateFilter(e.target.value)}
            className="p-2 rounded w-full bg-white text-black border-2"
          />
        </div>
      </div>

      {/*--------------- Status Filter Buttons--------------------- */}
      <div className="flex justify-center gap-3 mb-4">
        {["All", "Active", "Completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-full ${
              filter === f
                ? "bg-black text-white"
                : darkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/*-------- Todo List - scroll option-------- */}
      <div className="flex-1 overflow-y-auto max-h-[220px]">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((item) => (
            <Todoitems
              key={item.id}
              {...item}
              deleteTodo={deleteTodo}
              toggle={toggleTodo}
              darkMode={darkMode}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-2">No tasks found.</p>
        )}
      </div>

      {/*------ Footer -------------- */}
      <div className="mt-5 text-center text-sm text-gray-400">
        Developed by Karthick G |{" "}
        <a
          href="https://github.com/KarthickG97"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Todo;
