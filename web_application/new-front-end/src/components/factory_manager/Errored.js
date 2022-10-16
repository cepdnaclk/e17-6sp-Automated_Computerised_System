import React, { useContext, useEffect, useState } from "react";
import "../../styles/table.css";
import AuthContext from "../../store/AuthContext";
import UnsuccessfulTable from "./table_components/UnsuccessfulTable";

function Errored() {
  const authCtx = useContext(AuthContext);
  const [erroredDeliveries, setErroredDeliveries] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    let url = "http://localhost:8080/api/issue-product/errored";
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
            setErroredDeliveries(new_arr);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [load, authCtx]);

  const onClickHandler = (batchNumber) => {
    let url = "http://localhost:8080/api/issue-product/errored";
    fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        batchNumber: batchNumber,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${authCtx.token}`,
      },
    })
      .then((res) => {
        res
          .text()
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    setLoad(!load);
  };
  
  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <h2 style={{ margin: "0", fontSize: "40px", color: "#0f003c" }}>
          Unsuccessful Receivings to Store{" "}
        </h2>
      </div>
      <UnsuccessfulTable
        erroredDeliveries={erroredDeliveries}
        onClickHandler={onClickHandler}
      />
    </div>
  );
}

export default Errored;
