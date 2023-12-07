import React from "react";
import DynamicForm from "./components/DynamicForm";

interface Field {
  type: "text" | "number" | "select";
  label: string;
  options?: string[];
}

function App() {
  const formFields: Field[] = [
    {
      type: "text",
      label: "Name",
    },
    {
      type: "number",
      label: "Age",
    },
    {
      type: "select",
      label: "Country",
      options: ["USA", "Canada", "UK", "Other"],
    },
  ];

  return (
    <div>
      <h1>Dynamic Form Example</h1>
      <DynamicForm fields={formFields} />
    </div>
  );
}

export default App;
