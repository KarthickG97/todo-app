import React, { useContext } from "react";
import Todo from "./components/Todo";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";

const AppWrapper = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-blue-300"
      }`}
    >
      <Todo />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppWrapper />
    </ThemeProvider>
  );
};

export default App;
