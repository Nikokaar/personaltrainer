import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { ColDef } from "ag-grid-community";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api';

type TTraining = {
    date: Date;
    duration: string;
    activity: string;
 
}
function TrainingList() {
    const [trainings, setTrainings] = useState<TTraining[]>([]);

    const [columnDefs] = useState<ColDef<TTraining>[]>([
        { field: "date" },
        { field: "duration" },
        { field: "activity" }
    
,     ]);

    const fetchTrainings = () => {
        fetch(`${BASE_URL}/trainings`)
            .then(response => response.json())
            .then(data => setTrainings(data._embedded.trainings))
            .catch(error => console.error(error));
    }

    useEffect(fetchTrainings, []);

    return(
        <div style={{ width: 1450, height: 750 }}>
            <AgGridReact
            rowData={trainings}
            columnDefs={columnDefs}
            />
        </div>
    )
}

export default TrainingList;