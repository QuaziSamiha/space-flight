import { useEffect, useState } from "react";
import Flights from "./Flights";

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
  const [flightsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
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

  const visiblePages = 5; // Adjust this value to change the number of visible pages
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
        <div className="md:grid md:grid-cols-3 gap-3">
          {currentSpaceFlights.map((spaceFlight, index) => (
            <Flights key={index} spaceFlight={spaceFlight} />
          ))}
        </div>

        {/* pagination */}
        {/* <div className="my-16 text-center">
          <button onClick={prevPage} className="border p-2">
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={
                currentPage === index + 1
                  ? "border border-blue-700 p-2"
                  : "border p-2"
              }
            >
              {index + 1}
            </button>
          ))}

          <button onClick={nextPage} className="border p-2">
            Next
          </button>
        </div> */}

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
