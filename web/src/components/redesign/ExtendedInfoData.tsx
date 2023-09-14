import React from "react";
const commonPriceChart = { "1 bedroom": "$1,560.28", studio: "$744.01", "studio max": "$761.64" };
const propertyTaxChart = { "1 bedroom": "$1,183.53", studio: "$564.35", "studio max": "$577.72" };

export const LAData = () => {
  return (
    <div className="pb-10" id="buyers-guide">
      <div className="mt-10 mb-4 uppercase px-4 md:px-0">Taxes and Fees</div>
      <div className="px-4 buyers_guide">
        <ul>
          <li>Property Tax (monthly):</li>
        </ul>
        <ul>
          <li>$1,614.58</li>
        </ul>
      </div>
      <div className="mt-10 mb-4 uppercase px-4 md:px-0">Unit specifications</div>
      <div className="px-4 buyers_guide">
        <ul>
          <li>Bedrooms:</li>
          <li>Bath:</li>
          <li>Sq Ft:</li>
          <li>Built:</li>
          <li>Heating:</li>
          <li>Cooling:</li>
          <li>Pets:</li>
          <li>Solar:</li>
          <li>Parking:</li>
          <li>Amenities:</li>
          <li>Appliances:</li>
        </ul>
        <ul>
          <li>3</li>
          <li>3.5</li>
          <li>1,983</li>
          <li>2023</li>
          <li>Central</li>
          <li>Central</li>
          <li>Allowed</li>
          <li>Rooftop solar</li>
          <li>Two-car garage</li>
          <li>Full private roof deck</li>
          <li>Stainless steel Bosch</li>
        </ul>
      </div>
      <div className="mt-10 mb-4 uppercase tracking-caps px-4 md:px-0">Districts and Zoning</div>
      <p className="px-4 md:px-0">
        Community District: 103 <br />
        Neighborhood Council: 44 - Echo Park
        <br />
        Community Planning Area: Silverlake - Echo Park <br />
        Police Precinct: Northeast <br />
        Zone: RD1.5-1VL
        <br />
        Parcel: 5406011019
      </p>
      <div className="mt-10 mb-4 uppercase tracking-caps px-4 md:px-0">School District</div>
      <p className="px-4 md:px-0">
        School District: Los Angeles Unified School District <br />
        Elementary: Logan Academy <br />
        High School: Belmont Senior High
      </p>
      <div className="mt-10 mb-4 uppercase tracking-caps px-4 md:px-0">Parks</div>
      <p className="px-4 md:px-0">
        Elysian Park (0.1 miles) <br />
        Echo Park (0.6 miles) <br />
        Dodger Stadium (0.4 miles)
      </p>
      <div className="mt-10 mb-4 uppercase tracking-caps px-4 md:px-0"> Neighborhood History</div>
      <p className="px-4 md:px-0">
        Echo Park is a neighborhood in the east-central region of Los Angeles, California. Located
        to the northwest of Downtown, it is bordered by Silver Lake to the west and Chinatown to the
        east. The culturally diverse neighborhood has become known for its trendy local businesses,
        as well as its popularity with artists, musicians and creatives. The neighborhood is
        centered on the eponymous Echo Park Lake.
      </p>
      <br />
      <p className="px-4 md:px-0">
        Established in 1892, and long before Hollywood became synonymous with the commercial film
        industry of the United States, the area of Echo Park known as Edendale was the center of
        filmmaking on the West Coast.
      </p>
      <div className="mt-10 uppercase tracking-caps px-4 md:px-0"> Places of Interest:</div>
      <p className="px-4 md:px-0">
        <a href="https://www.timeout.com/los-angeles/echo-park" target="_blank">
          https://www.timeout.com/los-angeles/echo-park
        </a>
        <a
          href="https://la.eater.com/maps/echo-park-best-essential-restaurants-los-angeles"
          target="_blank"
        >
          https://la.eater.com/maps/echo-park-best-essential-restaurants-los-angeles
        </a>
      </p>
    </div>
  );
};
export const AllenData = ({ type, sqft }) => {
  return (
    <div className="pb-10">
      <div className=" mt-10 uppercase tracking-caps px-4 md:px-0">
        Taxes and Fees
        <table>
          <tr>
            <td className="pr-10">Common Charges:</td>
            <td>{commonPriceChart[type]}</td>
          </tr>
          <tr>
            <td className="pr-10">Property Tax:</td>
            <td>{propertyTaxChart[type]}</td>
          </tr>
        </table>
      </div>
      <div className="mt-10 uppercase tracking-caps px-4 md:px-0">Unit specifications</div>
      <p className="px-4 md:px-0">
        Bedrooms: {type == "1 bedroom" ? type : "Studio"}
        <br />
        Baths: 1<br />
        Sq Ft: {sqft}
        <br />
        Heating: Central
        <br />
        Cooling: Central
        <br />
        Stove: Summit electric <br />
        Oven: Stainless steel Bosch
        <br />
        Refrigerator: Blomberg
        <br />
        Cabinets: Alta Cucina kitchen <br />
        Fixtures: Porcelanosa <br />
        {type == "1 bedroom"
          ? "Laundry: En-suite Bosch washer/dryer"
          : "Outdoor space: En-suite full-door entry onto fire escape balcony overlooking Allen Street"}
      </p>
      <div className="mt-10 uppercase tracking-caps px-4 md:px-0">Building specifications</div>
      <p className="px-4 md:px-0">
        Type: Condominium <br />
        Built: 1900
        <br />
        Renovated: 2021-’23 <br />
        Elevator building: Yes
        <br />
        Floors: 7 story <br />
        Heating: Central
        <br />
        Cooling: Central
        <br />
        ADA: Wheelchair Access
        <br />
        Pets: Allowed <br />
        Storage: Bike storage and package room <br />
        Amenities: Roofdeck, laundry
        <br />
        Parking: Monthly parking lot across street
      </p>

      <div className="mt-10 uppercase tracking-caps px-4 md:px-0">Districts and zone</div>
      <p className="px-4 md:px-0">
        Community District: 103 <br />
        City Council District: 1 <br />
        Police Precinct: 7 <br />
        Zone: C6 <br />
        Tax Lot: 1003080023
        <br />
        Block: 308 / Lot 23
      </p>
      <div className="mt-10 uppercase tracking-caps px-4 md:px-0">Education</div>
      <p className="px-4 md:px-0">
        School District: 2<br />
        Elementary: P.S. 042 Benjamin Altman
        <br />
        Middle school: M.S. 131 (06,07,08,SE)
      </p>
      <div className="mt-10 uppercase tracking-caps px-4 md:px-0">Colleges</div>
      <p className="px-4 md:px-0">
        Cooper Union: 0.8 miles
        <br />
        Pace University: 0.8 miles
        <br />
        NYU: 1.1 miles
        <br />
        SVA: 1.8 miles
        <br />
        New School: 1.9 miles
        <br />
        Columbia: 6.7 miles
      </p>
      <div className="mt-10 uppercase tracking-caps px-4 md:px-0">Parks</div>
      <p className="px-4 md:px-0">
        Sara D. Roosevelt Park: 0.13 miles <br />
        Seward Park: 0.16 miles <br />
        Straus ParK: 0.17 miles{" "}
      </p>
      <div className="mt-10 uppercase tracking-caps px-4 md:px-0">Museums</div>
      <p className="px-4 md:px-0">
        Tenement Museum: 0.17 miles
        <br />
        New Museum of Contemporary Art: 0.41 miles
        <br />
        Museum Of Chinese In America: 0.46 miles
      </p>
    </div>
  );
};
