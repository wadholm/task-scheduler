/* eslint-disable react/prop-types */
import { React, useMemo, useState } from "react";
import { useAsyncDebounce } from "react-table";

// import { Label, Input } from "reactstrap";
import BootstrapForm from "react-bootstrap/Form";
 
// Component for Global Filter
export function GlobalFilter({ 
   globalFilter, 
   setGlobalFilter 
}) {
 const [value, setValue] = useState(globalFilter);
 
 const onChange = useAsyncDebounce((value) => {
   setGlobalFilter(value || undefined);
 }, 200);
 
 return (
   <BootstrapForm>
     <BootstrapForm.Label>Search tasks: </BootstrapForm.Label>
     <BootstrapForm.Control
       value={value || ""}
       onChange={(e) => {
         setValue(e.target.value);
         onChange(e.target.value);
       }}
       placeholder=" Enter value "
       className="w-25"
       style={{
         fontSize: "1.1rem",
         margin: "15px",
         display: "inline",
       }}
     />
   </BootstrapForm>
 );
}
 
// Component for Default Column Filter
export function DefaultFilterForColumn({
 column: {
   filterValue,
   preFilteredRows: { length },
   setFilter,
 },
}) {
 return (
   <BootstrapForm.Control
     value={filterValue || ""}
     onChange={(e) => {
       // Set undefined to remove the filter entirely
       setFilter(e.target.value || undefined);
     }}
     placeholder={`Search ${length} records..`}
     style={{ marginTop: "10px" }}
   />
 );
}
 
// Component for Custom Select Filter
export function SelectColumnFilter({
 column: { filterValue, setFilter, preFilteredRows, id },
}) {
 
 // Use preFilteredRows to calculate the options
 const options = useMemo(() => {
   const options = new Set();
   preFilteredRows.forEach((row) => {
     options.add(row.values[id]);
   });
   return [...options.values()];
 }, [id, preFilteredRows]);
 
 // UI for Multi-Select box
 return (
    <>
   <BootstrapForm.Control
    as="select"
     value={filterValue}
     onChange={(e) => {
       setFilter(e.target.value || undefined);
     }}
   >
     <option value="">All</option>
     {options.map((option, i) => (
       <option key={i} value={option}>
         {option}
       </option>
     ))}
   </BootstrapForm.Control>
   </>
 );
}