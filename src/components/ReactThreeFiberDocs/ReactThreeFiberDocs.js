import React, { useRef, useEffect } from "react";

import classes from "./ReactThreeFiberDocs.module.scss";

import HomeButton from "../HomeButton/HomeButton";

import { extend, Canvas, useFrame, useThree } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";

extend({ EffectComposer, RenderPass, GlitchPass });

const Effects = ({ factor }) => {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef();
  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size,
  ]);
  // This takes over as the main render-loop (when 2nd arg is set to true)
  useFrame(() => composer.current.render(), true);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" args={[scene, camera]} />
      <glitchPass attachArray="passes" factor={factor} renderToScreen />
    </effectComposer>
  );
};
//import img from "../../assets/texture.jpg";

const ReactThreeFiberDocs = () => {
  return (
    <div>
      <HomeButton />
      <Canvas>
        <mesh
          visible
          userData={{ test: "hello" }}
          position={[0, 0, 0]} //* x, y, z position
          rotation={[0, 0, 0]} //* x, y, x rotation
          //   geometry={new THREE.BoxBufferGeometry(1, 1, 1)} //* Three.js geometry that is wanted is placed here
          //   material={
          //     new THREE.MeshBasicMaterial({
          //       color: new THREE.Color("#0a0a0a"),
          //       transparent: true,
          //     })
          //  }
          onClick={(e) => console.log("click")}
          onWheel={(e) => console.log("wheel spins")}
          onPointerUp={(e) => console.log("up")}
          onPointerDown={(e) => console.log("down")}
          onPointerOver={(e) => console.log("hover")}
          onPointerOut={(e) => console.log("unhover")}
          onPointerMove={(e) => console.log("move")}
          onUpdate={(self) => console.log("props have been updated")}
        >
          {/* //* Create a geometry, attach it to the geometry object and the */}
          arguments is the position of the object in //* 3D space
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          {/* //* Create a material, attach it to the matieral object and give extra */}
          property values
          <meshStandardMaterial attach="material" color="#0a0a0a" transparent />
          <Effects />
        </mesh>
      </Canvas>
    </div>
  );
};

export default ReactThreeFiberDocs;
