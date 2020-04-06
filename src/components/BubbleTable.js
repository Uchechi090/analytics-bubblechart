import React from "react";

import "./BubbleTable.css";

//This is to render a table dynamically for a funding range
const BubbleTable = ({
  id,
  category,
  location,
  fundingAmount,
  announcedDate
}) => (
  <div>
    <table>
      <tr>
        <th>ID</th>
        <th>Category</th>
        <th>Location</th>
        <th>Funding Amount</th>
        <th>Announced Date</th>
      </tr>
      <tbody>
        <td>{id}</td>
        <td>{category}</td>
        <td>{location}</td>
        <td>{fundingAmount}</td>
        <td>{announcedDate}</td>
      </tbody>
    </table>
  </div>
);

export default BubbleTable;
