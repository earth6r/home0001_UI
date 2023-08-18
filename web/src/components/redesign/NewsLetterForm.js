import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import addToMailchimp from "gatsby-plugin-mailchimp";
import { submit_hubspot_newsletter_form } from "../../utils/axios";
import { Input, Button } from "@chakra-ui/core";

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

  const onSubmit = async data => {
    let result;
    try {
      result = await submit_hubspot_newsletter_form(data.email);
      setResult("success");
    } catch (error) {
      setResult("error");
      console.log(error);
    }
  };

  return result === "success" ? (
    <>
      <h3 className="text-mobileLarge md:text-desktopBody">
        Thank you for signing up.
        <br />
      </h3>

      <p className="pt-1em text-mobileBody md:text-desktopCaption">
        We'll share occasional updates on new homes, new locations, and new projects as the network
        expands.
      </p>
    </>
  ) : (
    <>
      <form
        className="mx-0 text-mobile-body md:text-desktop-body mt-0 p-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="outlined-email-input"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          ref={register({ required: true })}
          className="text-mobile-body md:text-desktop-body newsletter px-3 py-4 placeholder:uppercase placeholder:text-mobile-body md:placeholder:text-desktop-body w-full"
          required
          placeholder="Email address"
          aria-describedby="email-helper-text"
        />
        <Button mt={4} type="submit" className="text-mobile-body bg-black w-full text-white">
          Submit
        </Button>
        {result === "error" && (
          <div
            style={{ borderColor: "red" }}
            className="mt-1em text-center py-4 text-red border rounded-md text-base"
          >
            <p>{msg}</p>
          </div>
        )}
      </form>
    </>
  );
};
