import React, { Fragment } from "react";
import Menu from "./Menu";
import TechnicianLocation from "./TechnicianLocation";
import Notification from "./Common/Notification";

const App = () => {
  return (
    <Fragment>
      <Menu />
      <TechnicianLocation />
      <Notification />
    </Fragment>
  );
};

export default App;
