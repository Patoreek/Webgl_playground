import lerp from "lerp";
import React, { useRef, useEffect, useContext, createContext } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import classes from "./PaulHenschelExample.module.scss";

import {
  SectionsContext,
  PagesContext,
  ZoomContext,
  TopContext,
} from "./HenschelContext";

function PaulHenschelExample() {
  const top = useContext(TopContext);
  const [pages, setPages] = useContext(PagesContext);
  const [zoom, setZoom] = useContext(ZoomContext);
  const [sections, setSections] = useContext(SectionsContext);

  //* SCROLLING FUNCTIONALITY
  const scrollArea = useRef();
  const onScroll = (e) => {
    //state.top.current = e.target.scrollTop;
    top.current = e.target.scrollTop;
    //console.log(top.current);
  };
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  console.log("[main.js] pages = " + pages);

  //*  STRIPE
  const Stripe = () => {
    const { contentMaxWidth } = useBlock();
    return (
      <Plane
        scale={[100, contentMaxWidth, 1]}
        rotation={[0, 0, Math.PI / 4]}
        position={[0, 0, -1]}
        color="#e3f6f5"
      />
    );
  };

  //* CONTENT
  const Content = ({ left, children }) => {
    const { contentMaxWidth, canvasWidth, margin } = useBlock();
    const aspect = 1.75;
    const alignRight = (canvasWidth - contentMaxWidth - margin) / 2;
    return (
      <group position={[alignRight * (left ? -1 : 1), 0, 0]}>
        <Plane
          scale={[contentMaxWidth, contentMaxWidth / aspect, 1]}
          color="#bfe2ca"
        />
        {children}
      </group>
    );
  };

  //* CROSS
  const Cross = () => {
    const ref = useRef();
    const { viewportHeight } = useBlock();
    useFrame(() => {
      const curTop = top.current;
      const curY = ref.current.rotation.z;
      const nextY = (curTop / ((pages - 1) * viewportHeight)) * Math.PI;
      ref.current.rotation.z = lerp(curY, nextY, 0.1);
    });
    return (
      <group ref={ref} scale={[2, 2, 2]}>
        <Plane scale={[1, 0.2, 0.2]} color="#e2bfca" />
        <Plane scale={[0.2, 1, 0.2]} color="#e2bfca" />
      </group>
    );
  };

  //* PLANE
  const Plane = ({ color = "white", ...props }) => {
    return (
      <mesh {...props}>
        <planeBufferGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={color} />
      </mesh>
    );
  };

  //* BLOCK && useBlock()

  const offsetContext = createContext(0);

  const Block = ({ children, offset, factor, ...props }) => {
    const { offset: parentOffset, sectionHeight } = useBlock();
    const ref = useRef();
    offset = offset !== undefined ? offset : parentOffset;
    useFrame(() => {
      const curY = ref.current.position.y;
      const curTop = top.current;
      ref.current.position.y = lerp(curY, (curTop / zoom) * factor, 0.1);
    });
    return (
      <offsetContext.Provider value={offset}>
        <group {...props} position={[0, -sectionHeight * offset * factor, 0]}>
          <group ref={ref}>{children}</group>
        </group>
      </offsetContext.Provider>
    );
  };

  const useBlock = () => {
    const { size, viewport } = useThree();
    const offset = useContext(offsetContext);
    const viewportWidth = viewport.width;
    const viewportHeight = viewport.height;
    const canvasWidth = viewportWidth / zoom;
    const canvasHeight = viewportHeight / zoom;
    const mobile = size.width < 700;
    const margin = canvasWidth * (mobile ? 0.2 : 0.1);
    const contentMaxWidth = canvasWidth * (mobile ? 0.8 : 0.6);
    const sectionHeight = canvasHeight * ((pages - 1) / (sections - 1));
    return {
      viewport,
      offset,
      viewportWidth,
      viewportHeight,
      canvasWidth,
      canvasHeight,
      mobile,
      margin,
      contentMaxWidth,
      sectionHeight,
    };
  };

  return (
    <>
      <Canvas
        className={classes.canvas}
        orthographic
        camera={{ zoom: zoom, position: [0, 0, 500] }}
      >
        {/* First section */}
        <Block factor={1.5} offset={0}>
          <Content left />
        </Block>
        {/* Second section */}
        <Block factor={2.0} offset={1}>
          <Content />
        </Block>
        {/* Stripe */}
        <Block factor={-1.0} offset={1}>
          <Stripe />
        </Block>
        {/* Last section */}
        <Block factor={1.5} offset={2}>
          <Content left>
            <Block factor={-0.5}>{/* <Cross /> */}</Block>
          </Content>
        </Block>
      </Canvas>
      <div className={classes.scrollArea} ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${pages * 100}vh` }} />
      </div>
    </>
  );
}

export default PaulHenschelExample;
