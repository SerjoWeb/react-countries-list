/** Import axios */
import axios from 'axios';

/**
 * Import Zustand state management
 * (I used Zustand cuz it's more understandable, modern and easier than Redux and etc...)
 */
import create from 'zustand';

/** Interface for Countries List */
interface Countries {
  name: {
    common: string;
    official: string;
    nativeName: {
      spa: {
        official: string;
        common: string;
      };
    };
  };
  region: string;
  area: number;
};

/** Interface for Countries Store */
interface Countriestore {
  countries: Countries[];
  nonChangebleCountries: Countries[];
  fetch: (url: string) => Promise<any>;
  sorting: (sortField: any, sortOrder: any, selectedCountry: string) => void;
};

/**
 * Create store
 * Countries as a list of Countries
 * Countries non changeble as a list of Countries, state will never change
 * fetch function to fetch a data from API
 */
const useCountries = create<Countriestore>((set, get) => ({
  countries: [],
  nonChangebleCountries: [],
  fetch: async (url: string) => {
    const response = await axios.get(url);
    set({
      countries: await response.data,
      nonChangebleCountries: await response.data
    });
  },
  sorting: (sortField: any, sortOrder: any, selectedCountry: string) => {
    if (sortField && sortOrder) {
      const sorted = [...get().countries].sort((a: any, b: any) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;

        if (a[sortField].official && b[sortField].official) {
          return a[sortField].official.toString().localeCompare(b[sortField].official.toString(), 'en', {numeric: true}) * (sortOrder === 'asc' ? 1 : -1);
        }

        return a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {numeric: true}) * (sortOrder === 'asc' ? 1 : -1);
      });

      set({
        countries: sorted
      });
    }

    if (selectedCountry !== '') {
      const selectedCountryItem = get().nonChangebleCountries.filter((country: any) => country.name.official === selectedCountry)[0];

      set({
        countries: get().countries.filter((country: any) => Number(Math.ceil(country.area)) < Number(Math.ceil(selectedCountryItem.area)))
      });
    }
  }
}));

export default useCountries;
