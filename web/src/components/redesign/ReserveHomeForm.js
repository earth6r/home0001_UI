import React from "react";
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@chakra-ui/core";
import Minus from "../icon/minus";
import Plus from "../icon/plus";

const { useForm } = require("react-hook-form");

export const ReserveHomeForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <div className="animate-in relative">
      <div className="w-screen h-full -ml-4 md:-ml-10 absolute bg-whitesmoke"></div>
      <div className="md:grid md:grid-cols-3 pr-mobile-menu md:pr-desktop-menu">
        <div className="md:col-start-2 md:col-span-1 py-10 md:py-20">
          <div className="relative mb-4 text-[0.875rem] font-serif">
            <p className="uppercase mb-0">RESERVE YOUR HOME</p>
            <p className="mt-10">
              Our initial release of homes is now oversubscribed.
              <br />
              Join our waitlist here for the next release.
            </p>
            <Accordion allowToggle defaultIndex={[2]} className="my-10 w-full">
              <AccordionItem className="bg-white border border-[#000] px-3 flex items-center text-[0.875rem] h-10 md:h-12">
                {({ isExpanded }) => (
                  <>
                    <AccordionHeader className="flex items-center justify-between hover:bg-white max-h-[1.15rem] p-0">
                      <h2 className="m-0 tracking-caps uppercase text-[0.875rem]">
                        What's included?
                      </h2>
                      <div className="text-[20px] font-normal">
                        {isExpanded ? <Minus /> : <Plus />}
                      </div>
                    </AccordionHeader>
                    <AccordionPanel className="px-0 py-4 text-[0.875rem]">
                      <p>
                        A place on the waitlist to buy an Earth home. Limited spots available.
                        <br /> <br />
                        Our next phase of homes will be available to buy in 8-12 months. You'll be
                        notified as new homes are released, and priority will be given based on when
                        you join.
                        <br />
                        <br />
                        Whether you plan to buy now or in the future, you can schedule consultations
                        with our team whenever you like to make plans, select a home, and secure
                        financing if necessary.
                      </p>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            </Accordion>
            <p>
              $100 USD / 0.0039 BTC / 0.058 ETH <br />
              Reservation deposit fully refundable any time, for any reason.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="w-full">
              <div className="flex items-center justify-start p-0 mb-10">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="outline-none border-black border-1 p-2 relative m-0 shadow-none left-0 top-0"
                  {...register("terms", { required: true })}
                />
                <label htmlFor="terms" className="relative m-0 text-[0.875rem] font-serif">
                  I agree to the Deposit Terms and Conditions
                </label>
              </div>

              <div className="relative flex flex-col gap-2">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="outline-none border-black bg-transparent placeholder:opacity-[36] px-4 py-2 h-12 w-full text-[0.875rem] font-serif"
                  placeholder="FULL NAME"
                  ref={register}
                />
                <input
                  placeholder="EMAIL"
                  type="email"
                  id="email"
                  name="email"
                  className="outline-none border-black bg-transparent placeholder:opacity-[36] px-4 py-2 h-12 w-full text-[0.875rem] font-serif"
                  ref={register}
                />
              </div>
              <div className="relative mt-10 flex flex-col gap-2 md:gap-4">
                <button
                  className="h-12 max-h-12 text-center tracking-caps uppercase text-white bg-black text-[0.875rem] font-serif"
                  type="button"
                >
                  Pay with crypto
                </button>
                <button
                  className="h-12 max-h-12 text-center tracking-caps uppercase text-white bg-black text-[0.875rem] font-serif "
                  type="button"
                >
                  Pay with cash
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
