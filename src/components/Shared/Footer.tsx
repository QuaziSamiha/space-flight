interface Props {}

function Footer(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  return (
    <>
      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto text-center">
          <p className="text-base md:text-lg lg:text-xl text-gray-600">
            Created by the brilliant minds behind SpaceX
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
