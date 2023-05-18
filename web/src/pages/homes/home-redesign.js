import React, { useState } from "react";
import Container from "../../components/container";
import Layout from "../../containers/layout";
import SEO from "../../components/seo";
import dummyData from "../../../../dummyData.json";
import { AccordionModule } from "../../components/global/accordion";
import { StandardText } from "../../components/global/standardText";
import { ReserveHomeForm } from "../../components/redesign/ReserveHomeForm";
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@chakra-ui/core";
import streetImage from "../../components/redesign/images/street.png";
import homeImage from "../../components/redesign/images/home.png";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/core";
import MapContainer from "../../components/map";
// import MapModule from "../../components/mapModule";
const sectionTypeComponentMap = {
  accordion: AccordionModule,
  standardText: StandardText
};
const cityies = [
  { value: "1", name: "Paris" },
  { value: "2", name: "NYC" },
  { value: "3", name: "Tokyo" },
  { value: "4", name: "LA" },
  { value: "5", name: "San Juan" },
  { value: "6", name: "London" },
  { value: "7", name: "Austin" },
  { value: "8", name: "Berlin" },
  { value: "9", name: "Mexico City" }
];

const properties = [
  {
    address: "49 ORCHARD ST.",
    unitType: "Studio, 1–2 Bedrooms",
    price: "400,000+",
    image: streetImage,
    city: "NYC",
    propertyTypesList: ["ABC123", "DEF456", "GHI789"],
    description:
      "Located at 49 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function."
  },
  {
    address: "12 Mott St.",
    unitType: "Studio, 1–2 Bedrooms",
    price: "500,000+",
    image: streetImage,
    city: "NYC",
    propertyTypesList: ["ABC123", "DEF456", "GHI789"],
    description:
      "Located at 49 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function."
  },
  {
    address: "200 CROSBY St.",
    unitType: "Studio, 1–2 Bedrooms",
    price: "600,000+",
    image: streetImage,
    propertyTypesList: ["ABC123", "DEF456", "GHI789"],
    city: "NYC",
    description:
      "Located at 49 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function."
  },
  {
    address: "789 MAPLE ST.",
    unitType: "Studio",
    price: "700,000+",
    image: streetImage,
    city: "LA",
    propertyTypesList: ["ABC123", "GHI789"],
    description:
      "Located at 49 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function."
  },
  {
    address: "2021 ELM ST.",
    unitType: "Studio",
    propertyTypesList: ["ABC123", "DEF456", "GHI789"],
    price: "1,300,000+",
    image: streetImage,
    city: "LA",
    description:
      "Located at 49 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function."
  }
];
const propertiesTypes = [
  {
    address: "2021 ELM ST.",
    propertType: "studio",
    unitType: "Studio",
    price: "$600,000",
    area: "800 SQ. FT",
    amenities: ["Rooftop terrace", "Custom-built furniture"],
    map: "https://earth.net/homes/locations/earth-la2",
    images: [homeImage, streetImage],
    inventory: 10,
    reference: "ABC123",
    available: true,
    description:
      "Located at 49 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function."
  },
  {
    address: "1819 ASH ST.",
    propertType: "studio",
    unitType: "Studio, 1–2 Bedrooms",
    price: "$750,000",
    area: "1,200 SQ. FT",
    amenities: ["Swimming pool", "Gym", "Balcony"],
    map: "https://earth.net/homes/locations/earth-ny1",
    images: [homeImage, streetImage],
    inventory: 5,
    reference: "DEF456",
    available: false,
    description:
      "Located at 44 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function."
  },
  {
    address: "1617 BIRCH ST.",
    propertyType: "2-bedrooms",
    unitType: "1 bedroom",
    price: "$900,000",
    area: "1,500 SQ. FT",
    reference: "SEE456",
    amenities: ["Garden", "Fireplace", "Smart home technology"],
    map: "https://earth.net/homes/locations/earth-sf1",
    images: ["https://example.com/image5.jpg", "https://example.com/image6.jpg"],
    inventory: 2,
    images: [homeImage, streetImage],
    available: true,
    description:
      "Located at 49233 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function."
  }
];
const HomeRedesignPage = () => {
  const sections = dummyData;
  const [selectedCity, setSelectedCity] = useState(null);
  const onSelectCity = city => {
    setSelectedProperty(null);
    setSelectedPropertyType(null);
    setShowReserveHomeForm(false);
    setSelectedCity(city);
  };
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [showReserveHomeForm, setShowReserveHomeForm] = useState(false);
  const filteredProperties = properties.filter(property => property.city == selectedCity?.name);
  const filteredPropertiesTypes = propertiesTypes.filter(property =>
    selectedProperty?.propertyTypesList.includes(property.reference)
  );
  return (
    <Layout showPopupNewsletter={true} rnd={false}>
      <SEO title="Home" />
      <Container className="flex flex-col h-screen">
        <section className="mb-auto">
          <CitiesComponent
            cities={cityies}
            onChange={city => onSelectCity(city)}
            selectedCity={selectedCity}
          />
          <PropertiesComponent
            properties={filteredProperties}
            onChange={property => {
              setSelectedPropertyType(null);
              setSelectedProperty(property);
            }}
            selectedProperty={selectedProperty}
          />
          <SinglePropertyComponent
            propertyTypes={filteredPropertiesTypes}
            selectedProperty={selectedProperty}
            selectedPropertyType={selectedPropertyType}
            onChange={propertType => {
              setSelectedPropertyType(propertType);
            }}
          />
          <PropertyTypeComponent selectedPropertyType={selectedPropertyType} />
        </section>
        {selectedPropertyType && (
          <div className="">
            <button
              onClick={() => setShowReserveHomeForm(prev => !prev)}
              className="mb-10 max-w-[19.375rem] md:max-w-[29.25rem] mt-20 w-full h-12 max-h-12 py-2 px-3 text-left uppercase  border border-[#000] text-[14px] md:text-base"
            >
              JOIN THE WAITLIST FOR THIS HOME{" "}
            </button>
            {showReserveHomeForm && <ReserveHomeForm />}{" "}
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default HomeRedesignPage;

const CitiesComponent = ({ cities, onChange, selectedCity }) => {
  return (
    <ul className="list-none max-w-5xl grid grid-cols-3 place-items-start gap-10 mt-10 p-0">
      {cities.map(city => (
        <li key={city.value} className="p-0 before:content-['']">
          <button
            disabled={properties.filter(property => property.city == city?.name).length === 0}
            key={city.value}
            onClick={() => onChange(city)}
            className={`${
              selectedCity?.value === city.value ? "underline" : ""
            } cursor-pointer p-0 before:content-[''] disabled:bg-transparent  uppercase disabled:opacity-40 disabled:shadow-none text-[14px] md:text-base `}
          >
            {city.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
const PropertiesComponent = ({ properties, onChange, selectedProperty }) => {
  return (
    <ul className="m-0 grid gap-10 md:gap-20 my-10 md:my-20">
      {properties.map(property => {
        return (
          <li className="p-0 before:content-[''] m-0" key={property.value}>
            <button
              className={`${
                selectedProperty?.address === property.address ? "underline" : ""
              } flex flex-col gap-0 cursor-pointer p-0 before:content-[''] disabled:bg-transparent  uppercase disabled:opacity-40 disabled:shadow-none text-[14px] md:text-base `}
              onClick={() => onChange(property)}
            >
              <h3 className="m-0">{property.address}</h3>
              <p className="m-0 ">{property.unitType}</p>
              <p className="m-0">{property.price}</p>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
const SinglePropertyComponent = ({
  propertyTypes,
  onChange,
  selectedProperty,
  selectedPropertyType
}) => {
  console.log(selectedPropertyType, "selectedPropertyType");

  return (
    <>
      {selectedProperty && (
        <div className="flex flex-col  text-[14px] md:text-base">
          <img
            className="max-w-[636px] max-h-[805px] object-cover mb-10 md:mb-20"
            src={selectedProperty.image}
            alt=""
          />
          <p className="max-w-xs md:max-w-4xl">{selectedProperty.description}</p>
        </div>
      )}

      <ul className=" max-w-xs flex flex-col gap-4 my-10 md:my-20 p-0">
        {propertyTypes.map(propertType => {
          return (
            <li className={`p-0 before:content-['']`}>
              <button
                onClick={() => onChange(propertType)}
                className={`p-4 border w-full flex flex-col text-[14px] md:text-base ${
                  selectedPropertyType?.reference === propertType.reference
                    ? "bg-black text-white"
                    : "border-gray-300"
                }`}
              >
                <p className="uppercase mb-0">{propertType.unitType}</p>
                <p className="uppercase mb-0">{propertType.price}</p>
                <p className="uppercase">{propertType.area}</p>
                <ul className="mb-0 p-0">
                  {propertType.amenities.map(amenity => {
                    return (
                      <li className="p-0  text-left before:content-['']">
                        <span>-</span> {amenity}
                      </li>
                    );
                  })}
                </ul>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
const PropertyTypeComponent = ({ selectedPropertyType }) => {
  return (
    <>
      {selectedPropertyType && (
        <div className="flex flex-col text-[14px] md:text-base relative">
          <ImageSlider images={selectedPropertyType.images} />
          <div className=" text-[14px] md:text-base mt-10 md:mt-20">
            <h3 className="m-0 uppercase">{selectedPropertyType.address}</h3>
            <p className="m-0 ">{selectedPropertyType.unitType}</p>
            <p className="m-0">{selectedPropertyType.price}</p>
            <MapModule text="MAP" lat="34.088705" long="-118.254759" />
            {/* <MapContainer text="MAP" lat="34.088705" long="-118.254759" /> */}
          </div>
          <h3 className=" uppercase my-4 md:my-20">{selectedPropertyType.unitType}</h3>
          <p className=" max-w-xs md:max-w-4xl">{selectedPropertyType.description}</p>
        </div>
      )}
    </>
  );
};
const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const previousImage = () => {
    const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const nextImage = () => {
    const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  const hasPreviousImage = currentImageIndex !== 0;
  const hasNextImage = currentImageIndex !== images.length - 1;

  return (
    <div className=" flex flex-col items-center max-w-[636px] max-h-[805px]">
      <img
        className="max-w-[636px] max-h-[805px] object-cover mb-4 w-full"
        src={images[currentImageIndex]}
        alt=""
      />
      <div className=" flex gap-2">
        <button
          className=" disabled:shadow-none disabled:bg-transparent disabled:opacity-40"
          onClick={previousImage}
          disabled={!hasPreviousImage}
        >
          <svg
            className="transform rotate-180"
            width="22"
            height="10"
            viewBox="0 0 22 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5191 5.22869e-07L21.5 5L15.5191 10L14.4911 9.15179L18.7231 5.61384L0.5 5.61384L0.5 4.38616L18.7231 4.38616L14.4911 0.859376L15.5191 5.22869e-07Z"
              fill="black"
            />
          </svg>
        </button>
        <button
          className="disabled:shadow-none disabled:bg-transparent disabled:opacity-40"
          onClick={nextImage}
          disabled={!hasNextImage}
        >
          <svg
            width="22"
            height="10"
            viewBox="0 0 22 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5191 5.22869e-07L21.5 5L15.5191 10L14.4911 9.15179L18.7231 5.61384L0.5 5.61384L0.5 4.38616L18.7231 4.38616L14.4911 0.859376L15.5191 5.22869e-07Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const MapModule = props => {
  const { text, lat, long } = props;
  return (
    <>
      <Popover placement="bottom" trigger="click" usePortal={true} gutter={10}>
        <PopoverTrigger>
          <button aria-label={`Open Map`} className=" border-b border-dashed  uppercase">
            MAP
          </button>
        </PopoverTrigger>
        <PopoverContent
          bg="transparent"
          className="border-none  max-w-1xl md:max-w-2xl md:block no-shadow p-0 ml-6"
          zIndex={65}
        >
          <span className="block">
            <span className="box block px-1em py-1em bg-white text-mobileBody md:text-desktopBody">
              <MapContainer lat={lat} long={long}></MapContainer>
            </span>
          </span>
        </PopoverContent>
      </Popover>
    </>
  );
};
