
import React from "react";
import styles from "./mapStyles";
import GoogleMapReact from 'google-map-react';
import {
  MdPlace
} from 'react-icons/md'

const AnyReactComponent = ({ text }) => <MdPlace style={{transform:"scale(5)"}}></MdPlace>;

const MapContainer = (props) => {

    const {lat, long } = props;
    let center = {"lat":parseFloat(lat),"lng":parseFloat(long)};
    let zoomLevel = 14;
    let myclass = ""
    if(lat <= 22 && lat >=20){
      if(long <= -87 && long >= -89){
        zoomLevel = 13;
        myclass = "mexico"
        let center = {"lat":(parseFloat(lat) - 50),"lng":parseFloat(long)};
      }
    }
    return (
      <div className={`map-module-wrapper ${myclass}`} style={{ height: '600px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_MAPS }}
          options={{styles}}
          defaultCenter={center}
          defaultZoom={zoomLevel}
        >
            <AnyReactComponent
            lat={parseFloat(lat)}
            lng={parseFloat(long)}
          />
          
        </GoogleMapReact>
      </div>
    );
  
}
export default MapContainer

// export default GoogleApiWrapper({
//   apiKey: (process.env("GATSBY_GOOGLE_MAPS"))
// })(MapContainer)