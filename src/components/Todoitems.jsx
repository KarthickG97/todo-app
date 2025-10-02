import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

const Todoitems = ({ id, text, category, dueDate, isComplete, toggle, deleteTodo, darkMode }) => {
  return (
    <div
      className={`flex justify-between items-center p-3 mb-2 rounded-md border ${
        darkMode
          ? "border-gray-700 bg-gray-800 text-white"
          : "border-gray-300 bg-white text-black"
      }`}
    >
      {/*----------------- Left side: checkbox + task info --------------- */}
      <div className="flex items-center gap-3 flex-1">
        {/*---------- Checkbox with toggle ------------- */}
        <img
          src={isComplete ? tick : not_tick}
          className="w-9 cursor-pointer"
          alt="tick"
          onClick={() => toggle(id)}
        />

        {/*---------- Task details ----------------- */}
        <div className={`flex flex-col ${isComplete ? "line-through text-gray-400" : ""}`}>
          <span className="font-medium">{text}</span>
          <div className="text-sm text-gray-500 flex gap-2 mt-1">
            <span>Category: {category}</span>
            {dueDate && <span>Due: {dueDate}</span>}
          </div>
        </div>
      </div>

      {/*------------ Right side: delete button ------------------------ */}
      <div
        onClick={() => deleteTodo(id)}
        className={`ml-3 px-3 py-1 rounded-full cursor-pointer ${
          darkMode ? "bg-white hover:bg-gray-300" : "bg-gray-300 hover:bg-gray-400"
        }`}
      >
        <img className="w-3.5" src={delete_icon} alt="delete" />
      </div>
    </div>
  );
};

export default Todoitems;
