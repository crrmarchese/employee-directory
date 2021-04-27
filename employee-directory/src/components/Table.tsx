import React, { useState, useEffect } from 'react';
// Prime React Library
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ProductService from '../service/ProductService';

const Table = () => {

    // First item in array sets the initial state, second item is the function to update it
    const [products, setProducts] = useState([]);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsSmall().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    
    return (
        <div>
            <div className="card">
                <DataTable value={products} header="Large Table" className="p-datatable-lg p-datatable-striped" removableSort>
                    <Column field="code" header="Code" sortable></Column>
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="category" header="Category" sortable></Column>
                    <Column field="quantity" header="Quantity" sortable></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default Table
