import React from "react";
import "./DocumentsSection.scss";
function DocumentsScetion({ data }) {
  return (
    <div className="DocumentsSection">
      <table>
        <tr className="user_title">
          <td>Document Name</td>
          <td>Action</td>
        </tr>

        {data.map((currEle, index) => (
          <tr key={index} className="user_details">
            {currEle.map((ele, i) => (
              <td key={i}>{ele}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}

export default DocumentsScetion;
