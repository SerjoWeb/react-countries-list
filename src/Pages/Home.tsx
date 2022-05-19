/** Import React and hooks */
import React, { useState, useEffect } from 'react';

/** Import React paginate */
import ReactPaginate from 'react-paginate';

/** Import Components */
import CountriesList from '../Components/CountriesList';
import Header from '../Components/Header';

/** Import a global store Countries */
import useCountries from '../Store/Countries';

/** Init App component as a React.FC type */
const App = () => {
  /** Init state for list of Countries */
  const { countries, nonChangebleCountries, fetch, sorting } = useCountries((state) => state);

  /** Init state for loader */
  const [isLoading, setIsLoading] = useState(false);

  /** Fetch data once - Component Did Mount */
  useEffect(() => {
    /** Set isLoading to true */
    setIsLoading(true);

    /** Fetch data using global store function - fetch */
    fetch('https://restcountries.com/v3.1/all?fields=name,region,area');

    /** Set isLoading to false */
    setIsLoading(false);
  }, []);

  /** Set state for currentCountries */
  const [currentCountries, setCurrentCountries] = useState([]);

  /** Set state for pageCount */
  const [pageCount, setPageCount] = useState(0);

  /** Set state for CountryOffset */
  const [CountryOffset, setCountryOffset] = useState(0);

  /** Set Const Countries per page */
  const CountriesPerPage = 10;

  /** Set state for sorting config */
  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState('asc');

  /** Set state for sortingIcons */
  const [name, setName] = useState(false);
  const [region, setRegion] = useState(false);
  const [area, setArea] = useState(false);

  /** Set state for selected Country */
  const [selectedCountry, setSelectedCountry] = useState('');
  
  /** Handle sorting functionality */
  const handleSorting = (accessor: string) => {
    /** Init sortOrder constant */
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';

    /** Set state and sorting */
    setSortField(accessor);
    setOrder(sortOrder);
    sorting(accessor, sortOrder, '');

    /** Check for accessor and set states */
    accessor === 'name' && setName(!name);
    accessor === 'region' && setRegion(!region);
    accessor === 'area' && setArea(!area);
  };

  /** Use effect hook to init first load and catch changes */
  useEffect(() => {
    if (!isLoading && countries) {
      /** Fetch Countries from another resources */
      const endOffset = CountryOffset + CountriesPerPage;

      /** Set current Countries */
      // @ts-ignore
      setCurrentCountries(countries.slice(CountryOffset, endOffset));
      setPageCount(Math.ceil(countries.length / CountriesPerPage));
    }
  }, [CountryOffset, CountriesPerPage, sortField, order, selectedCountry]);

  /** Handle click on pagination item */
  const handlePageClick = (event: any) => {
    /** Init new offset */
    const newOffset = (event.selected * CountriesPerPage) % countries.length;

    /** Set offset */
    setCountryOffset(newOffset);
  };

  /** Select country handler */
  const selectCountryHandler = (selectedCountry: string) => {
    /** Set selected country state and sorting */
    setSelectedCountry(selectedCountry);
    sorting(undefined, undefined, selectedCountry);
  };

  /** Return JSX */
  return (
    <div className='w-full min-h-[100vh] flex justify-center items-start m-0 p-[10px]'>
      <div className='max-w-[1232px] w-full py-[23px] px-[78px] bg-white shadow-xl'>
        <Header isLoading={isLoading} countries={nonChangebleCountries} selectCountryHandler={selectCountryHandler} />
        {
          /** Check if we have data -> render data if no -> render message */
          !isLoading ? (
            <CountriesList
              countries={currentCountries}
              handleSorting={handleSorting}
              iconStatus={{
                name,
                region,
                area
              }}
            />
          ) : (
            <p className='text-center'>There are no Countries!</p>
          )
        }
        <div className='w-full flex justify-between items-center'>
          <ReactPaginate
            breakLabel='...'
            nextLabel='&#10095;'
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel='&#10094;'
            renderOnZeroPageCount={undefined}
          />
        </div>
      </div>
    </div>
  );
};

/** Export App Component */
export default App;
