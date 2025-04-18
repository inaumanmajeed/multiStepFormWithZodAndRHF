import countries from "world-countries";

const countryOptions = countries.map((country) => ({
  value: country.cca2, // ISO 3166-1 alpha-2 code
  label: country.name.common, // Country name
  code: country.cca2, // For flag rendering
}));

export default countryOptions;
