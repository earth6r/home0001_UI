import React, { createRef, useContext, useEffect, useState } from "react";
import { graphql } from "gatsby";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { CitiesList } from "../components/redesign/CitiesList";
import { PropertiesList } from "../components/redesign/PropertiesList";
import { SingleProperty } from "../components/redesign/SingleProperty";
import { PropertyTypeUI } from "../components/redesign/PropertyType";
import Container from "../components/redesign/Container";
import { HomesContext } from "../components/context/HomesContext";
import { ReserveHomeForm } from "../components/redesign/ReserveHomeForm";
import { BackToTopButton } from "../components/redesign/BackToTopButton";

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
    allSanityPropertyType(sort: { fields: area }) {
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
        seeAllButtonText
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
  const selectedPropertyRef = createRef();
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
  const scrollToProperty = () => {
    setTimeout(() => {
      if (selectedProperty?.id && selectedPropertyRef.current && !selectedPropertyType) {
        const offset = window.innerWidth < 768 ? 16 : 40;
        const top =
          selectedPropertyRef.current.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (selectedProperty?.id) {
      searchParams.set("property", selectedProperty.id);
      scrollToProperty();
    } else {
      // Hide intercom bubble when property is unselected
      document.body.classList.add("hide-intercom");
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

  const scrollToPropertyType = () => {
    setTimeout(() => {
      if (selectedPropertyType?.id && propertyTypeRef.current) {
        const offset = window.innerWidth < 768 ? 16 : 40;
        const top = propertyTypeRef.current.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 500);
  };

  useEffect(() => {
    scrollToPropertyType();

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
      setShowReserveHomeForm(false);
      setSelectedCity(city);
      setSelectedProperty(null);
      setSelectedPropertyType(null);
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, []);

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
          <div className="md:pr-desktop-menu">
            <div className="uppercase pr-[40%] pr-mobile-menu md:pr-0 mb-12 md:mb-16 text-mobile-body md:text-desktop-body property-type-description">
              Own one home. Live flexibly between many places.
            </div>
            <div className="uppercase pr-[50%] pr-mobile-menu md:pr-0 mb-12 md:mb-16 text-mobile-body md:text-desktop-body property-type-description">
              Fully equipped homes available to buy in:
            </div>
          </div>
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
                      setShowReserveHomeForm(false);
                      setSelectedProperty(property);
                      setSelectedPropertyType(null);
                    }}
                    selectedProperty={selectedProperty}
                  />
                ) : null}
                {selectedProperty?.id && (
                  <div ref={selectedPropertyRef}>
                    <SingleProperty
                      propertyTypes={filteredPropertiesTypes}
                      selectedProperty={selectedProperty}
                      selectedPropertyType={selectedPropertyType}
                      disableScroll={filteredProperties.length === 1}
                      onChange={propertType => {
                        if (propertType?.id === selectedPropertyType?.id) {
                          scrollToPropertyType();
                        }
                        setShowReserveHomeForm(false);
                        setSelectedPropertyType(propertType);
                      }}
                    />
                  </div>
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
                      className={`mb-9 text-center outline-none mt-9 tracking-caps uppercase block w-full h-12 max-h-12 py-2 px-3 text-left uppercase border border-[#000] text-mobile-body md:text-desktop-body ${
                        showReserveHomeForm
                          ? "bg-white text-black mb-10"
                          : "bg-black text-white mb-1"
                      }`}
                    >
                      RESERVE THIS HOME
                    </button>
                    {!showReserveHomeForm ? (
                      <>
                        <p>
                          Not the home for you?{" "}
                          <a
                            href="/newsletter"
                            className="border-b-[1.5px] border-solid mt-9 text-mobile-body md:text-desktop-body mt-8"
                          >
                            Sign up here
                          </a>{" "}
                          for updates on new buildings in new locations.
                        </p>
                        <BackToTopButton />
                      </>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          ) : null}
          {showReserveHomeForm ? (
            <div ref={reserveHomeRef}>
              <ReserveHomeForm
                data={{
                  siteData: data.site,
                  property: selectedPropertyType ? selectedPropertyType : null
                }}
              />
            </div>
          ) : null}
        </section>
      </Container>
    </Layout>
  );
};

export default HomeRedesignPage;
