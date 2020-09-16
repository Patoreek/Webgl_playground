import React, { useState, createContext } from "react";

export const PageContext = createContext();

export const GlobalProvider = (props) => {
  const [page, setPage] = useState("phe"); //? CHANGE THIS TO DEVELOP ON CERTAIN PAGE

  return (
    <PageContext.Provider value={[page, setPage]}>
      {props.children}
    </PageContext.Provider>
  );
};
