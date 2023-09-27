import React from "react";
import "./AttendanceHistory.scss";

const AttendanceHistory = ({ heading, data }) => {
  return (
    <div className="AttendanceHistory">
      <div className="month">
        <div>
          <h6>Month</h6>
          <select>
            <option>March</option>
          </select>
        </div>
      </div>
      <hr></hr>
      <div className="heading">
        <table>
          <tr className="user_title">
            {heading.map((curr, index) => (
              <th key={index}>{curr}</th>
            ))}
          </tr>
          {data.map((curr, index) => (
            <tr className="user_details" key={index}>
              {curr.map((td, i) => (
                <td key={i}>{td}</td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AttendanceHistory;
