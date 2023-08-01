import React, { createRef, useContext, useEffect, useState } from "react";
import { graphql } from "gatsby";
import SEO from "../../components/seo";
import Layout from "../../containers/layout";
import { CitiesList } from "../../components/redesign/CitiesList";
import { PropertiesList } from "../../components/redesign/PropertiesList";
import { SingleProperty } from "../../components/redesign/SingleProperty";
import { PropertyTypeUI } from "../../components/redesign/PropertyType";
import Container from "../../components/redesign/Container";
import { HomesContext } from "../../components/context/HomesContext";
import { ReserveHomeForm } from "../../components/redesign/ReserveHomeForm";
import { set } from "react-ga";

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
        _rawDescription(resolveReferences: { maxDepth: 10 })
        image {
          asset {
            _id
          }
        }
        map {
          lat
          long
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
        images {
          asset {
            _id
          }
        }
        moreImages {
          image {
            asset {
              _id
            }
          }
          alt
          caption
          file {
            asset {
              url
            }
          }
        }
        _rawInventory(resolveReferences: { maxDepth: 10 })
        _rawDescription(resolveReferences: { maxDepth: 10 })
        _rawDescriptionTwo(resolveReferences: { maxDepth: 10 })

        property {
          title
          unitTypes
          price
          id
        }
        available
      }
    }
    sanityHowItWorksPage {
      title
      _rawSections
      _rawText(resolveReferences: { maxDepth: 10 })
    }
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      _rawWhatsIncluded(resolveReferences: { maxDepth: 10 })
      exchangeRateUSDBTC
      exchangeRateUSDETH
      reserveHomeForm {
        title
        _rawSubtitle(resolveReferences: { maxDepth: 10 })
        priceCaption
        _rawCheckboxText(resolveReferences: { maxDepth: 10 })
      }
      viewInventory
    }
  }
`;

const HomeRedesignPage = ({ location, data }) => {
  const cities = data.allSanityHomePage.nodes[0].citiesList;
  const properties = data.allSanityProperty.nodes;
  const propertiesTypes = data.allSanityPropertyType.nodes;
  const howItWorks = data.sanityHowItWorksPage;

  const propertyTypeRef = createRef();
  const {
    selectedCity,
    setCity: setSelectedCity,
    selectedProperty,
    setProperty: setSelectedProperty,
    selectedPropertyType,
    setPropertyType: setSelectedPropertyType,
    showReserveHomeForm,
    setReserveHomeForm: setShowReserveHomeForm
  } = useContext(HomesContext);

  const filteredProperties = selectedCity
    ? properties.filter(property => property?.city?.id === selectedCity?.id)
    : [];
  const filteredPropertiesTypes = selectedProperty
    ? propertiesTypes.filter(propertyType => selectedProperty?.id === propertyType?.property?.id)
    : [];

  const reserveHomeRef = createRef();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const property = searchParams.get("property");
    const propertyType = searchParams.get("propertyType");
    const form = searchParams.get("form");
    if (property) {
      const propertyFound = properties.find(prop => prop.id === property);
      if (propertyFound) {
        setSelectedCity(propertyFound.city);
        setSelectedProperty(propertyFound);

        if (propertyType) {
          const propertyTypeFound = propertiesTypes.find(prop => prop.id === propertyType);
          console.log(propertyType, propertyTypeFound);
          if (propertyTypeFound) {
            setSelectedPropertyType(propertyTypeFound);
          }
        }

        if (form === "open") {
          setShowReserveHomeForm(true);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (selectedCity) {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      if (filteredProperties.length === 1) {
        setSelectedProperty(filteredProperties[0]);
      }
    } else {
      if (window.innerWidth < 768) {
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
      }
    }
  }, [selectedCity]);

  useEffect(() => {
    document.body.classList.add("hide-intercom");

    return () => {
      document.body.classList.remove("hide-intercom");
    };
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (selectedProperty?.id) {
      // Show intercom bubble when property is chosen
      document.body.classList.remove("hide-intercom");
      searchParams.set("property", selectedProperty.id);
    } else {
      searchParams.delete("property");
    }

    const paramsString = searchParams.toString();

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}${paramsString.length ? `?${paramsString}` : ""}`
    );
  }, [selectedProperty]);

  useEffect(() => {
    setTimeout(() => {
      if (showReserveHomeForm && reserveHomeRef.current) {
        const offset = window.innerWidth < 768 ? 16 : 40;
        const top = reserveHomeRef.current.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 500);

    const searchParams = new URLSearchParams(window.location.search);
    if (showReserveHomeForm) {
      searchParams.set("form", "open");
    } else {
      searchParams.delete("form");
    }

    const paramsString = searchParams.toString();

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}${paramsString.length ? `?${paramsString}` : ""}`
    );
  }, [showReserveHomeForm]);

  useEffect(() => {
    setTimeout(() => {
      if (!showReserveHomeForm && selectedPropertyType?.id && propertyTypeRef.current) {
        const offset = window.innerWidth < 768 ? 16 : 40;
        const top = propertyTypeRef.current.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 500);

    const searchParams = new URLSearchParams(window.location.search);
    if (selectedPropertyType?.id) {
      searchParams.set("propertyType", selectedPropertyType.id);
    } else {
      searchParams.delete("propertyType");
    }

    const paramsString = searchParams.toString();

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}${paramsString.length ? `?${paramsString}` : ""}`
    );
  }, [selectedPropertyType]);

  const onSelectCity = city => {
    if (city.id !== selectedCity?.id) {
      setSelectedCity(city);
      setSelectedProperty(null);
      setSelectedPropertyType(null);
    }
  };

  return (
    <Layout
      pathname={location.pathname.replace(/\/$/, "")}
      showPopupNewsletter={true}
      rnd={false}
      homes
    >
      <SEO title="Homes" />
      <Container>
        <section>
          <CitiesList
            cities={cities}
            onChange={city => onSelectCity(city)}
            selectedCity={selectedCity}
            properties={properties}
          />
          {selectedCity?.id ? (
            <div className="md:grid md:grid-cols-3 md:pr-desktop-menu">
              <div className="md:col-start-2 md:col-span-1">
                {filteredProperties.length > 1 || !selectedProperty?.id ? (
                  <PropertiesList
                    properties={filteredProperties}
                    onChange={property => {
                      setSelectedProperty(property);
                      setSelectedPropertyType(null);
                    }}
                    selectedProperty={selectedProperty}
                  />
                ) : null}
                {selectedProperty?.id && (
                  <SingleProperty
                    propertyTypes={filteredPropertiesTypes}
                    selectedProperty={selectedProperty}
                    selectedPropertyType={selectedPropertyType}
                    disableScroll={filteredProperties.length === 1}
                    onChange={propertType => {
                      setSelectedPropertyType(propertType);
                    }}
                  />
                )}
                {selectedProperty?.id && selectedPropertyType && (
                  <div ref={propertyTypeRef}>
                    <PropertyTypeUI
                      property={selectedProperty}
                      selectedPropertyType={selectedPropertyType}
                      showReserveHomeForm={showReserveHomeForm}
                      howItWorks={howItWorks}
                      viewInventoryText={data.site?.viewInventory ?? "View Inventory"}
                    />
                  </div>
                )}
                {selectedPropertyType && (
                  <div className="pr-mobile-menu md:pr-0">
                    <button
                      onClick={() => setShowReserveHomeForm(prev => !prev)}
                      className={`outline-none mt-10 mb-20 tracking-caps uppercase block w-full h-12 max-h-12 py-2 px-3 text-left uppercase border border-[#000] text-mobile-body md:text-desktop-body ${
                        showReserveHomeForm ? "bg-white text-black" : "bg-black text-white"
                      }`}
                    >
                      Join the waitlist for this home
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : null}
          {showReserveHomeForm ? (
            <div ref={reserveHomeRef}>
              <ReserveHomeForm data={data.site} />
            </div>
          ) : null}
        </section>
      </Container>
    </Layout>
  );
};

export default HomeRedesignPage;
