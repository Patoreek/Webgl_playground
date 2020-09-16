import React, { useContext } from "react";
import classes from "./Home.module.scss";

import { PageContext } from "../../context/GlobalContext";

const Home = () => {
  const [page, setPage] = useContext(PageContext);

  return (
    <div className={classes.home}>
      <h1 className={classes.home__title}>
        List of Three.js / React-Three-Fiber Projects
      </h1>
      <ul className={classes.homeList}>
        <li
          className={classes.homeList__listItem}
          onClick={() => setPage("customExample")}
        >
          Custom Example Playground
        </li>
        <li
          className={classes.homeList__listItem}
          onClick={() => setPage("react3fiberDocs")}
        >
          React Three Fiber Docs Examples
        </li>
        <li
          className={classes.homeList__listItem}
          onClick={() => setPage("gtlfLoaderTest")}
        >
          GTLF Model Loading Test{" "}
        </li>
        <li
          className={classes.homeList__listItem}
          onClick={() => setPage("spaceExample")}
        >
          Space Example{" "}
        </li>
        <li
          className={classes.homeList__listItem}
          onClick={() => setPage("heroProject")}
        >
          Hero Project{" "}
        </li>
        <li
          className={classes.homeList__listItem}
          onClick={() => setPage("reactSpring")}
        >
          React Spring
        </li>
        <li
          className={classes.homeList__listItem}
          onClick={() => setPage("phe")}
        >
          Paul Henschel Example
        </li>
      </ul>
    </div>
  );
};

export default Home;
