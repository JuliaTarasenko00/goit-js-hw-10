const BASE_URL = 'https://restcountries.com/v3.1/name/';
const searchParams = new URLSearchParams({
    fields: 'name,capital,population,flags,languages,',
});

 function fetchCountries (name){
    const url = `${BASE_URL}${name}?${searchParams}`;
    return fetch(url).then(response => {
        if (response.status === 404) {
            throw new Error(response.status);
        }
        return response.json();
    });
};
export default { fetchCountries }

  