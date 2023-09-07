export const sendHubspotClickEvent = (event, value) => {
  if (typeof window !== undefined) {
    var _hsq = (window._hsq = window._hsq || []);

    _hsq.push([
      "trackCustomBehavioralEvent",
      {
        name: "pe43771996_custom_click_event",
        properties: {
          item_clicked: event,
          value: value
        }
      }
    ]);
  }
};
