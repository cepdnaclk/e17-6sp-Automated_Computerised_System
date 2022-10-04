import React, { useEffect, useState } from "react";
import "../../styles/table.css";
import "../../styles/dropdown.css";
import "./styles/yearDropdown.css";

const inputs = [
    {
      id: 1,
      month: 'January',
    },
    {
        id: 2,
        month: 'February',
    },
    {
        id: 3,
        month: 'March',
    },
    {
        id: 4,
        month: 'April',
    },
    {
        id: 5,
        month: 'May',
    },
    {
        id: 6,
        month: 'June',
    },
    {
        id: 7,
        month: 'July',
    },
    {
        id: 8,
        month: 'August',
    },
    {
        id: 9,
        month: 'September',
    },
    {
        id: 10,
        month: 'October',
    },
    {
        id: 11,
        month: 'November',
    },
    {
        id: 12,
        month: 'December',
    },
  ];

function ViewProduction() {

    const [monthYear, setMonthYear] = useState({
        month: 'january',
        year: '2022'
    });

    const onChangeHandler = (e) => {
        setMonthYear({ ...monthYear, [e.target.name]: e.target.value });
    }

    useEffect(() => {
     console.log(monthYear) 
    }, [monthYear]);
    
  return (
    <div className="container">
      <div style={{display:"flex", justifyContent:"space-evenly"}}>
        <div>
        <select id="month" name="month" className='dropdown dropdown-month' onChange={onChangeHandler}>
            {inputs.map(input => (
                 <option value={input.month} key={input.id}>{input.month}</option>
            ))}
        </select>
        <select id="year" name="year" className='dropdown dropdown-year' onChange={onChangeHandler}>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
        </select>
        </div>
        <h2 style={{margin:"0", fontSize:"40px", color:"#0f003c"}}>Production Details</h2>
      </div>
      
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Job Id</div>
          <div className="col col-2">Customer Name</div>
          <div className="col col-3">Amount Due</div>
          <div className="col col-4">Payment Status</div>
        </li>
        <li className="table-row">
          <div className="col col-1" data-label="Job Id">
            42235
          </div>
          <div className="col col-2" data-label="Customer Name">
            John Doe
          </div>
          <div className="col col-3" data-label="Amount">
            $350
          </div>
          <div className="col col-4" data-label="Payment Status">
            Pending
          </div>
        </li>
        <li className="table-row">
          <div className="col col-1" data-label="Job Id">
            42442
          </div>
          <div className="col col-2" data-label="Customer Name">
            Jennifer Smith
          </div>
          <div className="col col-3" data-label="Amount">
            $220
          </div>
          <div className="col col-4" data-label="Payment Status">
            Pending
          </div>
        </li>
        <li className="table-row">
          <div className="col col-1" data-label="Job Id">
            42257
          </div>
          <div className="col col-2" data-label="Customer Name">
            John Smith
          </div>
          <div className="col col-3" data-label="Amount">
            $341
          </div>
          <div className="col col-4" data-label="Payment Status">
            Pending
          </div>
        </li>
        <li className="table-row">
          <div className="col col-1" data-label="Job Id">
            42311
          </div>
          <div className="col col-2" data-label="Customer Name">
            John Carpenter
          </div>
          <div className="col col-3" data-label="Amount">
            $115
          </div>
          <div className="col col-4" data-label="Payment Status">
            Pending
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ViewProduction;
