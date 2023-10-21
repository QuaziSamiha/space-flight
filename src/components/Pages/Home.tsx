import { SearchProvider } from "../../context/SearchContext";
import AllSpaceFlights from "./AllSpaceFlights";

function Home() {
  return (
    <>
      <div>
        <div className="mx-auto text-center my-16">
          <h1 className="my-4">Spaceflight Details</h1>
          <p className="my-6">
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
