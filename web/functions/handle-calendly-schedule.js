const send = require("./mailers/send");

// Invitee Created event
// {
//   "created_at": "2020-11-23T17:51:19.000000Z",
//   "event": "invitee.created",
//   "payload": {
//     "cancel_url": "https://calendly.com/cancellations/AAAAAAAAAAAAAAAA",
//     "created_at": "2020-11-23T17:51:18.327602Z",
//     "email": "test@example.com",
//     "event": "https://api.calendly.com/scheduled_events/AAAAAAAAAAAAAAAA",
//     "name": "John Doe",
//     "new_invitee": null,
//     "old_invitee": null,
//     "questions_and_answers": [],
//     "reschedule_url": "https://calendly.com/reschedulings/AAAAAAAAAAAAAAAA",
//     "rescheduled": false,
//     "status": "active",
//     "text_reminder_number": null,
//     "timezone": "America/New_York",
//     "tracking": {
//       "utm_campaign": null,
//       "utm_source": null,
//       "utm_medium": null,
//       "utm_content": null,
//       "utm_term": null,
//       "salesforce_uuid": null
//     },
//     "updated_at": "2020-11-23T17:51:18.341657Z",
//     "uri": "https://api.calendly.com/scheduled_events/AAAAAAAAAAAAAAAA/invitees/AAAAAAAAAAAAAAAA",
//     "canceled": false
//   }
// }

exports.handler = async (data) => {
  const { event: eventType, payload } = data;

  let emailResponse;

  switch (eventType) {
    case "invitee.created": {
      // The customer has successfully subscribed to a calendly event.

      const { name, email } = payload;
      const data = { session: {}, customer: { name, email }, product: {}, metadata: {} };

      try {
        emailResponse = await send({ action: "admin-schedule-success", data });
        if (emailResponse.ok !== true) throw emailResponse.error;

        emailResponse = await send({ action: "schedule-success", data });
        if (emailResponse.ok !== true) throw emailResponse.error;
      } catch (err) {
        return {
          statusCode: 500,
          body: JSON.stringify({
            ok: false,
            message: err.message,
          }),
        };
      }

      break;
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
};
