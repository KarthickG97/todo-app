import { useState, useEffect, useMemo } from "react";

const useTodos = (categoryFilter = "All", dueDateFilter = "") => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, category = "General", dueDate = "") => {
    const newTodo = {
      id: Date.now(),
      text,
      category: category === "All" ? "General" : category,
      dueDate,
      isComplete: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodo = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));
  const toggleTodo = (id) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isComplete: !t.isComplete } : t))
    );

  const filteredTodos = useMemo(() => {
    return todos.filter((t) => {
      // Status filter
      if (filter === "Active" && t.isComplete) return false;
      if (filter === "Completed" && !t.isComplete) return false;

      // Category filter
      if (categoryFilter !== "All" && t.category !== categoryFilter) return false;

      // Due date filter
      if (dueDateFilter && t.dueDate !== dueDateFilter) return false;

      // Search filter
      if (searchQuery && !t.text.toLowerCase().includes(searchQuery.toLowerCase()))
        return false;

      return true;
    });
  }, [todos, filter, searchQuery, categoryFilter, dueDateFilter]);

  return {
    todos,
    filteredTodos,
    addTodo,
    deleteTodo,
    toggleTodo,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
  };
};

export default useTodos;
