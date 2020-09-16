import React, { useState, useRef, useEffect } from "react";

import classes from "./HeroProject.module.scss";

import HomeButton from "../HomeButton/HomeButton";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";

const HeroProject = () => {
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
        enableDamping

        //maxPolarAngle={Math.PI / 3} //* Clamp Controls to a certain Angle
        //minPolarAngle={Math.PI / 3}
      />
    );
  };

  const Ezio = () => {
    const [model, setModel] = useState();
    const ezioRef = useRef();
    useEffect(() => {
      //* ./model_ezio/scene.gltf
      //* ./model_cake/scene.gltf
      //* ./model_sign/scene.gltf
      //* ./model_blacksmith/scene.gltf
      new GLTFLoader().load("./model_blacksmith/scene.gltf", setModel);
    }, []);
    console.log(model);
    return model ? (
      <primitive
        ref={ezioRef}
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
  return (
    <div className={classes.heroProject}>
      <HomeButton />
      <Canvas
        camera={{ position: [50, 0, 100] }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <ambientLight intensity={1} />
        <spotLight position={[0, 5, 10]} penumbra={1} castShadow />
        <Controls />
        {/* <Plane /> */}
        <Ezio />
      </Canvas>
    </div>
  );
};

export default HeroProject;
