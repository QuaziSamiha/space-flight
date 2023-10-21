import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface SearchInfo {
  flightName: string;
  launchStatus: string;
  launchDate: string;
  upcomingFlights: boolean;
  filtered: boolean;
}

type SearchContextType = {
  searchInfo: SearchInfo;
  setSearchInfo: Dispatch<SetStateAction<SearchInfo>>;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [searchInfo, setSearchInfo] = React.useState<SearchInfo>({
    flightName: "",
    launchStatus: "",
    launchDate: "",
    upcomingFlights: false,
    filtered: false,
  });

  return (
    <SearchContext.Provider value={{ searchInfo, setSearchInfo }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
