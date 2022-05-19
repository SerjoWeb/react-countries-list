/** Import React */
import React, { useState } from 'react';

/** Import uuid4 component */
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

/** Init CountryAreaFilter with countries and selectCountryHandler as props component */
const CountryAreaFilter = ({ countries, selectCountryHandler } : { countries: any; selectCountryHandler: any; }) => {
  const [select, setSelect] = useState('');
  
  /** Return JSX */
  return (
    <div className='form-control'>
      <label>Select a countries are ares less than:</label>
      <select name="countries" id="countries" value={select} onChange={(e) => {
        selectCountryHandler(e.target.value)
        setSelect(e.target.value)
      }}>
        {
          /** Render countries name and for unique id we use uuidv4 */
          countries.map((country: any) => (
            <option key={uuidv4()} value={country.name.official}>{country.name.official}: {Math.ceil(country.area)}</option>
          ))
        }
      </select>
    </div>
  );
};

/** Export CountryAreaFilter Component */
export default CountryAreaFilter;