import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { submit_hubspot_waitlist_form } from "../../utils/axios";

export const ReserveHomeForm = ({ data }) => {
  //todo add a unit prop to this component
  const returnUnitNumber = unit => {
    if (unit === "studio") {
      return "Unit 3B";
    } else if (unit === "studio-max") {
      return "Unit 4A";
    } else if (unit === "one-bedroom") {
      return "Unit 6B";
    } else if (unit === "two-bedrooms") {
      return "Townhouse #6";
    } else if (unit === "penthouse") {
      return "Townhouse #7";
    }
  };
  let unitOfInterest = "all";

  useEffect(() => {
    if (data.property && data.property.propertyType)
      unitOfInterest = returnUnitNumber(data.property.propertyType);
  }, [data]);

  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true
  });

  const onSubmit = async data => {
    if (data.fax_data !== "no-data") return;
    const hubspotData = {
      full_name: data.full_name,
      email: data.email,
      unit_of_interest: unitOfInterest
    };
    await submit_hubspot_waitlist_form(
      hubspotData.full_name,
      hubspotData.email,
      hubspotData.unit_of_interest
    );
    setSubmitted(true);
  };

  return (
    <div className="animate-in relative">
      <div className="w-screen h-full -ml-4 md:-ml-10 absolute bg-whitesmoke"></div>
      <div className="md:grid md:grid-cols-3 pr-mobile-menu md:pr-desktop-menu">
        <div className="md:col-start-2 md:col-span-1 pt-10 pb-10">
          {!submitted ? (
            <div className="relative mb-4 text-mobile-body md:text-desktop-body font-serif">
              <p className="uppercase mb-9">
                {data.property
                  ? `Join waitlist for ${returnUnitNumber(data.property.propertyType)}`
                  : "Join waitlist"}
              </p>

              <p>
                {`${
                  data.property && data.property.propertyType
                    ? returnUnitNumber(data.property.propertyType)
                    : "New homes"
                } will be released for sale ${
                  data.property ? "soon" : null
                } to buyers on the waitlist. Homebuyers will be offered this home in the order they joined.`}
              </p>

              <p>
                {`${
                  (data.property && data.property.propertyType == "two-bedrooms") ||
                  (data.property && data.property.propertyType == "penthouse")
                    ? "Once you receive an offer, you can secure it with a small deposit and schedule a tour before going ahead with the purchase."
                    : "Once you receive an offer, you can secure it with a small deposit and will have the chance to spend a few nights in the property to see how it feels before going ahead with the purchase."
                } The EARTH team will be available to answer questions, help secure financing, etc.`}
              </p>
              <p>
                {data.property && returnUnitNumber(data.property.propertyType)
                  ? `Join the waitlist for ${returnUnitNumber(data.property.propertyType)} here:`
                  : "Join the waitlist for an EARTH home here:"}
              </p>
            </div>
          ) : (
            <div className="relative mb-4 text-mobile-body md:text-desktop-body">
              <p>
                {data.property && returnUnitNumber(data.property.propertyType)
                  ? `You are on the waitlist for ${returnUnitNumber(
                      data.property.propertyType
                    )}! We’ll be in touch when this home is released.`
                  : "You're on the waitlist! We’ll be in touch as homes are released for sale."}
              </p>
            </div>
          )}
          {!submitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="w-full">
                <div className="relative flex flex-col gap-4">
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    className="outline-none border-black bg-transparent placeholder:opacity-[36] px-4 py-2 h-12 w-full text-mobile-body md:text-desktop-body font-serif"
                    placeholder="FULL NAME"
                    required
                    ref={register({ required: true })}
                  />
                  <input
                    placeholder="EMAIL"
                    type="email"
                    id="email"
                    name="email"
                    className="outline-none border-black bg-transparent placeholder:opacity-[36] px-4 py-2 h-12 w-full text-mobile-body md:text-desktop-body font-serif"
                    required
                    ref={register({ required: true })}
                  />
                  <input
                    type="text"
                    name="fax_data"
                    className="best-in-class"
                    value="no-data"
                    tabindex="-1"
                    autocomplete="off"
                    ref={register({ required: true })}
                  />
                </div>
                <div className="relative mt-10 flex flex-col gap-2 md:gap-4">
                  <button
                    className="tracking-normal h-12 max-h-12 text-center tracking-caps uppercase text-white bg-black text-mobile-body md:text-desktop-body"
                    type="submit"
                  >
                    Join the waitlist
                  </button>
                  <p className="mt-5">
                    Got questions?{" "}
                    <a className="border-dashed border-b-[2px]" href="/homes/contact">
                      Ask us anything
                    </a>
                    .
                  </p>
                </div>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
};
