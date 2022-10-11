/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from "react";
import BootstrapTable from 'react-bootstrap/Table';
import { useFilters, useGlobalFilter, useTable, useSortBy } from "react-table";
import { GlobalFilter, DefaultFilterForColumn} from "./Filter";
import { Button } from "react-bootstrap";
import "./Table.css";
 
function Table(props) {
    const { columns, data, setAddTask, setHideTable} = props;

    const onButtonClick = () => {
      setAddTask(true);
      setHideTable(true);
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      state,
      visibleColumns,
      prepareRow,
      setGlobalFilter,
      preGlobalFilteredRows,
    } = useTable(
      {
        columns,
        data,
        defaultColumn: { Filter: DefaultFilterForColumn },
      },
      useFilters,
      useGlobalFilter,
      useSortBy
    );
 
    if (data.length > 0) {
        return (
          <>
          <style type="text/css">
          {`
    .table>thead {
      vertical-align: bottom;
      background-color: none;
      color: dark-grey;
      border: none;
    }
    .table>tbody {
      background: rgb(255 255 255 / 51%);
    }

    .form-control {
      box-shadow: 1px 2px 18px #e6ebfe;
      border: 0px;
    }
      `}
        </style>
            <>
            <BootstrapTable responsive id="myTable" hover {...getTableProps()}>
              <thead>
              <tr className="table-head">
              <th
                colSpan={visibleColumns.length}
                style={{
                  textAlign: "left",
                }}
              >
                {/* Rendering Global Filter */}
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
                <Button variant="secondary" onClick={onButtonClick}>Add task</Button >
              </th>
              </tr>
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
                        {/* Rendering Default Column Filter */}
                  {/* Render the columns filter UI */}
                      <div>{column.canFilter ? column.render('Filter') : null}</div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {/* Apply the table body props */}
              <tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                rows.map((row, i) => {
                  // Prepare the row for display
                  prepareRow(row)
                  return (
                    // Apply the row props
                    <tr {...row.getRowProps()}>
                      {// Loop over the rows cells
                      row.cells.map(cell => {
                        // Apply the cell props
                        if (cell.column.Header === "Deadline") {
                          let date = new Date(cell.value)
                          return (
                            <td key={cell.value}>{date.toLocaleDateString()}</td>
                          )
                        }
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
            </>
          );
    }
    return <p>No tasks to present. </p>;
}
export default Table;
