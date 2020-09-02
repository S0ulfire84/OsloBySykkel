import React, {Component} from 'react';
import Stations from './components/stations'
import './bootstrap.css';


class App extends Component {

  state = {
    contacts: []
  }

  componentDidMount() {
    fetch('https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json')
    .then(resInfo => resInfo.json())
    .then((dataInfo) => {
      

      fetch('http://gbfs.urbansharing.com/oslobysykkel.no/station_status.json')
      .then(resStatus => resStatus.json())
      .then((dataStatus)=> {
        let stationsData = dataInfo.data.stations
        let stationsInfo = dataStatus.data.stations

        let mix = stationsData.map((item, i) => Object.assign({}, item, stationsInfo[i]));
        
        this.setState({ stations: mix })
      })
      .catch(console.log)

      
    })
    .catch(console.log)
  }

  render() {
    return (
      <Stations stations={this.state.stations} />
    )
  }
}

export default App;
