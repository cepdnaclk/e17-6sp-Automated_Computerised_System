import React from 'react';
import DMReceiveProductPendingTable from '../../../../tables/DMReceiveProductPendingTable';
import DMReceiveProductInProgressTable from '../../../../tables/DMReceiveProductInProgressTable';

export default function DMReceiveProduct() {
  return (
    <div>
      <DMReceiveProductPendingTable />
      <DMReceiveProductInProgressTable />
    </div>
  );
}
