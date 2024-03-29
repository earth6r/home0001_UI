import addToMailchimp from "gatsby-plugin-mailchimp";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import PortableText from "./portableText";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button
} from "@chakra-ui/core";
import GridRow from "./grid/grid-row";

export default class MailChimpForm extends React.Component {
  constructor() {
    super();
    this.state = { email: "", result: {}, msg: "" };
  }

  _handleSubmit = async e => {
    e.preventDefault();
    let result;
    if (this.props.signup) {
      result = await addToMailchimp(
        this.state.email,
        {},
        process.env.GATSBY_MAILCHIMP_SIGNUP_ENDPOINT
      );
    } else {
      result = await addToMailchimp(this.state.email);
    }

    this.setState({ result: result.result });
    this.setState({ msg: result.msg });
  };

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    const { newsletter, rnd, signup } = this.props;
    return this.state.result === "success" ? (
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
        <GridRow />
      </>
    ) : (
      <>
        {newsletter && this.state.result !== "success" ? (
          <p className="pb-1em text-mobileBody md:text-desktopCaption">
            <PortableText blocks={newsletter} />
          </p>
        ) : null}
        <form className="mx-0" onSubmit={this._handleSubmit}>
          <FormControl>
            <Input
              id="outlined-email-input"
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              onChange={this.handleChange}
              type="email"
              id="email"
              className="mx-0 pl-1/2em w-full pt-0 input-margin-top"
              required
              placeholder="Your email"
              aria-describedby="email-helper-text"
            />
          </FormControl>
          {rnd ? (
            <Button
              mt={4}
              type="submit"
              className="bg-black text-desktopNav normal-case w-full text-white"
            >
              Sign Up
            </Button>
          ) : (
            <Button mt={4} type="submit" className="bg-black w-full text-white">
              Submit
            </Button>
          )}
          {this.state.result === "error" && (
            <div
              style={{ borderColor: "red" }}
              className="mt-1em text-center pt-1/2em pb-1/4em text-red border rounded-md"
            >
              {ReactHtmlParser(this.state.msg)}
            </div>
          )}
        </form>
      </>
    );
  }
}
