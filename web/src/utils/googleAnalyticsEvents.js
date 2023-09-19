export const cityClickEvent = cityClicked => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", `click_${cityClicked}_button`);
  }
};

export const submitReservationFormEvent = unitOfInterest => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "submit_reservation_form", {
      "unit of interest": unitOfInterest
    });
  }
};

export const viewInventoryEvent = propertyType => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", `view_inventory_for_${propertyType}`);
  }
};

export const clickedUnitTileEvent = propertyType => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", `clicked_unit_tile_for_${propertyType}`);
  }
};

export const openedReserveFormEvent = propertyType => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", `opened_reserve_form_for_${propertyType}`);
  }
};
