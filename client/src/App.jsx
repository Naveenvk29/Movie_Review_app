import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Nav from "./pages/Auth/Nav";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Nav />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
};

export default App;
