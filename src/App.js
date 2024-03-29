import React from 'react';
import LocationDetails from './components/location-details';
import ForecastSummaries from './components/forecast-summaries'
import ForecastDetails from './components/forecast-details';
import './styles/app.scss';
import SearchForm from './components/search-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: 0,
      forecasts: [],
      location: {
        city: '',
        country: '',
      },
    };
    this.handleForecastSelect = this.handleForecastSelect.bind(this);
    this.handleCitySearch = this.handleCitySearch.bind(this);
  }

  handleForecastSelect(date) {
    this.setState({ selectedDate: date });
  }

  getData(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({
        location: {
          city: data.location.city,
          country: data.location.country,
        },
        forecasts: data.forecasts,
      }));
  }

  componentDidMount() {
    const url = 'https://mcr-codes-weather.herokuapp.com/forecast?city=London';
    this.getData(url);
  }

  handleCitySearch(city) {
    const newCity = city;
    const url = `https://mcr-codes-weather.herokuapp.com/forecast?city=${newCity}`;
    this.getData(url);
  }

  render() {
    const selectedForecast = this.state.forecasts.find(forecast => forecast.date === this.state.selectedDate);
    return (
      <div className="forecast">
        <LocationDetails
          city={this.state.location.city}
          country={this.state.location.country}
        />
        <SearchForm
          handleClick={this.handleCitySearch}
          handleKeyPress={this.handleCitySearch}
        />
        <ForecastSummaries forecasts={this.state.forecasts} onForecastSelect={this.handleForecastSelect} />

        {
        selectedForecast && <ForecastDetails forecasts={selectedForecast} />
        }

      </div>
    );
  }
}

export default App;