interface Props {}

function Footer(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  return (
    <>
      <footer className="py-4">
        <div className="container mx-auto text-center">
          <p className="text-[#495057] font-normal text-sm leading-5 ">
            Created by the brilliant minds behind SpaceX
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
