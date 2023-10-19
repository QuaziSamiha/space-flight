import { useEffect, useState } from "react";
import Flight from "./Flights";

interface FlightData {
  flight_number: number;
  mission_name: string;
  rocket: {
    rocket_name: string;
  };
  launch_success: boolean;
  links: {
    mission_patch_small: string;
  };
  launch_date_utc: string;
  // Add other properties from your SpaceX API response
}

function AllSpaceFlights() {
  const [allSpaceFlights, setAllSpaceFlights] = useState<FlightData[]>([]);

  useEffect(() => {
    // Fetch data from the SpaceX API
    fetch("https://api.spacexdata.com/v3/launches")
      .then((response) => response.json() as Promise<FlightData[]>)
      .then((data) => {
        // Set the retrieved data to the allSpaceFlights state
        setAllSpaceFlights(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // console.log(allSpaceFlights);

  return (
    <>
      <div className="md:grid md:grid-cols-3 gap-3">
        {allSpaceFlights.map((spaceFlight, index) => (
          <Flight key={index} spaceFlight={spaceFlight} />
        ))}
      </div>
    </>
  );
}

export default AllSpaceFlights;
