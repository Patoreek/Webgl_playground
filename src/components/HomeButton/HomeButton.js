import React, { useContext } from "react";
import classes from "./HomeButton.module.scss";

import { PageContext } from "../../context/GlobalContext";

const HomeButton = () => {
  const [page, setPage] = useContext(PageContext);

  return (
    <h1 className={classes.menuText} onClick={() => setPage("home")}>
      Back to Main Menu
    </h1>
  );
};

export default HomeButton;
