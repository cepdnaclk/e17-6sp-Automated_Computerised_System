import React from 'react'
import "../../../styles/table.css";
import ProductionTableHeader from './ProductionTableHeader';
import ProductionTableRow from './ProductionTableRow';

function productionTable(props) {
  const production = props.production;
  return (
    <React.Fragment>
      <ul className="responsive-table">
        {production.length !== 0 && <ProductionTableHeader />}
        {production.length !== 0 ? (
          production.map((product) => (
            <ProductionTableRow data={product} key={product.BatchNumber} />
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
            No Items were Produced
          </h3>
        )}
      </ul>
    </React.Fragment>
  )
}

export default productionTable