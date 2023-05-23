import React from "react";
// import MailChimpForm from "../../components/mailchimp-form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import addToMailchimp from "gatsby-plugin-mailchimp";
import ReactHtmlParser from "react-html-parser";
import { FormControl, FormErrorMessage, Input, Button } from "@chakra-ui/core";
import PortableText from "../portableText";

export const NewsLetterForm = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 mt-10 max-w-[19.375rem] md:max-w-[29.25rem]">
      <p className="text-base mb-0 p-0">{data.title}</p>
      <MailChimpForm signup />
    </div>
  );
};

const MailChimpForm = ({ signup }) => {
  const { register, handleSubmit, errors } = useForm();
  const [result, setResult] = useState({});
  const [msg, setMsg] = useState("");

  const onSubmit = async data => {
    let result;
    if (signup) {
      result = await addToMailchimp(data.email, {}, process.env.GATSBY_MAILCHIMP_SIGNUP_ENDPOINT);
    } else {
      result = await addToMailchimp(data.email);
    }

    setResult(result.result);
    setMsg(result.msg);
  };

  return result === "success" ? (
    <>
      <h3 className="text-mobileLarge md:text-desktopBody">
        {signup ? <>You&#39;re signed up.</> : <>Thank you for signing up.</>}
        <br />
      </h3>

      {signup ? null : (
        <p className="pt-1em text-mobileBody md:text-desktopCaption">
          We'll share occasional updates on new homes, new locations, and new projects as the
          network expands.
        </p>
      )}
    </>
  ) : (
    <>
      <form
        className="mx-0 text-[0.875rem] md:text-base mt-0 p-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="outlined-email-input"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          ref={register({ required: true })}
          className="px-3 py-4 placeholder:uppercase placeholder:text-[0.875rem] w-full"
          required
          placeholder="Email address"
          aria-describedby="email-helper-text"
        />
        <Button mt={4} type="submit" className="bg-black w-full text-white">
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
