import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Departments from "./pages/Departments";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="users" element={<Users />} />
          <Route path="roles" element={<Roles />} />
          <Route path="departments" element={<Departments />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;