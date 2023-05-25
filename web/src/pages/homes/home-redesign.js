import React, { useState } from "react";
import { graphql } from "gatsby";
import SEO from "../../components/seo";
import Layout from "../../containers/layout";
import { CitiesList } from "../../components/redesign/CitiesList";
import { PropertiesList } from "../../components/redesign/PropertiesList";
import { SingleProperty } from "../../components/redesign/SingleProperty";
import { PropertyTypeUI } from "../../components/redesign/PropertyType";
import Container from "../../components/redesign/Container";

export const query = graphql`
  {
    allSanityHomePage {
      nodes {
        citiesList {
          title
          disabled
          id
        }
      }
    }
    allSanityProperty {
      nodes {
        id
        title
        unitTypes
        price
        description
        image {
          asset {
            url
          }
        }
        city {
          title
          id
        }
      }
    }
    allSanityPropertyType {
      nodes {
        id
        propertyType
        price
        area
        amenities
        map {
          lat
          long
        }
        images {
          asset {
            url
          }
        }
        _rawInventory(resolveReferences: { maxDepth: 10 })
        _rawDescription(resolveReferences: { maxDepth: 10 })

        property {
          title
          unitTypes
          price
          id
        }
        available
      }
    }
  }
`;

const HomeRedesignPage = ({ data }) => {
  const cities = data.allSanityHomePage.nodes[0].citiesList;
  const properties = data.allSanityProperty.nodes;
  const propertiesTypes = data.allSanityPropertyType.nodes;

  const [selectedCity, setSelectedCity] = useState({
    title: "",
    id: null
  });
  const [selectedProperty, setSelectedProperty] = useState({
    id: null
  });
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);

  const filteredProperties = selectedCity
    ? properties.filter(property => property?.city?.id === selectedCity?.id)
    : [];
  const filteredPropertiesTypes = selectedProperty
    ? propertiesTypes.filter(propertyType => selectedProperty?.id === propertyType?.property?.id)
    : [];

  const onSelectCity = city => {
    setSelectedCity(city);
    setSelectedProperty(null);
    setSelectedPropertyType(null);
  };
  // console.log(filteredPropertiesTypes, "hel");
  return (
    <Layout showPopupNewsletter={true} rnd={false}>
      <SEO title="Home" />
      <Container className="flex flex-col h-screen">
        <section className="mb-auto mt-10">
          <CitiesList
            cities={cities}
            onChange={city => onSelectCity(city)}
            selectedCity={selectedCity}
            properties={properties}
          />
          <PropertiesList
            properties={filteredProperties}
            onChange={property => {
              setSelectedProperty(property);
              setSelectedPropertyType(null);
            }}
            selectedProperty={selectedProperty}
          />
          {selectedProperty && (
            <SingleProperty
              propertyTypes={filteredPropertiesTypes}
              selectedProperty={selectedProperty}
              selectedPropertyType={selectedPropertyType}
              onChange={propertType => {
                setSelectedPropertyType(propertType);
              }}
            />
          )}
          {selectedProperty && selectedPropertyType && (
            <PropertyTypeUI
              property={selectedProperty}
              selectedPropertyType={selectedPropertyType}
            />
          )}{" "}
        </section>
      </Container>
    </Layout>
  );
};

export default HomeRedesignPage;
