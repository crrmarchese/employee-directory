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
    //const productService = new ProductService();

    useEffect(() => {
        API.getRandomUser().then(data => {
            const listEmployees = data.data.results.map((employee:any) => {
                return {
                    name: `${employee.name.first} ${employee.name.last}`,
                    street: `${employee.location.street.number} ${employee.location.street.name}`,
                    city: `${employee.location.city}`,
                    state: `${employee.location.state}`,
                    image: `${employee.picture.thumbnail}`
                }
            })
            setEmployees(listEmployees)


        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const imageBodyTemplate = (rowData:any) => {
        return <img src={`${rowData.image}`} alt={rowData.name} className="product-image" />;
    }
    //console.log(employees);
    return (
        <div>
            <div className="card">
                <DataTable value={employees} header="Large Table" className="p-datatable-lg p-datatable-striped" removableSort scrollable scrollHeight="200px">
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="street" header="Street" sortable></Column>
                    <Column field="city" header="City" sortable></Column>
                    <Column field="state" header="State" sortable></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default Table
