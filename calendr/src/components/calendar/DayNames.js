import React from 'react'

// Renders all Day titles for the calendar
class DayNames extends React.Component {
    render() {
        return (
          <div className="dayNames">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>
        );
    }
}
export default DayNames
