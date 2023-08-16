import axios from "axios";

export const submit_hubspot_newsletter_form = async email => {
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
          value: email
        }
      ]
    },
    config
  );
};
export const submit_hubspot_waitlist_form = async (fullName, email, unitOfInterest) => {
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
