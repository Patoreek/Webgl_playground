import React from "react";
import classes from "./ReactSpring.module.scss";

import { useSpring, animated } from "react-spring";

import HomeButton from "../HomeButton/HomeButton";

const ReactSpring = () => {
  //* Define spring. This is the animation.
  const titleSpring = useSpring({
    from: {
      opacity: 0,
      borderBottom: "0px solid blue",
    },
    to: {
      opacity: 1,
      borderBottom: "10px solid red",
    },
    delay: 100,
  });

  return (
    <div className={classes.reactSpring}>
      <HomeButton />
      <animated.h1 className={classes.title} style={titleSpring}>
        React Spring
      </animated.h1>
    </div>
  );
};

export default ReactSpring;
