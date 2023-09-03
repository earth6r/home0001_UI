import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import addToMailchimp from "gatsby-plugin-mailchimp";
import { submit_hubspot_newsletter_form } from "../../utils/axios";
import { Input, Button, Checkbox } from "@chakra-ui/core";

export const NewsLetterForm = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 max-w-[19.375rem] md:max-w-[29.25rem]">
      <p className="text-mobile-body md:text-desktop-body mb-0 p-0">{data.title}</p>
      <HubspotNewsletterForm />
    </div>
  );
};

const HubspotNewsletterForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const [result, setResult] = useState({});
  const [msg, setMsg] = useState("");
  const [cityChecked, setCityChecked] = useState(false);
  const handleCheckChange = event => {
    setCityChecked(event.target.checked);
  };

  const onSubmit = async data => {
    let result;
    try {
      result = await submit_hubspot_newsletter_form(data);
      setResult("success");
    } catch (error) {
      setResult("error");
      console.log(error);
    }
  };

  return result === "success" ? (
    <div className="relative mb-4 text-mobile-body md:text-desktop-body font-serif">
      <p>Your data — our harvest.</p>
    </div>
  ) : (
    <form
      className="mx-0 text-mobile-body md:text-desktop-body mt-0 p-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        id="outlined-email-input"
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        ref={register({ required: true })}
        className="text-mobile-body md:text-desktop-body newsletter px-3 py-4 placeholder:uppercase placeholder:text-mobile-body md:placeholder:text-desktop-body w-full h-8"
        required
        placeholder="Email address"
        aria-describedby="email-helper-text"
      />
      <p className="mt-4">Where do you want to live?</p>
      <div className="mb-4">
        <input className="" type="checkbox" ref={register({ required: false })} name="LA" />
        <label className="text-left ml-2 ">Los Angeles</label>
      </div>
      <div className="mb-4">
        <input className="" type="checkbox" ref={register({ required: false })} name="NYC" />
        <label className="text-left ml-2 ">New York</label>
      </div>
      <div className="mb-4">
        <input className="" type="checkbox" ref={register({ required: false })} name="Paris" />
        <label className="text-left ml-2">Paris (coming soon)</label>
      </div>
      <div className="mb-4">
        <input className="" type="checkbox" ref={register({ required: false })} name="London" />
        <label className="text-left ml-2">London (coming soon)</label>
      </div>
      <div className="mb-4">
        <input className="" type="checkbox" ref={register({ required: false })} name="Berlin" />
        <label className="text-left ml-2">Berlin (coming soon)</label>
      </div>
      <div className="mb-4">
        <input className="" type="checkbox" ref={register({ required: false })} name="CDMX" />
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
      <button
        mt={4}
        type="submit"
        className="tracking-normal text-mobile-body bg-black w-full text-white"
      >
        Submit
      </button>
      {result === "error" && (
        <div
          style={{ borderColor: "red" }}
          className="mt-1em text-center py-4 text-red border rounded-md text-base"
        >
          <p>{msg}</p>
        </div>
      )}
    </form>
  );
};
