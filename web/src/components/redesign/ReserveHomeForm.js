import React from "react";
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@chakra-ui/core";

const { useForm } = require("react-hook-form");

export const ReserveHomeForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <div className=" relative mt-8">
      <div className=" w-full h-full absolute  transform scale-x-150  bg-whitesmoke"></div>
      <div className="pt-10 relative mb-4 text-[14px] md:text-base font-serif max-w-[19.375rem] md:max-w-[29.25rem]">
        <p className=" uppercase mb-0">RESERVE YOUR HOME</p>
        <p className="mt-10">
          Our initial release of homes is now oversubscribed. <br /> <br /> Join our waitlist here
          for the next release.
        </p>
        <Accordion
          allowToggle
          defaultIndex={[2]}
          className="my-10 w-full max-w-[19.375rem] md:max-w-[29.25rem]"
        >
          <AccordionItem className="bg-white border border-[#000] px-3 py-[15px] md:py-[1.15rem] text-[14px] md:text-base ">
            {({ isExpanded }) => (
              <>
                <AccordionHeader className=" flex items-center justify-between hover:bg-white  max-h-[1.15rem] ">
                  <h2 className="m-0 uppercase text-[14px] md:text-base">What's included?</h2>
                  <div className="text-[20px] font-normal">{isExpanded ? "-" : "+"}</div>
                </AccordionHeader>
                <AccordionPanel className="px-3 py-4 text-[14px] md:text-base">
                  <p>
                    A place on the waitlist to buy an Earth home. Limited spots available.
                    <br /> <br />
                    Our next phase of homes will be available to buy in 8-12 months. You'll be
                    notified as new homes are released, and priority will be given based on when you
                    join.
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
          $100 USD / 0.005 BTC / 0.08 ETH <br />
          Reservation deposit fully refundable any time, for any reason.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full  pb-10  max-w-[19.375rem] md:max-w-[29.25rem] "
      >
        <div className="w-full">
          <div className=" flex items-center justify-start p-0 mb-10">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="border-black border-2 p-2 relative m-0  shadow-none  left-0"
              {...register("terms", { required: true })}
            />
            <label htmlFor="terms" className="relative m-0 text-[14px] md:text-base font-serif">
              I agree to the Deposit Terms and Conditions
            </label>
          </div>

          <div className="relative  flex flex-col gap-2">
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="border-black bg-transparent placeholder:opacity-40 px-4 py-5 w-full text-[14px] md:text-base font-serif"
              placeholder="FULL NAME"
              ref={register}
            />
            <input
              placeholder="EMAIL"
              type="email"
              id="email"
              name="email"
              className="border-black bg-transparent placeholder:opacity-40 px-4 py-5 w-full text-[14px] md:text-base font-serif"
              ref={register}
            />
          </div>
          <div className="relative  mt-10 flex flex-col gap-4  ">
            <button
              className="h-12 max-h-12 text-center uppercase text-white bg-black  text-[14px] md:text-base font-serif"
              type="button"
            >
              Pay with crypto
            </button>
            <button
              className="h-12 max-h-12  text-center uppercase text-white bg-black text-[14px] md:text-base font-serif "
              type="button"
            >
              Pay with cash
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
