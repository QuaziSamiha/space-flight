import { useEffect, useState } from "react";
import Flights from "./Flights";
import SpecificSearch from "./SpecificSearch";
import { useSearch } from "../../context/SearchContext";

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
  upcoming: boolean;
}

function AllSpaceFlights() {
  const [allSpaceFlights, setAllSpaceFlights] = useState<FlightData[]>([]);
  const [flightsPerPage] = useState(9);
  // const [currentPage, setCurrentPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(() => {
    // Retrieve the current page from localStorage, or default to page 1
    const storedPage = localStorage.getItem("currentPage");
    return storedPage ? parseInt(storedPage) : 1;
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [filtered, setFiltered] = useState(false);
  const { searchInfo } = useSearch();
  // console.log(searchInfo);
  const totalPages = Math.ceil(allSpaceFlights.length / flightsPerPage);

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

  useEffect(() => {
    console.log(searchInfo);
    // setFiltered(searchInfo.filtered);
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
      const launchStatusString = searchInfo.launchStatus; // Replace with your string value
      const launchStatusBoolean = launchStatusString === "true" ? true : false;
      // const isSuccess = searchInfo.launchStatus === "true";
      filteredFlights = filteredFlights.filter(
        (flight) => flight.launch_success === launchStatusBoolean
      );
    }

    if (searchInfo.upcomingFlights) {
      filteredFlights = filteredFlights.filter(
        (flight) => flight.upcoming === true
      );
      console.log(filteredFlights);
    } else {
      filteredFlights = filteredFlights.filter(
        (flight) => flight.upcoming === false
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
        (flight) => new Date(flight.launch_date_utc) <= currentDate
      );
      // console.log(currentDate);
    }

    // Update the filtered spaceflights
    setAllSpaceFlights(filteredFlights);
  }, [searchInfo.filtered]);

  // Save the current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  // console.log(allSpaceFlights);

  const indexOfLastLaunch = currentPage * flightsPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - flightsPerPage;
  const currentSpaceFlights = allSpaceFlights.slice(
    indexOfFirstLaunch,
    indexOfLastLaunch
  );

  // Function to change the current page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const visiblePages = 6; // Adjust this value to change the number of visible pages
  const renderPages = () => {
    const pageButtons = [];

    // Render the first few pages
    for (let i = 1; i <= Math.min(visiblePages, totalPages); i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={
            currentPage === i ? "border border-blue-700 p-2" : "border p-2"
          }
        >
          {i}
        </button>
      );
    }

    if (visiblePages < totalPages) {
      // Add a dot if there are more pages to the right
      pageButtons.push(<span key="dot">...</span>);
    }

    // Render the last page
    pageButtons.push(
      <button
        key={totalPages}
        onClick={() => paginate(totalPages)}
        className={
          currentPage === totalPages
            ? "border border-blue-700 p-2"
            : "border p-2"
        }
      >
        {totalPages}
      </button>
    );

    return pageButtons;
  };

  return (
    <>
      <div>
        <SpecificSearch />
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentSpaceFlights.map((spaceFlight, index) => (
            <Flights key={index} spaceFlight={spaceFlight} />
          ))}
        </div>

        {/* pagination */}
        <div className="my-16 text-center">
          <button onClick={prevPage} className="border p-2">
            Prev
          </button>
          {renderPages()}
          <button onClick={nextPage} className="border p-2">
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default AllSpaceFlights;
