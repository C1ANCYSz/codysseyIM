import { createContext, useContext, useMemo, useState } from "react";

const UiContext = createContext();

function UiContextProvider({ children }) {
  const [openModal, setOpenModal] = useState(false);

  const value = useMemo(
    () => ({
      openModal,
      setOpenModal,
    }),
    [openModal, setOpenModal],
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export const useUiContext = () => {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error("useUiContext must be used within a UiContextProvider");
  }
  return context;
};

export { UiContextProvider };
