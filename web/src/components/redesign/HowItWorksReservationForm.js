import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export const GeneralReservationForm = ({ data }) => {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true
  });
  const [cityChecked, setCityChecked] = useState(false);
  const handleCheckChange = event => {
    setCityChecked(event.target.checked);
  };

  const onSubmit = async data => {
    if (data.fax_data !== "no-data") return;
    console.log("data", data);
    // await submit_general_hubspot_waitlist_form(
    //  data
    // );
    setSubmitted(true);
  };

  return (
    <div className="animate-in relative">
      <div className="w-screen h-full -ml-4 md:-ml-10 absolute bg-whitesmoke"></div>
      <div className="md:grid md:grid-cols-3 pr-mobile-menu md:pr-desktop-menu">
        <div className="md:col-start-2 md:col-span-1 pt-10 pb-10">
          {!submitted ? (
            <div className="relative mb-4 text-mobile-body md:text-desktop-body font-serif">
              <p className="uppercase mb-9">Join waitlist</p>
            </div>
          ) : (
            <div className="relative mb-4 text-mobile-body md:text-desktop-body">
              <p>You're on the waitlist. We’ll be in touch as homes are released for sale.</p>
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
                  <p className="mt-4">Where do you want to live?</p>
                  <div className="mb-4">
                    <input
                      className=""
                      type="checkbox"
                      ref={register({ required: false })}
                      name="LA"
                    />
                    <label className="text-left ml-2 ">Los Angeles</label>
                  </div>
                  <div className="mb-4">
                    <input
                      className=""
                      type="checkbox"
                      ref={register({ required: false })}
                      name="NYC"
                    />
                    <label className="text-left ml-2 ">New York</label>
                  </div>
                  <div className="mb-4">
                    <input
                      className=""
                      type="checkbox"
                      ref={register({ required: false })}
                      name="Paris"
                    />
                    <label className="text-left ml-2">Paris (coming soon)</label>
                  </div>
                  <div className="mb-4">
                    <input
                      className=""
                      type="checkbox"
                      ref={register({ required: false })}
                      name="London"
                    />
                    <label className="text-left ml-2">London (coming soon)</label>
                  </div>
                  <div className="mb-4">
                    <input
                      className=""
                      type="checkbox"
                      ref={register({ required: false })}
                      name="Berlin"
                    />
                    <label className="text-left ml-2">Berlin (coming soon)</label>
                  </div>
                  <div className="mb-4">
                    <input
                      className=""
                      type="checkbox"
                      ref={register({ required: false })}
                      name="CDMX"
                    />
                    <label className="text-left ml-2">Mexico City (coming soon)</label>
                  </div>
                  <div className="mb-4">
                    <input
                      className=""
                      type="checkbox"
                      ref={register({ required: false })}
                      name="Else"
                      onChange={handleCheckChange}
                    />
                    <label className="text-left ml-2">Somewhere else:</label>
                  </div>
                  <input
                    type="text"
                    placeholder="ENTER A CITY"
                    ref={register({ required: false })}
                    name="City"
                    className={`${
                      cityChecked ? "mb-4" : "invisible"
                    } text-mobile-body md:text-desktop-body newsletter px-3 py-4 placeholder:uppercase placeholder:text-mobile-body md:placeholder:text-desktop-body w-full h-8`}
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
