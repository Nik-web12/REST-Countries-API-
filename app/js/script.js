
// ********************************************* Toggle *************************************************** \\

const toggle = document.querySelectorAll('.icon');
const slider = document.querySelector('.ball-slider');
const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');
const audio = document.querySelector('#aud');
toggle.forEach(icon =>{
    icon.addEventListener('click',()=>{
        slider.classList.toggle('on')
        if(document.body.classList.contains('dark-mode')){
            document.body.classList.remove('dark-mode')
            moon.classList.remove('moon-on')
            sun.classList.remove('sun-off')
            audio.play();
        }
        else{
            document.body.classList.add('dark-mode')
            moon.classList.add('moon-on')
            sun.classList.add('sun-off')
            audio.play();
        }
        
    })
})

// ******************************************** Countries ***************************************************** \\

const showCountry = document.querySelector('#show-countries')

const getCountries = async () =>{
    const res = await fetch('https://restcountries.eu/rest/v2/all')
    const allCountries = await res.json();
    displayCountries(allCountries);
    console.log(allCountries);
}
const loading = document.querySelector('.loading');
setTimeout(()=>{
    setTimeout(()=>{
        loading.classList.add('load')
    },2700)
    setTimeout(()=>{
        getCountries();
    },3000)
})

const displayCountries = (allCountries) =>{
 
    allCountries.forEach(country => {
        const countriesData = document.createElement('div')
        countriesData.classList.add('card-content')
        countriesData.innerHTML = `
          <img src="${country.flag}" alt="">
          <div class="card-text">
              <p class ="C-name">${country.name}</p>
              <p>
                   <strong>Population:</strong>${country.population.toLocaleString()}
              </p>
              <p class = "country-region">
                   <strong>Region:</strong>${country.region}
              </p>
               <p>
                   <strong>Capital:</strong>${country.capital}
               </p>
          </div>
        `       
        const showCountryDetails = document.querySelector('.countries-details');
        countriesData.addEventListener('click',()=>{
            showCountryDetails.classList.add('show-details');
            showCountryDetails.classList.remove('hide-details');
            showCountry.style.display = "none";
            countryDetails(country)
        })
        const hideCountryDetails = document.querySelector('.back-btn');
        hideCountryDetails.addEventListener('click',()=>{
            showCountryDetails.classList.remove('show-details');
            showCountryDetails.classList.add('hide-details');
            showCountry.style.display = "flex";
        })
        showCountry.appendChild(countriesData)
    });
}


// ********************************************* Countries-details *********************************************** \\

const countryDetails = (country) =>{
    const detailsContent = document.querySelector('.details');
    
    let borderCountries = country.borders;
    let listOfBorderCountries = document.createElement("div");
    if(borderCountries.length == 0){
      listOfBorderCountries.textContent = "None";
    }else{

      for(let j = 0; j<borderCountries.length; j++){
        const button = document.createElement("button");
        button.classList.add('border-btn')
        button.textContent = borderCountries[j];
        listOfBorderCountries.appendChild(button);
      }
    }

    let borders = document.createElement("div");
    borders.innerHTML = "<b>Border countries : </b>" + listOfBorderCountries.innerHTML;

    detailsContent.innerHTML = `
                  <div class="content">
                     <div class="flag">
                        <img src="${country.flag}" alt="${country.name}">
                      </div>
                      <div class="details-text">
                            <h2>${country.name}</h2>
                            <div class="text">
                                <div class="text-1">
                                    <p>
                                        <strong>Native Name:</strong> ${country.nativeName}
                                    </p>
                                    <p>
                                        <strong>Poupulation:</strong> ${country.population.toLocaleString()}
                                    </p>
                                    <p>
                                        <strong>Region:</strong> ${country.region}
                                    </p>
                                    <p>
                                        <strong>Sub Region</strong>: ${country.subregion}
                                    </p>
                                    <p>
                                        <strong>Capital</strong>: ${country.capital}
                                    </p>
                                </div>
                                <div class="text-2">
                                    <p>
                                        <strong>Top Level Domain</strong>: ${country.topLevelDomain}
                                    </p>
                                    <p>
                                        <strong>Currencies</strong>: ${country.currencies.map(currency => currency.code)}
                                    </p>
                                    <p>
                                        <strong>Languages</strong>: ${country.languages.map(language => language.name)}
                                    </p>
                                </div>
                            </div>
                    </div>    
                     `
                     detailsContent.appendChild(borders);
}

// ************************************************ Search ****************************************************** \\

const searchCountries = document.querySelector('#search-countries');

searchCountries.addEventListener('input',(i)=>{
    const val = i.target.value;
    console.log(val);
    const countryName = document.querySelectorAll('.C-name')
    countryName.forEach(name =>{
        console.log(name.innerText)
        if(name.innerText.toLowerCase().includes(val.toLowerCase())){
            name.parentElement.parentElement.style.display = 'block'
        }
        else{
            name.parentElement.parentElement.style.display = 'none'
        }
    })
})

// *************************** Dropdown[Filter] *********************************** \\

const dropdown = document.querySelector('.filter-btn');
const showDropdown = document.querySelector('.dropdown-content')
const downIcon = document.querySelector('.down');
dropdown.addEventListener('click',()=>{
    showDropdown.classList.toggle('dropdown-content-show')
    downIcon.classList.toggle('rotate');
    searchCountries.value = '';
})

const region = document.querySelectorAll('.region');
console.log(region);
const regionText = document.querySelector('.regionText')

region.forEach(filterRegion =>{
    filterRegion.addEventListener('click',()=>{
        console.log(filterRegion.innerText);
        const countryRegion = document.querySelectorAll('.country-region');
        const countryRegionVal = filterRegion.innerText;
        countryRegion.forEach(r =>{
            if(r.innerText.includes(countryRegionVal) || countryRegionVal == "All"){
                r.parentElement.parentElement.style.display = 'block';
                regionText.innerText = filterRegion.innerText;
            }
            else{
                r.parentElement.parentElement.style.display = 'none'
            }
        })
    })
})

// ************************************************************** \\


const header = document.querySelector('.header');
window.addEventListener('scroll',()=>{
    header.classList.add('sticky');
})



