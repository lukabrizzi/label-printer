import React from "react";
import "./App.css";
import LabelForm from "./components/LabelForm.tsx";

function App() {
  return (
    <div className="h-screen w-screen bg-neutral-900 py-10 flex justify-center items-center">
      <LabelForm />
    </div>
  );
}

export default App;
