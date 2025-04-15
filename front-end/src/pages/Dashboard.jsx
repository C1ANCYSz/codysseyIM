import { useGetUser } from "../hooks/user/useGetUser";
import StudentDashboard from "../features/user/StudentDashboard";
function Dashboard() {
  const { userData, isLoading, error } = useGetUser();
  console.log(userData);
  const { name, roadmaps, role } = userData || {};

  console.log(userData);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (role === "student") {
    return <StudentDashboard name={name} roadmaps={roadmaps} />;
  }
}

export default Dashboard;
