import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AppLayout from "./ui/AppLayout";
import ForgotPassword from "./pages/ForgotPassword";
import ConfirmRecovery from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./ui/PrivateRoute";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Certificates from "./pages/Certificates";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="certificates"
              element={
                <PrivateRoute>
                  <Certificates />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
