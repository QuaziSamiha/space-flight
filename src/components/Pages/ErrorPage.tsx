import { useRouteError } from "react-router-dom";

interface ErrorType {
  statusText?: string;
  message?: string;
  // Add other properties if necessary
}

function ErrorPage() {
  const error = useRouteError() as ErrorType | undefined;
  console.error(error);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="text-center">
          <h1 className="text-2xl md:mb-4 md:text-3xl lg:text-4xl xl:text-5xl font-bold text-red-600">
            Oops!
          </h1>
          <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-800 mb-4">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="italic text-lg md:text-xl lg:text-2xl xl:text-3xl text-blue-600">
            {error?.statusText || error?.message}
          </p>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
