import React from 'react';
import { Link } from 'react-router-dom';
import DMSalesAgentTable from '../../../../tables/DMSalesAgentTable';

export default function DMSalesAgent() {
  return (
    <div>
      <div className="row m-2">
        <div className="col-2">
          <Link to="form">
            <button className="btn btn-primary">Add Agents</button>
          </Link>
        </div>
        <div class="topic_main col-10">Sales Agents</div>
      </div>
      <div>
        <DMSalesAgentTable />
      </div>
    </div>
  );
}
