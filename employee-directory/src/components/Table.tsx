import React, { useState, useEffect, useRef } from 'react';
import "./style.css";

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
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);
   
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
                    phone: `${employee.phone}`,
                    email: `${employee.email}`,
                    image: `${employee.picture.thumbnail}`
                }
            })
            setEmployees(listEmployees)


        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const imageBodyTemplate = (rowData:any) => {
        return <img src={`${rowData.image}`} alt={rowData.name} className="p-shadow-2" />;
    }

    const footer = `There are ${employees ? employees.length : 0} employees in the directory.`;

    // Filter logic for Name, City, State and Zip
    const nameBodyTemplate = (rowData:any) => {
        return (
            <React.Fragment>
                {rowData.name}
            </React.Fragment>
        );
    }

    const cityBodyTemplate = (rowData:any) => {
        return (
            <React.Fragment>
                {rowData.city}
            </React.Fragment>
        );
    }

    const stateBodyTemplate = (rowData:any) => {
        return (
            <React.Fragment>
                {rowData.state}
            </React.Fragment>
        );
    }

    const zipBodyTemplate = (rowData:any) => {
        return (
            <React.Fragment>
                {rowData.zip}
            </React.Fragment>
        );
    }

    //console.log(employees);
    return (
            <div className="card">
                {/* The datatable value is the initial value we set up in useState but is then update with the changes made when we create a new array for listEmployees. The field name must match the key name in const listEmployees */}
                <DataTable ref={dt} value={employees} header="US Employees" footer={footer} className="p-datatable-lg p-datatable-striped p-text-center" removableSort scrollable globalFilter={globalFilter} emptyMessage="No customers found.">
                    <Column field="name" header="Name" sortable body={nameBodyTemplate} filter filterPlaceholder="Search by name"></Column>
                    <Column field="street" header="Street"></Column>
                    <Column field="city" header="City" sortable body={cityBodyTemplate} filter filterPlaceholder="Search by city"></Column>
                    <Column field="state" header="State" sortable body={stateBodyTemplate} filter filterPlaceholder="Search by state"></Column>
                    <Column field="zipcode" header="Zip" body={zipBodyTemplate} filter filterPlaceholder="Search by zip"></Column>
                    <Column field="phone" header="Phone"></Column>
                    <Column field="email" header="Email" className="email"></Column>                  
                    <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                </DataTable>
            </div>
        
    )
}

export default Table
