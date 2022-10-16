import React from "react";
import "../../../styles/table.css";
import PendingTableHeader from "./PendingTableHeader";
import PendingTableRow from "./PendingTableRow";

function PendingTable(props) {
  const pendingDeliveries = props.pendingDeliveries;

  return (
    <React.Fragment>
      <ul className="responsive-table">
        {pendingDeliveries.length !== 0 && <PendingTableHeader />}
        {pendingDeliveries.length !== 0 ? (
          pendingDeliveries.map((delivery) => (
            <PendingTableRow data={delivery} key={delivery.BatchNumber} />
          ))
        ) : (
          <h3
            style={{
              color: "mediumvioletred",
              position: "relative",
              top: "6cm",
              fontSize: "20px",
            }}
          >
            Items are Received to the Store Successfully
          </h3>
        )}
      </ul>
    </React.Fragment>
  );
}

export default PendingTable;
