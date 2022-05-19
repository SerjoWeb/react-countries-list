/** Import React */
import React from 'react';

/** Import Components */
import CountryAreaFilter from './CountryAreaFilter';

/** Init Header component with isLoading, countries, selectCountryHandler as props */
const Header = ({ isLoading, countries, selectCountryHandler } : { isLoading: boolean; countries: any; selectCountryHandler: any; }) => {
  /** Return JSX */
  return (
    <header className='w-full flex justify-start items-start'>
      <h1 className='text-2xl text-black'>List of Countries</h1>
      {
        !isLoading ? (
          <CountryAreaFilter countries={countries} selectCountryHandler={selectCountryHandler} />
        ) : (
          <p>There are no Cointries!</p>
        )
      }
      
    </header>
  );
};

/** Export Header Component */
export default Header;