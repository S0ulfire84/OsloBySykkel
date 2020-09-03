import React from 'react'

class Stations extends React.Component {
  
  // Custom functions
  state = {stations:[], stationsFiltered:[]}

  fetchFromServer = () => {

    const BASE_URL = 'https://gbfs.urbansharing.com/oslobysykkel.no/'

    fetch(BASE_URL+'station_information.json')
    .then(resInfo => resInfo.json())
    .then((dataInfo) => {
      
  
      fetch(BASE_URL+'station_status.json')
      .then(resStatus => resStatus.json())
      .then((dataStatus)=> {
        let stationsData = dataInfo.data.stations
        let stationsInfo = dataStatus.data.stations
  
        let mix = stationsData.map((item, i) => Object.assign({}, item, stationsInfo[i]));
        
        this.setState({ stations: mix, stationsFiltered:mix })
      })
      .catch(console.log)
  
      
    })
    .catch(console.log)
  }

  updateListButtonClicked = () => {
    this.fetchFromServer()
    this.updateButton.current.disabled = true
    this.searchBar.current.value = ""
    setTimeout( () => {
      this.updateButton.current.disabled = false
    }, 1000);
  }

  handleSearchFilter = filterString => {

    let stationsFiltered = this.state.stations

    if (filterString.length > 0) {
      stationsFiltered = this.state.stations.filter(station => station.name.toLowerCase().includes(filterString.toLowerCase()))
    }

    this.setState({stations:this.state.stations, stationsFiltered:stationsFiltered})
    
  }

  // React functions
  componentDidMount() {
    this.updateButton = React.createRef()
    this.searchBar = React.createRef()
    this.fetchFromServer()
  }

  render() {

    return (
      <div className="container" >
        <center><h1>Oslo Bysykkel Stasjonsliste</h1></center>
        <p><button className="btn btn-primary" ref={this.updateButton} onClick={this.updateListButtonClicked}>Oppdater liste</button></p>
        <p><input className="form-control mb-2" ref={this.searchBar} placeholder="Søk" onChange={e=>this.handleSearchFilter(e.target.value)} type="search" id="search" name="Søk" /></p>
        
        <table className="table table-bordered table-striped">
          <tbody>
        {
          this.state.stationsFiltered.map
          (
            (station) => 
            (
              <tr key={station.station_id} >
                <td className="card-body">
                  <h5 className="card-title">{station.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Ledige sykler: {station.num_bikes_available}</h6>
                  <h6 className="card-subtitle mb-2 text-muted">Tilgjengelige låser: {station.num_docks_available}</h6>
                </td>
              </tr>
            )
          )
        }
        </tbody>
        </table>
      </div>
    )
  }

}

export default Stations