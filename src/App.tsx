import React from "react";
import "./App.css";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LabelForm from "./components/LabelForm.tsx";
import ExcelProcess from "./components/ExcelProcess.tsx";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isQuickbooksEnabled =
    process.env.REACT_APP_IS_QUICKBOOKS_ENABLED === "true";
  return (
    <div className="h-screen w-screen bg-neutral-900 flex flex-col">
      {isQuickbooksEnabled && (
        <div className="fixed top-0 w-full bg-neutral-800 text-white flex justify-center space-x-8 py-4 z-10">
          <button
            onClick={() => navigate("/quickbooks")}
            className={`px-4 py-2 ${
              location.pathname === "/quickbooks"
                ? "bg-blue-500"
                : "bg-neutral-700"
            } rounded`}
          >
            QuickBooks Preprocess
          </button>
          <button
            onClick={() => navigate("/label-generator")}
            className={`px-4 py-2 ${
              location.pathname === "/label-generator"
                ? "bg-blue-500"
                : "bg-neutral-700"
            } rounded`}
          >
            Label Generator
          </button>
        </div>
      )}

      <div className="flex-grow flex justify-center items-center pt-20">
        <Routes>
          <Route path="/label-generator" element={<LabelForm />} />
          <Route path="/quickbooks" element={<ExcelProcess />} />
          <Route path="*" element={<Navigate to="/label-generator" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
