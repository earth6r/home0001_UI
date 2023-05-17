import React, { useState } from "react";
import Container from "../../components/container";
import Layout from "../../containers/layout";
import SEO from "../../components/seo";
import { RenderModules } from "../../utils/renderModules";
import dummyData from "../../../../dummyData.json";
import { AccordionModule } from "../../components/global/accordion";
import { StandardText } from "../../components/global/standardText";
import { ReserveHomeForm } from "../../components/redesign/ReserveHomeForm";
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@chakra-ui/core";

const sectionTypeComponentMap = {
  accordion: AccordionModule,
  standardText: StandardText
};
const cityies = [
  { value: "1", name: "New York" },
  { value: "2", name: "Los Angeles" },
  { value: "3", name: "Chicago" },
  { value: "4", name: "Houston" },
  { value: "5", name: "Philadelphia" }
];
// const properties = [
//   { value: "1", label: "Property 1", city: "New York" },
//   { value: "2", label: "Property 2", city: "New York" },
//   { value: "3", label: "Property 3", city: "New York" },
//   { value: "4", label: "Property 4", city: "Los Angeles" },
//   { value: "5", label: "Property 5", city: "Los Angeles" },
//   { value: "6", label: "Property 6", city: "Los Angeles" },
//   { value: "7", label: "Property 7", city: "Chicago" },
//   { value: "8", label: "Property 8", city: "Chicago" },
//   { value: "9", label: "Property 9", city: "Chicago" },
//   { value: "11", label: "Property 11", city: "Houston" },
//   { value: "12", label: "Property 12", city: "Houston" }
// ];
const properties = [
  {
    address: "49 ORCHARD ST.",
    unitType: "Studio",
    price: "400,000+",
    image: "https://picsum.photos/2000/3000",
    city: "New York",
    description:
      "Located at 49 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function.",
    propertyType: "studio"
  },
  {
    address: "123 MAIN ST.",
    unitType: "1-2 Bedrooms",
    price: "500,000+",
    image: "https://picsum.photos/2000/3000",
    city: "New York",
    description:
      "Located at 49 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function.",
    propertyType: "studio-max"
  },
  {
    address: "456 ELM ST.",
    unitType: "1-2 Bedrooms",
    price: "600,000+",
    image: "https://picsum.photos/2000/3000",
    city: "Los Angeles",
    description:
      "Located at 49 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function.",
    propertyType: "1-bedroom"
  },
  {
    address: "789 MAPLE ST.",
    unitType: "Studio",
    price: "700,000+",
    image: "https://picsum.photos/2000/3000",
    city: "Los Angeles",
    description:
      "Located at 49 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function.",
    propertType: "2-bedrooms"
  },
  {
    address: "1011 OAK ST.",
    unitType: "1-2 Bedrooms",
    price: "800,000+",
    image: "https://picsum.photos/2000/3000",
    description:
      "Located at 49 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function.",
    propertyType: "2-bedrooms"
  },
  {
    address: "1213 PINE ST.",
    unitType: "Studio",
    price: "900,000+",
    image: "https://picsum.photos/2000/3000",
    description:
      "Located at 49 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function.",
    propertyType: "studio"
  },
  {
    address: "1415 CEDAR ST.",
    unitType: "1-2 Bedrooms",
    price: "1,000,000+",
    image: "https://picsum.photos/2000/3000",
    description:
      "Located at 49 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function."
  },
  {
    address: "1617 BIRCH ST.",
    unitType: "Studio",
    price: "1,100,000+",
    image: "https://picsum.photos/2000/3000",
    description:
      "Located at 49 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function."
  },
  {
    address: "1819 ASH ST.",
    unitType: "1-2 Bedrooms",
    price: "1,200,000+",
    image: "https://picsum.photos/2000/3000",
    city: "Houston",
    description:
      "Located at 49 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function.",
    propertType: "studio"
  },
  {
    address: "2021 ELM ST.",
    unitType: "Studio",
    property: "studio",
    propertyType: "studio",
    price: "1,300,000+",
    image: "https://picsum.photos/2000/3000",
    city: "Houston",
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
    images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    inventory: 10,
    reference: "ABC123",
    available: true,
    description:
      "Located at 49 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function."
  },
  {
    address: "1819 ASH ST.",

    propertType: "studio",
    unitType: "STUDIO max",
    price: "$750,000",
    area: "1,200 SQ. FT",
    amenities: ["Swimming pool", "Gym", "Balcony"],
    map: "https://earth.net/homes/locations/earth-ny1",
    images: ["https://example.com/image3.jpg", "https://example.com/image4.jpg"],
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
    amenities: ["Garden", "Fireplace", "Smart home technology"],
    map: "https://earth.net/homes/locations/earth-sf1",
    images: ["https://example.com/image5.jpg", "https://example.com/image6.jpg"],
    inventory: 2,
    reference: "GHI789",
    available: true,
    description:
      "Located at 49233 Orchard St, this studio apartment offers a unique opportunity to join the Earth housing collective. This community embraces the concept of flexible living, allowing residents to effortlessly move between various locations within the network. The apartment itself features a clever layout, complete with a kitchenette, inviting living area, contemporary bathroom, and a space-saving sleeping loft, expertly balancing form and function."
  }
];
const HomeRedesignPage = () => {
  const sections = dummyData;
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [showReserveHomeForm, setShowReserveHomeForm] = useState(false);
  const filteredProperties = properties.filter(property => property.city == selectedCity?.name);
  const filteredPropertiesTypes = propertiesTypes.filter(
    property => property.propertyType == selectedProperty?.propertyType
  );
  const listItemClass = "p-0 before:content-[''] m-0";
  return (
    <Layout showPopupNewsletter={true} rnd={false}>
      <SEO title="Home" />
      <Container className="flex flex-col h-screen">
        <section className="mb-auto">
          <ul className="list-none max-w-5xl grid grid-cols-3 place-items-start gap-10 mt-10 p-0">
            {cityies.map(city => (
              <li key={city.value} className="p-0 before:content-['']">
                <button
                  disabled={
                    properties.filter(property => property.city === city?.name).length === 0
                  }
                  key={city.value}
                  onClick={() => {
                    setSelectedProperty(null);
                    setSelectedCity(city);
                  }}
                  className={`${
                    selectedCity?.value === city.value ? "underline" : ""
                  } cursor-pointer p-0 before:content-[''] disabled:bg-transparent  uppercase disabled:opacity-40 disabled:shadow-none text-[14px] md:text-base `}
                >
                  {city.name}
                </button>
              </li>
            ))}
          </ul>
          {selectedCity && (
            <ul className="m-0 grid gap-20 my-20">
              {selectedCity &&
                filteredProperties.map(property => {
                  return (
                    <li className={listItemClass} key={property.value}>
                      <button
                        className={`${
                          selectedProperty?.address === property.address ? "underline" : ""
                        } flex flex-col gap-0 cursor-pointer p-0 before:content-[''] disabled:bg-transparent  uppercase disabled:opacity-40 disabled:shadow-none text-[14px] md:text-base `}
                        onClick={() => setSelectedProperty(property)}
                      >
                        <h3 className="m-0">{property.address}</h3>
                        <p className="m-0 ">{property.unitType}</p>
                        <p className="m-0">{property.price}</p>
                      </button>
                    </li>
                  );
                })}
            </ul>
          )}
          {selectedProperty && (
            <div className="flex flex-col gap-4 text-[14px] md:text-base">
              <img
                className="max-w-[636px] max-h-[805px] object-cover mb-20"
                src={selectedProperty.image}
                alt=""
              />
              <h3>{selectedProperty.address}</h3>
              <p>{selectedProperty.description}</p>
            </div>
          )}

          {selectedProperty && (
            <ul className=" max-w-xs flex flex-col gap-4 mt-10      ">
              {filteredPropertiesTypes.map(propertType => {
                return (
                  <li className={`${listItemClass}`}>
                    <button
                      onClick={() => setSelectedPropertyType(propertType)}
                      className={`p-4 border w-full flex flex-col text-[14px] md:text-base ${
                        selectedPropertyType?.unitType === propertType.unitType
                          ? "bg-black text-white"
                          : "border-gray-300"
                      }`}
                    >
                      <p className="uppercase mb-0">{propertType.unitType}</p>
                      <p className="uppercase mb-0">{propertType.price}</p>
                      <p className="uppercase">{propertType.area}</p>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {selectedPropertyType && (
            <div className="flex flex-col gap-4 text-[14px] md:text-base">
              <ImageSlider
                images={[
                  "https://picsum.photos/2000/3000",
                  "https://picsum.photos/400/3000",
                  "https://picsum.photos/2500/3000"
                ]}
              />
              <div className=" text-[14px] md:text-base mt-20">
                <h3 className="m-0 uppercase">{selectedPropertyType.address}</h3>
                <p className="m-0 ">{selectedPropertyType.unitType}</p>
                <p className="m-0">{selectedPropertyType.price}</p>
              </div>
              <h3 className=" uppercase my-20">{selectedPropertyType.unitType}</h3>
              <p>{selectedPropertyType.description}</p>
            </div>
          )}
        </section>
        {selectedPropertyType && (
          <div>
            <button
              onClick={() => setShowReserveHomeForm(prev => !prev)}
              className=" max-w-[19.375rem] md:max-w-[29.25rem] mt-20 w-full h-12 max-h-12 py-2 px-3 text-left uppercase  border border-[#000] text-[14px] md:text-base"
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
