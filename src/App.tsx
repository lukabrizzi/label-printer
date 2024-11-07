import React from "react";
import "./App.css";
import LabelForm from "./components/LabelForm.tsx";

function App() {
  return (
    <div className="App">
      <div className="h-screen w-screen flex justify-center items-center">
        <LabelForm />
      </div>
    </div>
  );
}

export default App;
