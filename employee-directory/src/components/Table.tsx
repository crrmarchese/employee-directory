import React, { useState, useEffect, useRef } from 'react';
import getRandomUser from "../utils/API";

// Prime React Library
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import API from '../utils/API'

const Table = () => {

    // First item in array sets the initial state, second item is the function to update it
    const [employees, setEmployees] = useState([]);
   
    // Import the API data, create a const that holds the new array data created by .map and return the individual data items that shows in the table. Axios returns a "data" object by default but then this api has an object named "data" and the name of the array of data returned is named results.
    useEffect(() => {
        API.getRandomUser().then(data => {
            const listEmployees = data.data.results.map((employee:any) => {
                return {
                    name: `${employee.name.first} ${employee.name.last}`,
                    street: `${employee.location.street.number} ${employee.location.street.name}`,
                    city: `${employee.location.city}`,
                    state: `${employee.location.state}`,
                    zipcode: `${employee.location.postcode}`,
                    image: `${employee.picture.thumbnail}`
                }
            })
            setEmployees(listEmployees)


        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const imageBodyTemplate = (rowData:any) => {
        return <img src={`${rowData.image}`} alt={rowData.name} className="p-shadow-2" />;
    }
    //console.log(employees);
    return (
        <div>
            <div className="card">
                {/* The datatable value is the initial value we set up in useState but is then update with the changes made when we create a new array for listEmployees. The field name must match the key name in const listEmployees */}
                <DataTable value={employees} header="US Employees" className="p-datatable-lg p-datatable-striped" removableSort scrollable>
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="street" header="Street"></Column>
                    <Column field="city" header="City" sortable></Column>
                    <Column field="state" header="State" sortable></Column>
                    <Column field="zipcode" header="Zip"></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default Table
