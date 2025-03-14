import countries from "world-countries";

//lets create list of countries
const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    Label: country.name.common
}));

const useCountries = () => {
    const getAll = () => formattedCountries;
    // console.log(getAll)

    //get the value of the country you pass
    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value);
    }

    return {
        getAll,
        getByValue
    }
}
export default useCountries