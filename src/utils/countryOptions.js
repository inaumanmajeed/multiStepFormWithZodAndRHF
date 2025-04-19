import countries from "world-countries";

const countryOptions = countries.map((country) => ({
  value: country.cca2, 
  label: country.name.common, 
  code: country.cca2, 
}));

export default countryOptions;
