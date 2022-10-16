import React, { useContext, useEffect, useState } from "react";
import "../../styles/table.css";
import "../../styles/dropdown.css";
import "./styles/yearDropdown.css";
import AuthContext from "../../store/AuthContext";
import ProductionTable from "./table_components/ProductionTable";

const inputs = [
  {
    id: 1,
    month: "January",
  },
  {
    id: 2,
    month: "February",
  },
  {
    id: 3,
    month: "March",
  },
  {
    id: 4,
    month: "April",
  },
  {
    id: 5,
    month: "May",
  },
  {
    id: 6,
    month: "June",
  },
  {
    id: 7,
    month: "July",
  },
  {
    id: 8,
    month: "August",
  },
  {
    id: 9,
    month: "September",
  },
  {
    id: 10,
    month: "October",
  },
  {
    id: 11,
    month: "November",
  },
  {
    id: 12,
    month: "December",
  },
];

function ViewProduction() {
  const authCtx = useContext(AuthContext);
  const [monthYear, setMonthYear] = useState({
    month: "1",
    year: "2022",
  });

  const [production, setProduction] = useState([]);

  const onChangeHandler = (e) => {
    setMonthYear({ ...monthYear, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(monthYear);
    let url = `http://localhost:8080/api/fac-product`;
    fetch(
      url +
        "?" +
        new URLSearchParams({
          year: monthYear.year,
          month: monthYear.month,
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${authCtx.token}`,
        },
      }
    )
      .then((res) => {
        res
          .text()
          .then((data) => {
            const new_arr = JSON.parse(data);
            setProduction(new_arr);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [monthYear, authCtx]);

  /*production.map((product) => {
    const newObject = {
      ...product,
      ProductDate: moment(product.ProductDate).utc().format("YYYY-MM-DD"),
    };
    console.log(newObject);
  });*/
  
  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div>
          <select
            id="month"
            name="month"
            className="dropdown dropdown-month"
            onChange={onChangeHandler}
          >
            {inputs.map((input) => (
              <option value={input.id} key={input.id}>
                {input.month}
              </option>
            ))}
          </select>
          <select
            id="year"
            name="year"
            className="dropdown dropdown-year"
            onChange={onChangeHandler}
          >
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>
        <h2 style={{ margin: "0", fontSize: "40px", color: "#0f003c" }}>
          Production Details
        </h2>
      </div>

    <ProductionTable production={production}/>
    </div>
  );
}

export default ViewProduction;
