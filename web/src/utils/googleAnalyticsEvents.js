export const cityClickEvent = cityClicked => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", `click ${cityClicked} button`);
  }
};

export const submitReservationFormEvent = unitOfInterest => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "submit reservation form", {
      "unit of interest": unitOfInterest
    });
  }
};

export const viewInventoryEvent = propertyType => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", `view inventory for ${propertyType}`);
  }
};

export const clickedUnitTileEvent = propertyType => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", `clicked unit tile for ${propertyType}`);
  }
};

export const openedReserveFormEvent = propertyType => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", `opened reserve form for ${propertyType}`);
  }
};
