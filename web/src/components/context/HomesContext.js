import React, { createContext, useState } from "react";

export const HomesContext = createContext();

export const HomesContextProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState({
    title: "",
    id: null
  });
  const [selectedProperty, setSelectedProperty] = useState({
    id: null
  });
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [showReserveHomeForm, setShowReserveHomeForm] = useState(null);
  const [menuOpened, setMenuOpened] = useState(null);

  const setCity = city => {
    setSelectedCity(city);
  };

  const setProperty = property => {
    setSelectedProperty(property);
  };

  const setPropertyType = propertyType => {
    setSelectedPropertyType(propertyType);
  };

  const setMenuOpen = opened => {
    setMenuOpened(opened);
  };

  const setReserveHomeForm = show => {
    setShowReserveHomeForm(show);
  };

  return (
    <HomesContext.Provider
      value={{
        selectedCity,
        selectedProperty,
        selectedPropertyType,
        menuOpened,
        showReserveHomeForm,
        setCity,
        setProperty,
        setPropertyType,
        setMenuOpen,
        setReserveHomeForm
      }}
    >
      {children}
    </HomesContext.Provider>
  );
};
