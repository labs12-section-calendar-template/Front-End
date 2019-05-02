import React from "react";

const Selected = props => {
  if (!props.day) {
    return null;
  }
  return (
    <div style={{ display: "flex" }}>
      <h4 style={{ marginRight: "3%", width: "150px", alignSelf: "center" }}>
        {props.children}
      </h4>

      <input style={{ height: "25px", margin: "15% 0" }} />
    </div>
  );
};

export default Selected;
