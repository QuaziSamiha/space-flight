import { useEffect, useState } from "react";
import Flights from "./Flights";
import SpecificSearch from "./SpecificSearch";
import { useSearch } from "../../context/SearchContext";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

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
  currenSpaceFlight: [];
}

function AllSpaceFlights() {
  const [allSpaceFlights, setAllSpaceFlights] = useState<FlightData[]>([]);
  const [filteredSpaceFlights, setFilteredSpaceFlights] = useState<
    FlightData[]
  >([]);
  const [filtered, setFiltered] = useState(false);
  const [flightsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage ? parseInt(storedPage) : 1;
  });
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
        setFilteredSpaceFlights(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // console.log(searchInfo);
    setFiltered(true);
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
      console.log(launchStatusBoolean);
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
    }

    // Update the filtered spaceflights
    setFilteredSpaceFlights(filteredFlights);
  }, [
    searchInfo.flightName,
    searchInfo.launchStatus,
    searchInfo.upcomingFlights,
    searchInfo.launchDate,
  ]);

  // // Save the current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  const indexOfLastLaunch = currentPage * flightsPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - flightsPerPage;

  const currentFilteredSpaceFlights = filteredSpaceFlights.slice(
    indexOfFirstLaunch,
    indexOfLastLaunch
  );
  const currentSpaceFlights = allSpaceFlights.slice(
    indexOfFirstLaunch,
    indexOfLastLaunch
  );

  // // Function to change the current page
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
            currentPage === i
              ? "border border-[#0D6EFD] bg-[#0D6EFD] p-2 text-white"
              : "border p-2"
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
          {filtered === true ? (
            <>
              {currentFilteredSpaceFlights.map((spaceFlight, index) => (
                <Flights key={index} spaceFlight={spaceFlight} />
              ))}
            </>
          ) : (
            <>
              {currentSpaceFlights.map((spaceFlight, index) => (
                <Flights key={index} spaceFlight={spaceFlight} />
              ))}
            </>
          )}
        </div>
        {/* pagination */}
        <div className="my-16 pt-0 text-sm text-[#0D6EFD] text-center flex items-end justify-center">
          <div className="w-8 h-9 flex items-center justify-center  border border-[#DEE2E6]">
            <div>
              <button onClick={prevPage} className="">
                <ChevronLeftIcon className="w-8 h-8 p-2" />
              </button>
            </div>
          </div>{" "}
          {renderPages()}
          <div className="w-8 h-9  flex items-center justify-center border border-[#DEE2E6]">
            <div>
              <button onClick={nextPage} className="">
                <ChevronRightIcon className="w-10 h-10 p-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllSpaceFlights;
