import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import AnalysisReport from "./pages/AnalysisReport";
import History from "./pages/History";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/report" element={<AnalysisReport />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;