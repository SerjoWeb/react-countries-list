/** Import React with hooks */
import React from 'react';

/** Import React icons */
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

/** Import uuid4 component */
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

/** Init CountriesList component with countries, handleSorting, iconStatus as props */
const CountriesList = ({ countries, handleSorting, iconStatus } : { countries: any; handleSorting: any; iconStatus: any; }) => {
  /** Return JSX */
  return (
    <div className='w-full mt-[16px] p-0'>
      <table className='table-auto border-collapse border border-[#E3E6EC] w-full'>
          <thead className='bg-[#474955]'>
            <tr>
              <th className='py-[15px] px-[11px] font-semibold' onClick={() => handleSorting('name')}>
                <div className='w-full flex justify-start items-center cursor-pointer'>
                  <span className='mr-[10px] text-white'>Name</span>
                  {
                    !iconStatus.name ? (
                      <MdKeyboardArrowDown fontSize={20} color='white' />
                    ) : (
                      <MdKeyboardArrowUp fontSize={20} color='white' />
                    )
                  }
                </div>
              </th>
              <th className='py-[15px] px-[11px] font-semibold' onClick={() => handleSorting('region')}>
                <div className='w-full flex start-center items-center cursor-pointer'>
                  <span className='mr-[10px] text-white'>Region</span>
                  {
                    !iconStatus.region ? (
                      <MdKeyboardArrowDown fontSize={20} color='white' />
                    ) : (
                      <MdKeyboardArrowUp fontSize={20} color='white' />
                    )
                  }
                </div>
              </th>
              <th className='py-[15px] px-[11px] font-semibold' onClick={() => handleSorting('area')}>
                <div className='w-full flex justify-start items-center cursor-pointer'>
                  <span className='mr-[10px] text-white'>Area Size</span>
                  {
                    !iconStatus.area ? (
                      <MdKeyboardArrowDown fontSize={20} color='white' />
                    ) : (
                      <MdKeyboardArrowUp fontSize={20} color='white' />
                    )
                  }
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              /** Render countries and for unique id we use uuidv4 */
              countries.map((country: any) => (
                  <tr key={uuidv4()}>
                    <td className='border border-[#E3E6EC] font-medium text-sm py-[15px] px-[11px]'>
                      {country.name.official}
                    </td>
                    <td className='border border-[#E3E6EC] font-medium text-sm py-[15px] px-[11px]'>
                      {country.region}
                    </td>
                    <td className='border border-[#E3E6EC] font-medium text-sm py-[15px] px-[11px]'>
                      {Math.ceil(country.area)}
                    </td>
                  </tr>
                ))
              }
          </tbody>
        </table>
    </div>
  );
};

/** Export CountriesList Component */
export default CountriesList;
