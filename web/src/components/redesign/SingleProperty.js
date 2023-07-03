import React, { createRef, useEffect } from "react";

export const SingleProperty = ({
  onChange,
  propertyTypes,
  selectedProperty,
  selectedPropertyType
}) => {
  const selectedPropertyRef = createRef();

  useEffect(() => {
    setTimeout(() => {
      if (selectedProperty?.id && selectedPropertyRef.current && !selectedPropertyType) {
        const offset = window.innerWidth < 768 ? 16 : 40;
        const top =
          selectedPropertyRef.current.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 500);
  }, [selectedProperty, selectedPropertyRef, selectedPropertyType]);

  return (
    <>
      {selectedProperty && (
        <div
          ref={selectedPropertyRef}
          className="animate-in flex flex-col text-[0.875rem] md:text-base"
        >
          <img
            className="max-h-[487px] md:max-h-[741px] h-auto w-auto mb-10 md:mb-20"
            src={selectedProperty?.image?.asset?.url}
            height="487"
            alt=""
          />
          <p className="pr-mobile-menu md:pr-0">{selectedProperty.description}</p>
        </div>
      )}
      {propertyTypes && (
        <ul className="animate-in flex flex-col gap-4 my-10 md:my-20 p-0 pr-mobile-menu md:pr-0">
          {propertyTypes.map(propertType => {
            const { amenities, propertyType, price, area, id } = propertType;
            return (
              <li key={id} className={`p-0 before:content-['']`}>
                <button
                  onClick={() => onChange(propertType)}
                  className={`p-4 border w-full flex flex-col gap-7 text-[0.875rem] md:text-base ${
                    selectedPropertyType?.id === propertType.id ? "bg-black text-white" : ""
                  }`}
                >
                  <div className="p-0 m-0 text-left">
                    {propertyType && (
                      <p className="uppercase mb-0">
                        {propertyType
                          .replace("one-bedroom", "1 bedroom")
                          .replace("two-bedroom", "2 bedrooms")
                          .replace("studio-max", "studio max")}
                      </p>
                    )}
                    {price && <p className="uppercase mb-0">{price}</p>}
                    {area && <p className="uppercase">{area}</p>}
                  </div>
                  {amenities && (
                    <ul className="mb-0 p-0">
                      {amenities.map((amenity, index) => {
                        return (
                          <li key={index++} className="p-0 text-left before:content-['']">
                            <span>&ndash;&nbsp;</span>
                            <span>{amenity}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
