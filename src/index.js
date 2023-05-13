import Notiflix from 'notiflix';
import debounce from 'lodash.debounce'; 
import './css/styles.css';
import API  from './script/fetchCountries.js';

const DEBOUNCE_DELAY = 300;
// API.fetchCountries('ukraine').then(result => console.log(result));
const refs = { 
    inputEl : document.getElementById('search-box'),
    ulEl: document. querySelector('.country-list'),
    divEl: document.querySelector('.country-info'),
}
document.body.style.background = 'yellow';

refs.inputEl.addEventListener('input', debounce(onSubmit, DEBOUNCE_DELAY));
function onSubmit() {
  const inputEvent = refs.inputEl.value.trim();

  if (inputEvent === '') {
    clearInter();
    return;
  }
  API.fetchCountries(inputEvent).then(data => {
    if (data.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );}
      countryResult(data);
  }).catch(err => {
    clearInter();
    Notiflix.Notify.failure('Oops, there is no country with that name');
  });
}

function countryInfo(countries) {
  return countries.reduce((acc, { name: { official }, capital, population, flags, languages }) => {
    languages = Object.values(languages).join(', ');
    return (acc + `
      <img src="${flags.svg}" width="50" alt="name"/>
      <h1>${official}</h1>
      <h2>Capital: ${capital}</h2>
      <p>Population: ${population}</p>
      <p>Languages: ${languages}</p>
    `);
  }, '');
}

function countryList(country){
  return country.reduce((acc, { name: { official }, flags }) => {
    return (acc + `
      <img class="image" src="${flags.svg}" width="50" alt="name"/>
      <h1 class="title">${official}</h1>
    `);
  }, '');
}

function countryResult(result){
  if (result.length === 1) {
    clearInter()
    refs.ulEl.style.visibility = 'hidden';
    refs.divEl.style.visibility = 'visible';
    refs.divEl.innerHTML = countryInfo(result);
  }
  if (result.length >= 2 && result.length <= 10) {
    clearInter()
    refs.divEl.style.visibility = 'hidden';
    refs.ulEl.style.visibility = 'visible';
    refs.ulEl.innerHTML = countryList(result);
  }
}
function clearInter() {
  refs.ulEl.innerHTML = '';
  refs.divEl.innerHTML = '';
}

