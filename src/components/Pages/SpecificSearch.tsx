import { useState } from "react";
import { useSearch } from "../../context/SearchContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

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
    // console.log(searchInformation);
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
        <div className="my-4 flex sm:justify-end px-5">
          <button onClick={() => setUpcomingFlights(!upcomingFlights)}>
            <div
              className={
                upcomingFlights
                  ? " text-base w-4 h-4 px-1 mr-2 bg-blue-700 border border-blue-900"
                  : " text-base w-4 h-4 px-1 mr-2 border border-gray-600"
              }
            ></div>
          </button>
          <p>Show only upcoming</p>
        </div>
        <div className="mx-5">
          <form onSubmit={handleSearch}>
            <div className="md:grid sm:grid-cols-3 gap-3">
              <div className="border rounded border-[#CED4DA] flex my-4 w-48 md:w-52">
                {" "}
                <input
                  type="text"
                  name="flightName"
                  id=""
                  placeholder="Search..."
                  className="pl-2 py-1 text-[#6C757D] leading-6 text-base font-normal"
                />
                <div className="bg-[#0D6EFD] px-2.5 py-1 text-white mr-0">
                  {/* <input type="submit" value="S" /> */}
                  <button type="submit">
                    <MagnifyingGlassIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="sm:mx-8 md:ml-16 lg:ml-56 my-4 border border-[#CED4DA] rounded w-56 sm:w-44">
                <select
                  className="pl-1 pr-16 sm:pr-6 md:pr-1 py-1"
                  name="launchStatus"
                  id=""
                >
                  <option className="text-[#6C757D]" value="">
                    By Status Launch
                  </option>
                  {launchStatus.map((status, index) => (
                    <option
                      className="text-[#212529]"
                      key={index}
                      value={status.value.toString()}
                    >
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:ml-auto  my-4 border border-[#CED4DA] rounded w-56 sm:w-44 ">
                <select
                  className="pl-1 pr-16 sm:pr-8 py-1"
                  name="launchDate"
                  id=""
                >
                  <option className="text-[#6C757D]" value="By Launch Date">
                    By Launch Date
                  </option>
                  {launchDates.map((date, index) => (
                    <option className="text-[#212529]" key={index} value={date}>
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
