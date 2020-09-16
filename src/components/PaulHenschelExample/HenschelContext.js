import React, { useState, createContext, useRef } from "react";

export const SectionsContext = createContext();
export const PagesContext = createContext();
export const ZoomContext = createContext();
export const ImagesContext = createContext();
export const TopContext = createContext();

export const HenschelProvider = (props) => {
  const [sections, setSections] = useState(3);
  const [pages, setPages] = useState(3);
  const [zoom, setZoom] = useState(75);
  const top = useRef();

  return (
    <SectionsContext.Provider value={[sections, setSections]}>
      <PagesContext.Provider value={[pages, setPages]}>
        <ZoomContext.Provider value={[zoom, setZoom]}>
          <TopContext.Provider value={top}>
            {props.children}
          </TopContext.Provider>
        </ZoomContext.Provider>
      </PagesContext.Provider>
    </SectionsContext.Provider>
  );
};
