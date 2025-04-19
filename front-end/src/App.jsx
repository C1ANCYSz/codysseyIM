import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AppLayout from "./ui/AppLayout";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./ui/PrivateRoute";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Certificates from "./pages/Certificates";
import Roadmaps from "./pages/Roadmaps";
import Roadmap from "./features/content/Roadmap";
import Stage from "./features/content/Stage";
import Appointements from "./pages/Appointements";
import { UiContextProvider } from "./context/UiContext";
import AddRoadmap from "./features/content/AddRoadmap";

function App() {
  return (
    <AuthProvider>
      <UiContextProvider>
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
              <Route
                path="appointments"
                element={
                  <PrivateRoute>
                    <Appointements />
                  </PrivateRoute>
                }
              />
              <Route path="roadmaps" element={<Roadmaps />} />
              <Route
                path="roadmaps/:roadmapId/stage/:stageNumber"
                element={
                  <PrivateRoute>
                    <Stage />
                  </PrivateRoute>
                }
              />
              <Route
                path="add-roadmap"
                element={
                  <PrivateRoute>
                    <AddRoadmap />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route path="roadmaps/:roadmapId" element={<Roadmap />} />

            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            ></Route>
          </Routes>
        </Router>
        <Toaster />
      </UiContextProvider>
    </AuthProvider>
  );
}

export default App;
