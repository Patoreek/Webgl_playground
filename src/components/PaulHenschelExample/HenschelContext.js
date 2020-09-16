import React, { useState, createContext, createRef } from "react";

export const SectionContext = createContext();
export const PagesContext = createContext();
export const ZoomContext = createContext();
export const ImagesContext = createContext();
export const TopContext = createContext();

export const HenschelProvider = (props) => {
  const [sections, setSections] = useState(3);
  const [pages, setPages] = useState(3);
  const [zoom, setZoom] = useState(75);
  const [images, setImages] = useState([
    "/photo-1548191265-cc70d3d45ba1.jpeg",
    "/photo-1519608487953-e999c86e7455.jpeg",
    "/photo-1533577116850-9cc66cad8a9b.jpeg",
  ]);
  const [top, setTop] = useState(createRef());

  return (
    <SectionContext.Provider value={[sections, setSections]}>
      <PagesContext.Provider value={[pages, setPages]}>
        <ZoomContext.Provider value={[zoom, setZoom]}>
          <ImagesContext.Provider value={[images, setImages]}>
            <TopContext.Provider value={[top, setTop]}>
              {props.children}
            </TopContext.Provider>
          </ImagesContext.Provider>
        </ZoomContext.Provider>
      </PagesContext.Provider>
    </SectionContext.Provider>
  );
};
