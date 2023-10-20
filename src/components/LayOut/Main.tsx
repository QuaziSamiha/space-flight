import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";

function Main() {
  return (
    <>
      <div>
        {/* <h1>this is root layout</h1> */}
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default Main;
