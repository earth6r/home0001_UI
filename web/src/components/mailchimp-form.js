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
      <div>SUCCESS</div>
    ) : this.state.result == "error" ? (
      <div>ERROR</div>
    ) : (
      <form onSubmit={this._handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            id="outlined-email-input"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            onChange={this.handleChange}
            type="email"
            id="email"
            className="rounded-md"
            required
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
      </form>
    );
  }
}
