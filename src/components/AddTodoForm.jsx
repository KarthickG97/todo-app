import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ThemeContext } from "../context/ThemeContext";

const AddTodoForm = ({ addTodo }) => {
  const { darkMode } = useContext(ThemeContext);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { text: "", category: "General", dueDate: "" },
  });

  const onSubmit = (data) => {
    addTodo(data.text, data.category, data.dueDate);
    reset({ text: "", category: "General", dueDate: "" });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col my-3.5 gap-3 p-4 rounded ${
        darkMode ? "bg-gray-800" : "bg-gray-200"
      }`}
    >
      {/* Task Input */}
      <input
        {...register("text", { required: true })}
        type="text"
        placeholder="Add a new task..."
        className={`border px-3 py-2 rounded w-full ${
          darkMode
            ? "bg-gray-700 text-white placeholder:text-gray-400"
            : "bg-white text-black placeholder:text-gray-600"
        }`}
      />

      {/* Category, Due Date, Button */}
      <div className="flex flex-col sm:flex-row gap-2">
        <select
          {...register("category")}
          className={`flex-1 p-2 rounded ${
            darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
          }`}
        >
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
        </select>

        <input
          {...register("dueDate")}
          type="date"
          className={`flex-1 p-2 rounded ${
            darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
          }`}
        />

        <button
          type="submit"
          className="px-4 py-2 rounded-full bg-black text-white mt-2 sm:mt-0 sm:ml-auto"
        >
          ADD+
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
