import { useGetStudent } from "../hooks/user/useGetStudent";
import StudentDashboard from "../features/user/StudentDashboard";
import { useAuth } from "../context/AuthProvider";
import Loader from "../ui/Loader";
function Dashboard() {
  const { userRole, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (userRole === "student") {
    return <StudentDashboard />;
  }
  // if (role === "admin") {
  //   return <AdminDashboard />;
  // }
  // if (role === "content manager") {
  //   return <ContentManagerDashboard />;
  // }
}

export default Dashboard;
