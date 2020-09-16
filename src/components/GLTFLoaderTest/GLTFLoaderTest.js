import React, { useState, useRef, useEffect } from "react";
import "./GLTFLoaderTest.module.scss";

import HomeButton from "../HomeButton/HomeButton";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      //autoRotate
      args={[camera, gl.domElement]}
      ref={orbitRef}
      //maxPolarAngle={Math.PI / 3} //* Clamp Controls to a certain Angle
      //minPolarAngle={Math.PI / 3}
    />
  );
};

const Ship = () => {
  const [model, setModel] = useState();
  useEffect(() => {
    new GLTFLoader().load("./scene.gltf", setModel);
  }, []);
  console.log(model);
  return model ? (
    <primitive
      autoRotate
      object={model.scene}
      //rotation={[0, -Math.PI / 2, 0]}
    />
  ) : null;
};

const Plane = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
    <planeBufferGeometry attach="geometry" args={[100, 100]} />
    <meshPhysicalMaterial attach="material" color="white" />
  </mesh>
);

const Box = (props) => {
  //const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const events = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "purple" : "orange",
  });

  //* This is useRender
  // useFrame(() => {
  //   meshRef.current.rotation.y += 0.01;
  // });

  return (
    <a.mesh
      {...props}
      //ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={events.scale}
      castShadow
    >
      {/* <ambientLight /> */}
      <spotLight position={[100, 500, 100]} penumbra={1} castShadow />
      <boxBufferGeometry attach="geometry" args={[50, 50, 50]} />
      <a.meshPhysicalMaterial attach="material" color={events.color} />
    </a.mesh>
  );
};

function GLTFLoaderTest() {
  return (
    <>
      <HomeButton />
      <h1> Hello World! </h1>
      <Canvas
        camera={{ position: [4, -3, 5] }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 5, 10]} penumbra={1} castShadow />
        <fog attach="fog" args={["white", 0, 50]} />
        <Controls />
        {/* <Plane />
        <Box />
        <Box position={[100, 1, 1]} /> */}
        <Ship />
      </Canvas>
    </>
  );
}

export default GLTFLoaderTest;
