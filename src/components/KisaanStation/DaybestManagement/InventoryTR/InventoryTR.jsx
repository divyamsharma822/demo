import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./InventoryTR.module.scss";

const capitalizeFirst = (str) => {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return "-";
};

const InventoryTR = ({ element }) => {
  var eventDateString = new Date(
    parseInt(element._id.substring(0, 8), 16) * 1000
  );
  var mom = moment.utc(eventDateString, "ddd MMM DD YYYY HH:mm:ss ZZ");

  return (
    <tr className={styles.tr}>
      <td>{element?.ItemID}</td>
      <td>{capitalizeFirst(element?.ItemName)}</td>
      <td>{capitalizeFirst(element?.HolderName)}</td>
      <td
        className={`text-truncate`}
        style={{ maxWidth: "20vw", minWidth: "120px" }}
      >
        {element.Location}
      </td>
      <td className="text-center">
        {element?.HolderName && mom.format("DD MMM, YYYY")}
      </td>
      <td className={`text-center`}>
        <span
          className={`${element.Status === "Active" ? styles.btnActive : ""} ${
            element.Status === "In-store" ? styles.btnInstore : ""
          }${element.Status === "Damaged" ? styles.btnDamaged : ""}${
            element.Status === "Working" ? styles.btnWorking : ""
          }${element.Status === "On-site" ? styles.btnOnsite : ""}
                    ${
                      element.Status === "Repairing" ? styles.btnRepairing : ""
                    }`}
        >
          {element?.Status}
        </span>
      </td>

      <td>
        <Link
          to={"/admin/KisaanStation/DaybestManagement/Inventory/View"}
          state={{ data: element }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className={styles.viewBtn}> View</div>
        </Link>
      </td>
    </tr>
  );
};

export default InventoryTR;
