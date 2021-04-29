import React, { useState, useEffect, useRef } from 'react';
import "./style.css";

// Prime React Library
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
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
                    image: `${employee.picture.medium}`
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
                {rowData.zipcode}
            </React.Fragment>
        );
    }

    // Global search in table header
    const header = (
        <div className="table-header">
           <p>US Employees</p> 
            <div className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter((e.target as any).value)} placeholder="Global Search" />
            </div>
        </div>
    );

    //console.log(employees);
    return (
            <div className="card">
                {/* The Datatable value is the initial value we set up in useState but is then updated with the changes made when we create a new array for listEmployees. In the Column, the "field" name must match the "key" name in const listEmployees */}
                <DataTable ref={dt} value={employees} header={header} footer={footer} className="p-datatable-lg p-datatable-striped p-text-center" removableSort globalFilter={globalFilter} emptyMessage="No customers found." resizableColumns columnResizeMode="fit">
                    <Column field="name" header="Name" sortable body={nameBodyTemplate} filter filterPlaceholder="Search by name" style={{width:'10%'}}></Column>
                    <Column field="street" header="Street" style={{width:'10%'}}></Column>
                    <Column field="city" header="City" sortable body={cityBodyTemplate} filter filterPlaceholder="Search by city" style={{width:'10%'}}></Column>
                    <Column field="state" header="State" sortable body={stateBodyTemplate} filter filterPlaceholder="Search by state" style={{width:'10%'}}></Column>
                    <Column field="zipcode" header="Zip" body={zipBodyTemplate} filter filterPlaceholder="Search by zip" style={{width:'10%'}}></Column>
                    <Column field="phone" header="Phone" style={{width:'10%'}}></Column>
                    <Column field="email" header="Email" className="email" style={{width:'20%'}}></Column>                  
                    <Column field="image" header="Image" body={imageBodyTemplate} style={{width:'10%'}}></Column>
                </DataTable>
            </div>
        
    )
}

export default Table
