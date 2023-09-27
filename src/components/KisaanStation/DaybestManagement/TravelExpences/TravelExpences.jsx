import React from "react";
import "./TravelExpences.scss";
// import TravelExpensesPopup from "../TravelExpensesPopup/TravelExpensesPopup";
// import { useState } from "react";

function TravelExpences({ heading, data }) {
  return (
    <>
      <div className="TravelExpences">
        <table>
          <tr className="user_title">
            {heading.map((curr, index) => (
              <td key={index}>{curr}</td>
            ))}
          </tr>

          {data.map((curr, index) => (
            <tr className="user_details">
              {curr.map((currEle, i) => (
                <td key={i}>{currEle}</td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}

export default TravelExpences;
