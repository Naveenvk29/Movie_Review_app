import Hero from "./Components/Hero";
import SideBar from "./Components/SideBar";
const DashboardHome = () => {
  return (
    <div className="flex">
      <SideBar />
      <Hero className="z-20" />
    </div>
  );
};

export default DashboardHome;
