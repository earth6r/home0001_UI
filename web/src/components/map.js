
import React from "react";
import styles from "./mapStyles";
import GoogleMapReact from 'google-map-react';
import {
  MdPlace
} from 'react-icons/md'

const AnyReactComponent = ({ text }) => <MdPlace style={{transform:"scale(5)"}}></MdPlace>;

const MapContainer = (props) => {
    const {lat, long } = props;
    return (
      <div style={{ height: '600px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_MAPS }}
          options={{styles}}
          defaultCenter={{"lat":parseFloat(lat),"lng":parseFloat(long)}}
          defaultZoom={14}
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