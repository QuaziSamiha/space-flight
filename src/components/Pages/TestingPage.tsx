import React, { useEffect, useState } from "react";
import Flights from "./Flights";
import SpecificSearch from "./SpecificSearch";
import { useSearch } from "../../context/SearchContext";

// ... (Other imports and interfaces remain the same)

function AllSpaceFlights() {
  const [allSpaceFlights, setAllSpaceFlights] = useState<FlightData[]>([]);
  const [flightsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage ? parseInt(storedPage) : 1;
  });
  const { searchInfo } = useSearch(); // Get searchInfo from context

  // ... (Other constants and useEffect for fetching data remain the same)

  // Updated useEffect for filtering spaceflights
  useEffect(() => {
    // Filter spaceflights based on searchInfo
    let filteredFlights = allSpaceFlights;

    if (searchInfo.flightName) {
      filteredFlights = filteredFlights.filter((flight) =>
        flight.rocket.rocket_name
          .toLowerCase()
          .includes(searchInfo.flightName.toLowerCase())
      );
    }

    if (searchInfo.launchStatus !== "") {
      const isSuccess = searchInfo.launchStatus === "true";
      filteredFlights = filteredFlights.filter(
        (flight) => flight.launch_success === isSuccess
      );
    }

    if (searchInfo.launchDate) {
      const currentDate = new Date();
      switch (searchInfo.launchDate) {
        case "Last Week":
          currentDate.setDate(currentDate.getDate() - 7);
          break;
        case "Last Month":
          currentDate.setMonth(currentDate.getMonth() - 1);
          break;
        case "Last Year":
          currentDate.setFullYear(currentDate.getFullYear() - 1);
          break;
        default:
          break;
      }
      filteredFlights = filteredFlights.filter(
        (flight) => new Date(flight.launch_date_utc) >= currentDate
      );
    }

    // Update the filtered spaceflights
    setAllSpaceFlights(filteredFlights);
  }, [searchInfo, allSpaceFlights]);

  // ... (The rest of the component code remains the same)

  // Use the filtered spaceflights for rendering
  const indexOfLastLaunch = currentPage * flightsPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - flightsPerPage;
  const currentSpaceFlights = allSpaceFlights.slice(
    indexOfFirstLaunch,
    indexOfLastLaunch
  );

  // ... (Pagination and rendering code remains the same)
}

export default AllSpaceFlights;
