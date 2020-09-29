import React from "react";
import FormField from "./FormField";

const BillingDetailsFields = () => {
  return (
    <div className="flex flex-col">
      <FormField name="name" label="Name" type="text" placeholder="Jane Doe" required />
      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="jane.doe@example.com"
        required
      />
      <FormField name="phone" label="Phone" type="phone" placeholder="(415) 999-9999" />
      <FormField
        name="address"
        label="Address"
        type="text"
        placeholder="185 Berry St. Suite 550"
        required
      />
      <FormField name="city" label="City" type="text" placeholder="San Francisco" required />
      <FormField name="state" label="State" type="text" placeholder="California" required />
      <FormField name="zip" label="ZIP" type="text" placeholder="94103" required />
    </div>
  );
};

export default BillingDetailsFields;
