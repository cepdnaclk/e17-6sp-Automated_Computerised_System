import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/AuthContext";
import "../../styles/table.css";
import PendingTable from "./table_components/PendingTable";

function Pending() {
  const authCtx = useContext(AuthContext);
  const [pendingDeliveries, setPendingDeliveries] = useState([]);

  useEffect(() => {
    let url = "http://localhost:8080/api/issue-product";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${authCtx.token}`,
      },
    })
      .then((res) => {
        res
          .text()
          .then((data) => {
            const new_arr = JSON.parse(data);
            setPendingDeliveries(new_arr);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authCtx]);

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <h2 style={{ margin: "0", fontSize: "40px", color: "#0f003c" }}>
          Pending to Receive the Store
        </h2>
      </div>
      <PendingTable pendingDeliveries={pendingDeliveries}/>
    </div>
  );
}

export default Pending;
