import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Configuration from "../pages/Configuration";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
              <Route path="/" element={<div>Page Home</div>} /> {/* Test simple */}

      <Route path="/" element={<Home />} />
      <Route path="/configuration" element={<Configuration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
