
import React from "react";
import styles from "./mapStyles";
import GoogleMapReact from 'google-map-react';
import {
  MdPlace
} from 'react-icons/md'

const AnyReactComponent = ({ text }) => <div class="location-circle"></div>;

const MapContainer = (props) => {

    const {lat, long } = props;
    let center = {"lat":parseFloat(lat),"lng":parseFloat(long)};
    let zoomLevel = 14;
    let myclass = ""
    if(lat <= 22 && lat >=20){
      if(long <= -87 && long >= -89){
        zoomLevel = 13;
        myclass = "mexico"
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