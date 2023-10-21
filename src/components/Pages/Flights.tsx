interface FlightProps {
  spaceFlight: SpaceFlight; // Replace 'SpaceFlight' with the actual type
}

interface SpaceFlight {
  mission_name: string;
  rocket: {
    rocket_name: string;
  };
  launch_success: boolean;
  links: {
    mission_patch_small: string;
  };
  launch_date_utc: string;
  upcoming: boolean;
  // Define the structure of your spaceFlight data here
}
function Flights({ spaceFlight }: FlightProps) {
  // console.log(spaceFlight);
  const {
    mission_name,
    rocket,
    launch_success,
    links,
    launch_date_utc,
    // upcoming,
  } = spaceFlight;
  // console.log(upcoming);
  const { rocket_name } = rocket;
  const { mission_patch_small } = links;

  const launchDate = new Date(launch_date_utc);

  const formattedLaunchDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(launchDate);

  // console.log(formattedLaunchDate);

  return (
    <>
      <div className="border m-5">
        <img src={mission_patch_small} alt="" />
        <h1>{mission_name}</h1>
        <p>{rocket_name}</p>
        <p>Lauch Date: {formattedLaunchDate}</p>
        <p>
          Launch Status:{" "}
          {launch_success === true ? (
            <span className="text-green-500">Success</span>
          ) : launch_success === false ? (
            <span className="text-red-500">Failed</span>
          ) : (
            <span>Not Mentioned</span>
          )}
        </p>
        {/* <p>{upcoming ? "true" : "false"}</p> */}
      </div>
    </>
  );
}

export default Flights;
