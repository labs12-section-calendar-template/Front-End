import React from "react";
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment'
// const format = 'HH:mm'

const Selected = props => {

  return (
    <div className="selected">

      <p className="selected-day">{props.children}</p>
      <span className="event-time">Start time:</span>
      <TimePicker

        size="small"
        use12Hours format="h:mm a"
        name="startTime"
        type="text"
        defaultValue={(props.startTime, moment('0', 'h:mm '))}
        onChange={props.handleStartTimeChange}
        className="time-input"
      />
      <span className="event-time">End time:</span>
      <TimePicker

        size="small"
        use12Hours format="h:mm a"
        name="endTime"
        type="text"
        defaultValue={(props.endTime, moment('0', 'h:mm '))}
        onChange={props.handleEndTimeChange}
        className="time-input"
      />
    </div>
  );
};

export default Selected;