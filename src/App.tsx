import { Result, useSearchActions, useSearchState } from "@yext/search-headless-react";
import { SearchBar } from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import PokeCard from "./components/PokeCard";
import Ce_pokemon from "./types/pokemon";


const App = () => {
  const [pokeResults, setPokeResults] = useState<Result<Ce_pokemon>[]>([]);

  const results = useSearchState(s => s.vertical.results) as unknown as Result<Ce_pokemon>[] | undefined;
  const offset = useSearchState(s => s.vertical.offset) || 0;
  const limit = useSearchState(s => s.vertical.limit) || 0;
  const totalResults = useSearchState(s => s.vertical.resultsCount) || 0;
  const searchLoading = useSearchState(s => s.searchStatus.isLoading)

  const searchActions = useSearchActions();

  useEffect(() => {
    const handleScroll = () => {
      // if the user has scrolled to the bottom of the page, we want to load more results
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        // dont fetch more results if we have already fetched all the results
        console.log(totalResults)
        if (offset + limit < totalResults) {
          console.log("offset", offset);
          console.log("limit", limit);
          searchActions.setOffset(offset + limit);
          console.log("fetching more results");
          searchActions.executeVerticalQuery();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // execute empty query to fetch the first set of results
    console.log("fetching first set of results");
    searchActions.setVerticalLimit(21);
    searchActions.executeVerticalQuery();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect that appends the results to the existing results
  useEffect(() => {
    if(results){
      setPokeResults([...pokeResults, ...results]);
    }
  }, [results]);

  const handleSearch = ({verticalKey, query}: {
    verticalKey?: string;
    query?: string;
  }) => {
   // clear the results when a new search is executed
    setPokeResults([]);
    searchActions.executeVerticalQuery();
  };
    
  return (
    <div className="flex justify-center px-4 py-6">
      <div className="w-full max-w-5xl">

      </div>
    </div>
  );
}

export default App;
