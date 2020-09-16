import React, { useContext } from "react";
import "./App.scss";

import GLTFLoaderTest from "./components/GLTFLoaderTest/GLTFLoaderTest";
import ReactThreeFiberDocs from "./components/ReactThreeFiberDocs/ReactThreeFiberDocs";
import SpaceExample from "./components/SpaceExample/SpaceExample";
import Home from "./components/Home/Home";
import CustomExample from "./components/CustomExample/CustomExample";
import HeroProject from "./components/HeroProject/HeroProject";
import ReactSpring from "./components/ReactSpring/ReactSpring";
import PaulHenschelExample from "./components/PaulHenschelExample/PaulHenschelExample";

import { PageContext } from "./context/GlobalContext";

import { HenschelProvider } from "./components/PaulHenschelExample/HenschelContext";

function App() {
  const [page, setPage] = useContext(PageContext);

  return (
    <div className="App">
      {page === "home" ? <Home /> : null}
      {page === "customExample" ? <CustomExample /> : null}
      {page === "react3fiberDocs" ? <ReactThreeFiberDocs /> : null}
      {page === "gtlfLoaderTest" ? <GLTFLoaderTest /> : null}
      {page === "spaceExample" ? <SpaceExample /> : null}
      {page === "heroProject" ? <HeroProject /> : null}
      {page === "reactSpring" ? <ReactSpring /> : null}
      {page === "phe" && (
        <HenschelProvider>
          <PaulHenschelExample />
        </HenschelProvider>
      )}
    </div>
  );
}

export default App;
