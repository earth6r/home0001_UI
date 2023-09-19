import axios from "axios";

export const submit_hubspot_newsletter_form = async data => {
  const portalId = "39987214";
  const formGuid = "0a972b3a-40d9-48b9-8f04-e506812ebe4f";
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const response = await axios.post(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      portalId,
      formGuid,
      fields: [
        {
          name: "email",
          value: data.email
        },
        { name: "berlin", value: data.Berlin },
        { name: "la", value: data.LA },
        { name: "london", value: data.London },
        { name: "nyc", value: data.NYC },
        { name: "paris", value: data.Paris },
        { name: "cdmx", value: data.CDMX },
        { name: "else", value: data.Else },
        { name: "city", value: data.City }
      ]
    },
    config
  );
};

export const submit_general_hubspot_waitlist_form = async data => {
  const portalId = "39987214";
  const formGuid = "a367593d-e145-4375-b75d-1ca928b87ab5";
  const config = {
    // important!
    headers: {
      "Content-Type": "application/json"
    }
  };

  const response = await axios.post(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      portalId,
      formGuid,
      fields: [
        { name: "full_name", value: data.full_name },
        {
          name: "email",
          value: data.email
        },
        { name: "berlin_general", value: data.Berlin },
        { name: "la_general", value: data.LA },
        { name: "london_general", value: data.London },
        { name: "nyc_general", value: data.NYC },
        { name: "paris_general", value: data.Paris },
        { name: "cdmx_general", value: data.CDMX },
        { name: "else_general", value: data.Else },
        { name: "city_general", value: data.City }
      ]
    },
    config
  );
};
export const submit_hubspot_waitlist_form = async (firstName, lastName, email, unitOfInterest) => {
  const portalId = "39987214";
  const formGuid = "904d697d-988d-4b01-a150-670f28231f3d";
  const config = {
    // important!
    headers: {
      "Content-Type": "application/json"
    }
  };

  const response = await axios.post(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      portalId,
      formGuid,
      fields: [
        {
          name: "firstname",
          value: firstName
        },
        {
          name: "lastname",
          value: lastName
        },

        {
          name: "email",
          value: email
        },
        {
          name: "unit_of_interest",
          value: unitOfInterest
        }
      ]
    },
    config
  );
  return response;
};
