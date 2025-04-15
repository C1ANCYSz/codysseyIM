import { useGetStudent } from "../hooks/user/useGetStudent";
import StudentDashboard from "../features/user/StudentDashboard";
import { useAuth } from "../context/AuthProvider";

function Dashboard() {
  const { studentData, isLoading, error } = useGetStudent();
  const { userRole } = useAuth();
  console.log(userRole);
  const { name, roadmaps } = studentData || {};

  console.log(studentData);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (userRole === "student") {
    return <StudentDashboard name={name} roadmaps={roadmaps} />;
  }
  // if (role === "admin") {
  //   return <AdminDashboard />;
  // }
  // if (role === "content manager") {
  //   return <ContentManagerDashboard />;
  // }
}

export default Dashboard;
