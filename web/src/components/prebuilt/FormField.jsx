import React from "react";
import styled from "@emotion/styled";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/core";

const FormField = ({ label, type, name, placeholder, required }) => {
  return (
    <FormControl className="flex flex-col mb-1/2em">
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input className="box" name={name} type={type} placeholder={placeholder} required />
    </FormControl>
  );
};

export default FormField;
