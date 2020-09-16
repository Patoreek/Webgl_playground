import React, { useRef, useState, useEffect, Suspense } from "react";

import classes from "./CustomExample.module.scss";

import HomeButton from "../HomeButton/HomeButton";

import { animated, useSpring } from "react-spring";

import * as THREE from "three";
import {
  Canvas,
  extend,
  useThree,
  useFrame,
  useLoader,
} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { softShadows, useCubeTextureLoader, PerspectiveCamera } from "drei";

import textureImg from "../../assets/texture_sm.jpg";
import textureImg2 from "../../assets/texture2_sm.jpg";

extend({ OrbitControls });

softShadows();

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      //autoRotate
      //autoRotateSpeed={10.0}
      enableDamping
      args={[camera, gl.domElement]}
      ref={orbitRef}

      //maxPolarAngle={Math.PI / 3} //* Clamp Controls to a certain Angle
      //minPolarAngle={Math.PI / 3}
    />
  );
};

const Cube = (props) => {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  //const texture = useLoader(THREE.TextureLoader, textureImg);
  //const loader = new CubeTextureLoader();

  // const envMap = useCubeTextureLoader(
  //   [textureImg, textureImg2, textureImg, textureImg2, textureImg, textureImg],
  //   { path: "" }
  // );
  const [reverse, setReverse] = useState(false);
  let group = useRef();
  let theta = 0;
  //let rotate = 0;
  const [rotate, setRotate] = useState(0);
  let position = 0;

  const cubeSpring = useSpring({});

  // Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
  // const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.1)));
  // const s = Math.cos(THREE.Math.degToRad(theta * 2));
  // group.current.rotation.set(r, r, r);
  // group.current.scale.set(s, s, s);
  const onClickAnim = () => {
    setRotate(rotate + 0.01);
    group.current.position.set(rotate, rotate, rotate);
  };

  const [colorChange, setColorChange] = useState(randomColor);
  return (
    <group ref={group}>
      <mesh
        visible
        userData={{ test: "hello" }}
        position={props.position} //* x, y, z position
        rotation={[0, 0, 0]} //* x, y, x rotation
        castShadow
        onClick={() => {
          setColorChange(Math.floor(Math.random() * 16777215).toString(16));
          onClickAnim();
        }}
      >
        {/* //* Create a geometry, attach it to the geometry object and the */}
        {/* //* arguments is the position of the object in 3D space */}
        <boxBufferGeometry attach="geometry" args={[0.2, 0.2, 0.2]} />
        {/* //* Create a material, attach it to the matieral object and give extra */}
        {/* //*  property values */}
        {/* meshBasicMaterial is alternative if not needing to texture indiviudal faces*/}
        <meshStandardMaterial
          attach="material"
          //envMap={materials}
          //side={THREE.BackSide}
          //map={texture}
          color={"#" + colorChange}
          transparent
        />
      </mesh>
    </group>
  );
};

const Plane = (props) => {
  return (
    <group>
      <mesh
        visible
        userData={{ test: "hello" }}
        position={props.position} //* x, y, z position
        rotation={[-Math.PI / 2, 0, 0]} //* x, y, x rotation
        receiveShadow
      >
        {/* //* Create a geometry, attach it to the geometry object and the */}
        {/* //* arguments is the position of the object in 3D space */}
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <meshStandardMaterial attach="material" color="#eee" transparent />
        <shadowMaterial attach="material" opacity={0.3} />
      </mesh>
    </group>
  );
};

// function Camera(props) {
//   const camera = useRef();
//   const { setDefaultCamera } = useThree();
//   // This makes sure that size-related calculations are proper
//   // Every call to useThree will return this camera instead of the default camera
//   let position = 0;
//   // useFrame(() => {
//   //   position += 0.01;
//   //   camera.current.position.set(-position, 0, position);
//   // });

//   useEffect(() => void setDefaultCamera(camera.current), []);
//   return <perspectiveCamera ref={camera} {...props} />;
// }

const CustomExample = () => {
  const [loading, setLoading] = useState(true);
  const [cubes, setCubes] = useState();

  useEffect(() => {
    console.log("In useEffect!");
    generateCubes();
    setLoading(false);
    console.log(cubes);
  }, []);

  const generateCubes = () => {
    let cubesArray = [];
    console.log("generating cubes");

    // for (var x = 0; x < 3; x += 2) {
    //   for (var y = 0; y < 3; y += 2) {
    //     for (var z = 0; z < 3; z += 2) {
    //       console.log("looping");
    //       console.log(x);
    //       console.log(z);
    //       cubesArray.push({
    //         x: x,
    //         y: y,
    //         z: -z,
    //       });
    //     }
    //   }
    // }

    cubesArray.push({
      x: 0,
      y: 0,
      z: 0,
    });

    //setCubes([...cubes, '<Cube position={[x, 0, y]} color="#9403fc" />']);
    console.log("CUBES ARRAY");
    console.log(cubesArray);
    setCubes(cubesArray);
  };

  console.log(cubes);

  return (
    <div className={classes.customExample}>
      <HomeButton />
      {!loading && (
        <Canvas colorManagement shadowMap>
          {/* //TODO: ORBITAL CONTROLS OF THE SCENE */}
          <Controls />
          {/* //TODO: LIGHTING OF THE SCENE */}
          <ambientLight intensity={0.3} />
          <directionalLight
            castShadow
            position={[5, 10, 10]}
            intensity={1.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          {/* //TODO: OBJECTS IN THE SCENE */}
          <Plane position={[0, -0.5, 0]} />
          <group position={[-2, 0, 0]}>
            <Suspense fallback={null}>
              {cubes.map((cube) => (
                <Cube position={[cube.x, cube.y, cube.z]} />
              ))}
            </Suspense>
          </group>
        </Canvas>
      )}
    </div>
  );
};

export default CustomExample;
