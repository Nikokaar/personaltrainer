import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { ColDef } from "ag-grid-community";
import './App.css'

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api';

type TCustomer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
}
function CustomerList() {
    const [customers, setCustomers] = useState<TCustomer[]>([]);

    const [columnDefs] = useState<ColDef<TCustomer>[]>([
        { field: "firstname", flex: 1 },
        { field: "lastname", flex: 1 },
        { field: "streetaddress", flex: 1 },
        { field: "postcode", flex: 1 },
        { field: "city", flex: 1 },
        { field: "email", flex: 1 },
        { field: "phone", flex: 1 }
,     ]);

    const fetchCustomers = () => {
        fetch(`${BASE_URL}/customers`)
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.error(error));
    }

    useEffect(fetchCustomers, []);

    return(
        <div style={{ width: 1450, height: 750 }}>
            <AgGridReact
            rowData={customers}
            columnDefs={columnDefs}
            defaultColDef={{
                filter: true,        
                sortable: true,      
                floatingFilter: true 
              }}
            />
        </div>
    );
}

export default CustomerList;