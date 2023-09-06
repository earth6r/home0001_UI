import axios from "axios";

const hubspotPortalId = process.env.HUBSPOT_PORTAL_ID;
const hubspotGeneralWaitlistFormGuid = process.env.HUBSPOT_GENERAL_WAITLIST_FORM_ID;
const hubspotUnitWaitlistFormGuid = process.env.HUBSPOT_UNIT_WAITLIST_FORM_ID;
const hubspotNewsletterFormGuid = process.env.HUBSPOT_NEWSLETTER_FORM_ID;

export const submit_custom_hubspot_event = async data => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const response = await axios.post();
};

export const submit_hubspot_newsletter_form = async data => {
  const portalId = hubspotPortalId;
  const formGuid = hubspotNewsletterFormGuid;
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
  const portalId = hubspotPortalId;
  const formGuid = hubspotGeneralWaitlistFormGuid;
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
export const submit_hubspot_waitlist_form = async (fullName, email, unitOfInterest) => {
  const portalId = hubspotPortalId;
  const formGuid = hubspotUnitWaitlistFormGuid;
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
          name: "full_name",
          value: fullName
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
