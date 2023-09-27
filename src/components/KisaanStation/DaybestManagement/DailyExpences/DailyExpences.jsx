import React from "react";
import "./DailyExpences.scss";

function DailyExpences({ heading, data }) {
  return (
    <div className="heading">
      <table>
        <tr className="user_title">
          {heading.map((ele, index) => (
            <td key={index}>{ele}</td>
          ))}
        </tr>
        {data.map((curr, i) => (
          <tr key={i} className="user_details">
            {curr.map((currEle, index) => (
              <td key={index}>{currEle} </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}

export default DailyExpences;
