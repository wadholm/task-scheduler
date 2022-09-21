/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from "react";
import { useTable } from "react-table";
import BootstrapTable from 'react-bootstrap/Table';
import "./TableContainer.css";
 
function Table(props) {
    const { columns, data } = props;

    const tableInstance = useTable({ columns, data })
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance
 
    if (data.length > 0) {
        return (
          <>
          <style type="text/css">
          {`
    .table>thead {
      vertical-align: bottom;
      background-color: #11126d;
      color: white;
    }
    .table>tbody {
      background-color: #fff;
    }
      `}
        </style>
            <BootstrapTable id="myTable" bordered hover {...getTableProps()}>
              <thead>
                {// Loop over the header rows
                headerGroups.map(headerGroup => (
                  // Apply the header row props
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {// Loop over the headers in each row
                    headerGroup.headers.map(column => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {// Render the header
                        column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {/* Apply the table body props */}
              <tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                rows.map(row => {
                  // Prepare the row for display
                  prepareRow(row)
                  return (
                    // Apply the row props
                    <tr {...row.getRowProps()}>
                      {// Loop over the rows cells
                      row.cells.map(cell => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {// Render the cell contents
                            cell.render('Cell')}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </BootstrapTable>
            </>
          );
    }
    return <p>No tasks to present. </p>;
}
export default Table;
