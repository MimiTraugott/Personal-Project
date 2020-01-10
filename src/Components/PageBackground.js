import React from "react";
import { useLocation } from "react-router-dom";

function PageBackground(props) {
  const location = useLocation();

  return (
    <div class ="mainpagestyletest">
      <div className={location.pathname === "/" ? "logoLanding" : "logoRepeat"}>
        {props.children}
      </div>
    </div>
  );
}

export default PageBackground;
