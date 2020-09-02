import React from 'react'

    const Stations = ({ stations }) => {

      if (stations) return (
        <div>
          <center><h1>Oslo Bysykkel Stasjonsliste:</h1></center>
          {
          
            stations.map((station) => (
              <div key={station.station_id} className="card">
                <div className="card-body">
                  <h5 className="card-title">{station.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Ledige sykler: {station.num_bikes_available}</h6>
                  <h6 className="card-subtitle mb-2 text-muted">Tilgjengelige låser: {station.num_docks_available}</h6>
                </div>
              </div>
            ))
          
          }
          
        </div>
      )
      else return null
    };

    export default Stations