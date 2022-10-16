import React from "react";
import "../../../styles/table.css";
import UnsuccessfulTableRow from "./UnsuccessfulTableRow";
import UnsuccessfulTableHeader from "./UnsuccessfulTableHeader";

function UnsuccessfulTable(props) {
  const erroredDeliveries = props.erroredDeliveries;
  const onClickHandler = props.onClickHandler;
  return (
    <React.Fragment>
      <ul className="responsive-table">
        {erroredDeliveries.length !== 0 && <UnsuccessfulTableHeader />}
        {erroredDeliveries.length !== 0 ? (
          erroredDeliveries.map((delivery) => (
            <UnsuccessfulTableRow
              onClickHandler={onClickHandler}
              data={delivery}
              key={delivery.BatchNumber}
            />
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
            All Items are Received to the Store Successfully
          </h3>
        )}
      </ul>
    </React.Fragment>
  );
}

export default UnsuccessfulTable;
