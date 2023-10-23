import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";
// import { SpaceFlightsProvider } from "../../context/SpaceFlightsContext";

function Main() {
  return (
    <>
      {/* <SpaceFlightsProvider> */}
      <div>
        {/* <h1>this is root layout</h1> */}
        <Outlet />
        <Footer />
      </div>
      {/* </SpaceFlightsProvider> */}
    </>
  );
}

export default Main;
