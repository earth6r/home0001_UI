import addToMailchimp from "gatsby-plugin-mailchimp";
import React from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/core";
import GridRow from "./grid/grid-row";

export default class MailChimpForm extends React.Component {
  constructor() {
    super();
    this.state = { email: "", result: {} };
  }

  _handleSubmit = async (e) => {
    console.log("handle sub");
    e.preventDefault();
    const result = await addToMailchimp(this.state.email);
    console.log("result", result);
    this.setState({ result: result.result });
  };

  handleChange = (event) => {
    this.setState({ email: event.target.value });
  };
  render() {
    return this.state.result == "success" ? (
      <>
        <h3 className="text-mobileLarge md:text-desktopBody">
          Thank you for signing up.
          <br />
          <span className="earth">E</span>
        </h3>
        <GridRow />
        <p className="pt-1em text-mobileBody md:text-desktopCaption">
          We will begin sharing updates on new home, new locations, and other projects as the
          network expands.
        </p>
      </>
    ) : (
      <form className="mx-0" onSubmit={this._handleSubmit}>
        <FormControl>
          {/*<FormLabel className="text-left mx-0 px-0" htmlFor="email">
            Email address
    </FormLabel>*/}
          <Input
            id="outlined-email-input"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            onChange={this.handleChange}
            type="email"
            id="email"
            className="rounded-md mx-0 w-full"
            required
            placeholder="Email address"
            aria-describedby="email-helper-text"
          />
        </FormControl>

        <Button
          mt={4}
          // variantColor="teal"
          // isLoading={props.isSubmitting}
          type="submit"
          className="bg-black rounded-md w-full text-white"
        >
          Submit
        </Button>
        {this.state.result == "error" && (
          <div
            style={{ borderColor: "red" }}
            className="mt-1em text-center pt-1/2em pb-1/4em text-red border rounded-md"
          >
            Wups, something went wrong. Please try again.
          </div>
        )}
        {this.state.success !== "success" && (
          <p className="pt-2em text-mobileBody md:text-desktopCaption">
            Join for occasional updates on new home, new locations, and other projects as the
            network expands.
          </p>
        )}
      </form>
    );
  }
}
