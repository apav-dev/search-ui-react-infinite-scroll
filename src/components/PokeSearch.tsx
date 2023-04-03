import {
  Result,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { SearchBar } from "@yext/search-ui-react";
import { useCallback, useEffect, useState } from "react";
import PokeCard from "../components/PokeCard";
import Ce_pokemon from "../types/pokemon";
import { CgSpinner } from "react-icons/cg";

const PokeSearch = () => {
  const [pokeResults, setPokeResults] = useState<Result<Ce_pokemon>[]>([]);

  const results = useSearchState((s) => s.vertical.results) as unknown as
    | Result<Ce_pokemon>[]
    | undefined;
  const offset = useSearchState((s) => s.vertical.offset) || 0;
  const limit = useSearchState((s) => s.vertical.limit) || 0;
  const totalResults = useSearchState((s) => s.vertical.resultsCount) || 0;
  const searchLoading = useSearchState((s) => s.searchStatus.isLoading);

  const searchActions = useSearchActions();

  useEffect(() => {
    // execute empty query to fetch the first set of results
    searchActions.setVerticalLimit(21);
    searchActions.executeVerticalQuery();

    // set the offset to 21 so that the next query will fetch the next set of results
    searchActions.setOffset(21);
  }, []);

  // useCallback that handles the scroll event.
  // This will create a new version of this function each time the depsendencies change
  const handleScroll = useCallback(() => {
    // if the user has scrolled to the bottom of the page, we want to load more results
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      !searchLoading
    ) {
      // dont fetch more results if we have already fetched all the results
      if (offset < totalResults) {
        searchActions.executeVerticalQuery();
        searchActions.setOffset(offset + limit);
      }
    }
  }, [results, searchLoading, offset]);

  // Re-attach the scroll event listener when the handleScroll function changes
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // useEffect that appends the results to the existing results
  useEffect(() => {
    if (results) {
      setPokeResults([...pokeResults, ...results]);
    }
  }, [results]);

  const handleSearch = ({
    verticalKey,
    query,
  }: {
    verticalKey?: string;
    query?: string;
  }) => {
    // clear the results when a new search is executed
    setPokeResults([]);
    searchActions.executeVerticalQuery();

    // set the offset to 21 so that the next query will fetch the next set of results
    searchActions.setOffset(21);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {pokeResults.map((pokemon) => (
          <PokeCard result={pokemon} />
        ))}
      </div>
      {searchLoading && (
        <div className="mx-auto flex justify-center py-4">
          <CgSpinner className="animate-spin text-7xl text-blue-500" />
        </div>
      )}
    </>
  );
};

export default PokeSearch;
