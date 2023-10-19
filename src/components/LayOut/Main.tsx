import { Outlet } from "react-router-dom";

interface Props {}

function Main(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  return (
    <>
      <div>
        <h1>this is root layout</h1>
        <Outlet />
      </div>
    </>
  );
}

export default Main;
