import React from "react";
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@chakra-ui/core";
import Minus from "../icon/minus";
import Plus from "../icon/plus";
import { useForm } from "react-hook-form";
import { StandardText } from "../global/standardText";
import PortableText from "../portableText";

export const ReserveHomeForm = ({ data }) => {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true
  });

  const onSubmit = data => {
    window.location.href = "https://buy.stripe.com/8wM6pceRr5dscdGaEF";
  };
  console.log("data", data);

  const returnUnitNumber = unit => {
    if (unit === "studio") {
      return "Unit 3B";
    } else if (unit === "studio-max") {
      return "Unit 4A";
    } else if (unit === "one-bedroom") {
      return "Unit 6B";
    }
  };

  return (
    <div className="animate-in relative">
      <div className="w-screen h-full -ml-4 md:-ml-10 absolute bg-whitesmoke"></div>
      <div className="md:grid md:grid-cols-3 pr-mobile-menu md:pr-desktop-menu">
        <div className="md:col-start-2 md:col-span-1 pt-10 pb-20">
          <div className="relative mb-4 text-mobile-body md:text-desktop-body font-serif">
            <p className="uppercase mb-0">
              {data.property
                ? `Join waitlist for unit ${returnUnitNumber(data.property.propertyType)}`
                : "Join waitlist for unit"}
            </p>
            <p className="mt-10">
              {/* <StandardText data={data.siteData.reserveHomeForm._rawSubtitle} /> */}
            </p>
            <div className="text-red text-2xl mb-5">22 places available out of 30</div>
            <p>
              {`${
                data.property ? returnUnitNumber(data.property.propertyType) : null
              } will be released for sale soon to
              buyers on the waitlist. Homebuyers will be offered this home in the order they joined.`}
            </p>
            <p>
              In the meanwhile you can schedule a consultation with our team to help answer
              questions, secure financing, or coordinate a property tour.
            </p>
            {/* <Accordion allowToggle defaultIndex={[2]} className="my-10 w-full">
              <AccordionItem className="bg-white border border-[#000] flex flex-col justify-center text-mobile-body md:text-desktop-body">
                {({ isExpanded }) => (
                  <>
                    <AccordionHeader className="flex items-center justify-between hover:bg-white px-3 py-4 h-full">
                      <h2 className="m-0 tracking-caps uppercase text-mobile-body md:text-desktop-body">
                        What's included?
                      </h2>
                      <div className="text-[20px] font-normal">
                        {isExpanded ? <Minus /> : <Plus />}
                      </div>
                    </AccordionHeader>
                    <AccordionPanel className="px-3 text-mobile-body md:text-desktop-body">
                      <PortableText blocks={data.siteData._rawWhatsIncluded} />
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            </Accordion> */}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="w-full">
              <div className="flex items-center justify-start p-0 mb-10">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="outline-none border-black border-1 p-2 relative m-0 shadow-none left-0 top-0"
                  required
                  ref={register({ required: true })}
                />
                <label
                  htmlFor="terms"
                  className="relative m-0 text-mobile-body md:text-desktop-body font-serif"
                >
                  <StandardText data={data.siteData.reserveHomeForm._rawCheckboxText} />
                </label>
              </div>

              <div className="relative flex flex-col gap-2">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
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
              </div>
              <div className="relative mt-10 flex flex-col gap-2 md:gap-4">
                <button
                  className="h-12 max-h-12 text-center tracking-caps uppercase text-white bg-black text-mobile-body md:text-desktop-body font-serif "
                  type="submit"
                >
                  Join the waitlist
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
