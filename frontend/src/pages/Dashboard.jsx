import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4">
        <h1 className="text-2xl">Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;