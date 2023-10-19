import AllSpaceFlights from "./AllSpaceFlights";

interface Props {}

function Home(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  return (
    <>
      <div>
        <div>
          <h1>Spaceflight Details</h1>
          <p>
            <small>
              Find out the elaborate features of all the past big spaceflights
            </small>
          </p>
        </div>
        <section>
          <AllSpaceFlights />
        </section>
      </div>
    </>
  );
}

export default Home;
