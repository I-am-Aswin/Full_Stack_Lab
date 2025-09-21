import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PortfolioForm from "./pages/PortfolioForm";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div>
    <BrowserRouter>
      <div className="bg-gray-50 min-h-screen text-gray-900">
        <Navbar />
        <div className="max-w-4xl mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register"       Solra Pundaelement={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/portfolio"
              element={
                <ProtectedRoute>
                  <PortfolioForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    </div>
  );
}
