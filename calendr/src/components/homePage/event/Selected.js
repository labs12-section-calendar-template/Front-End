import React from "react";

const Selected = props => {
  if (!props.day) {
    return null;
  }
  return (
    <div className="selected">
      <p className="selected-day">{props.children}</p>
      <input className="time-input" />
    </div>
  );
};

export default Selected;
