import { SearchProvider } from "../../context/SearchContext";
import AllSpaceFlights from "./AllSpaceFlights";

function Home() {
  return (
    <>
      <div>
        <div className="mx-auto  my-16">
          <h3 className="my-2 text-left sm:text-center text-[#212529] font-medium text-3xl leading-8">
            Spaceflight Details
          </h3>
          <p className="my-2 text-left sm:text-center text-[#495057] font-normal text-base leading-6">
            <small>
              Find out the elaborate features of all the past big spaceflights
            </small>
          </p>
        </div>

        <SearchProvider>
          <section>
            <AllSpaceFlights />
          </section>
        </SearchProvider>
      </div>
    </>
  );
}

export default Home;
