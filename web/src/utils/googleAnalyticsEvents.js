export const fireViewFactSheetEvent = propertyType => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", `view_fact_sheet_for_${propertyType}`);
  }
};

export const fireCityClickEvent = cityClicked => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", `click_${cityClicked}_button`);
  }
};

export const fireSubmitReservationFormEvent = unitOfInterest => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "submit_reservation_form", {
      "unit of interest": unitOfInterest
    });
  }
};

export const fireViewInventoryEvent = propertyType => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", `view_inventory_for_${propertyType}`);
  }
};

export const fireClickedUnitTileEvent = propertyType => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", `clicked_unit_tile_for_${propertyType}`);
  }
};

export const viewOpenedReserveFormEvent = propertyType => {
  console.log("propertyType:", propertyType);
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", `opened_reserve_form_for_${propertyType}`);
  }
};
