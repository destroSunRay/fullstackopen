import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function App() {
  const [countryName, setCountryName] = useState("");
  const [countriesData, setCountriesData] = useState(null);
  const [matchedCountries, setMatchedCountries] = useState(null);

  const handleCountryNameChange = (e) => {
    e.preventDefault();
    setCountryName(e.target.value);
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => res.data)
      .then((data) => {
        setCountriesData(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    console.log("Effect, countryName");
    if (countryName) {
      setMatchedCountries(
        countriesData.filter((country) =>
          country.name.common.toLowerCase().includes(countryName.toLowerCase())
        )
      );
    } else {
      setMatchedCountries(null);
    }
  }, [countriesData, countryName]);

  return (
    <>
      <label>
        find countries{" "}
        <input value={countryName} onChange={handleCountryNameChange} />
      </label>
      {matchedCountries ? (
        matchedCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : matchedCountries.length === 1 ? (
          <div>
            <h2>{matchedCountries[0].name.common}</h2>
            <p>capital {matchedCountries[0].capital[0]}</p>
            <p>area {matchedCountries[0].area}</p>
            <div>
              <h4>languages:</h4>
              <ul>
                {Object.values(matchedCountries[0].languages).map((lang) => (
                  <li key={lang}>{lang}</li>
                ))}
              </ul>
            </div>
            <div>
              <img
                src={matchedCountries[0].flags.svg}
                alt={matchedCountries[0].flags.alt}
                style={{ width: "320px" }}
              />
            </div>
            <div>
              <h3>Weather in {matchedCountries[0].capital[0]}</h3>
              <p>
                temperature <i>temperature from the weather api</i> Celcius
              </p>
              <div
                style={{
                  backgroundColor: "rgba(150,150,150,0.6)",
                  width: "200px",
                  height: "200px",
                }}
              >
                Image from the weather app
              </div>
              <p>
                wind <i>wind from weather api</i> m/s
              </p>
            </div>
          </div>
        ) : (
          matchedCountries.map((country) => (
            <div key={country.name.common}>
              {country.name.common}{" "}
              <button
                onClick={() => {
                  setCountryName(country.name.common);
                }}
              >
                show
              </button>
            </div>
          ))
        )
      ) : null}
    </>
  );
}

export default App;
