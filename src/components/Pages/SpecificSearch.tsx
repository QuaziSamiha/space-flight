import { useState } from "react";
import { useSearch } from "../../context/SearchContext";

function SpecificSearch() {
  const { searchInfo, setSearchInfo } = useSearch();
  const [upcomingFlights, setUpcomingFlights] = useState(false);
  const launchStatus = [
    { name: "Success", value: true },
    { name: "Failed", value: false },
  ];
  const launchDates = ["Last Week", "Last Month", "Last Year"];

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const flightName = (
      form.elements.namedItem("flightName") as HTMLInputElement
    ).value;
    const launchStatus = (
      form.elements.namedItem("launchStatus") as HTMLSelectElement
    ).value;
    const launchDate = (
      form.elements.namedItem("launchDate") as HTMLSelectElement
    ).value;
    // const searchInformation = { flightName, launchStatus, launchDate, upcomingFlights };
    // console.log(searchInfo);
    setSearchInfo({
      ...searchInfo,
      flightName,
      launchStatus,
      launchDate,
      upcomingFlights,
      filtered: true,
    });
  };

  // console.log(upcomingFlights);
  return (
    <>
      <div className="my-8">
        <div className="my-8 flex justify-end px-5">
          <button onClick={() => setUpcomingFlights(!upcomingFlights)}>
            <div
              className={
                upcomingFlights
                  ? "w-4 h-4 px-1 mx-1 rounded-lg bg-blue-700 border border-blue-900"
                  : "w-4 h-4 px-1 mx-1 rounded-lg border border-gray-600"
              }
            ></div>
          </button>
          <p>Show only upcoming</p>
        </div>
        <div className="mx-5">
          <form onSubmit={handleSearch}>
            <div className="md:grid md:grid-cols-3 gap-3">
              <div>
                <input
                  type="text"
                  name="flightName"
                  id=""
                  placeholder="Enter Rocket Name..."
                />
                <input type="submit" value="Search" />
              </div>
              <div className="md:ml-auto md:pr-5">
                <select name="launchStatus" id="">
                  <option value="" disabled>
                    By Launch Status
                  </option>
                  {launchStatus.map((status, index) => (
                    <option key={index} value={status.value.toString()}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:ml-auto">
                <select name="launchDate" id="">
                  <option value="" disabled>
                    By Launch Date
                  </option>
                  {launchDates.map((date, index) => (
                    <option key={index} value={date}>
                      {date}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SpecificSearch;
