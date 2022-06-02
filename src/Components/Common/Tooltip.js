import React, { Fragment } from "react";

const Tooltip = ({ feature }) => {
  const { id, bearing, tsecs } = feature.properties;

  let renderHTML = [];
  if (feature.layer["source-layer"] && feature.layer.id) {
    renderHTML.push(
      <Fragment>
        <strong>Source Layer:</strong> {feature.layer["source-layer"]}
        <br />
        <strong>Layer ID:</strong> {feature.layer.id}
      </Fragment>
    );
  }

  if (bearing && tsecs) {
    renderHTML.push(
      <Fragment>
        <strong>Bearing:</strong> {bearing}
        <br />
        <strong>Tsecs:</strong> {tsecs}
      </Fragment>
    );
  }

  if(renderHTML.length === 0) return null;

  return <div id={`tooltip-${id}`}>{renderHTML}</div>;
};

export default Tooltip;
