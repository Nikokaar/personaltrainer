import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { ColDef } from "ag-grid-community";


// Rekisteröidään AG Grid -moduulit
ModuleRegistry.registerModules([AllCommunityModule]);

const BASE_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

type TTraining = {
  date: string;
  duration: number;
  activity: string;
  customerName?: string;
};

function TrainingList() {
  const [trainings, setTrainings] = useState<TTraining[]>([]);

  const [columnDefs] = useState<ColDef<TTraining>[]>([
    {
      field: "date",
      headerName: "Date",
      valueFormatter: (params) =>
        new Date(params.value).toLocaleString("fi-FI"),
    },
    { field: "duration", headerName: "Duration (min)", flex: 0.3 },
    { field: "activity", headerName: "Activity", flex: 0.3 },
    { field: "customerName", headerName: "Customer", flex: 0.5 },
  ]);

  const fetchTrainings = () => {
    fetch(`${BASE_URL}/trainings`)
      .then((response) => response.json())
      .then((data) => {
        const trainings = data._embedded.trainings;

        const trainingWithCustomers = trainings.map((training: TTraining & { _links: any }) => {
          return fetch(training._links.customer.href)
            .then((res) => res.json())
            .then((customer) => {
              return {
                ...training,
                customerName: `${customer.firstname} ${customer.lastname}`,
              };
            });
        });

        Promise.all(trainingWithCustomers)
          .then((results) => setTrainings(results))
          .catch((err) => console.error("Virhe asiakastiedoissa:", err));
      })
      .catch((err) => console.error("Virhe treenien haussa:", err));
  };

  useEffect(fetchTrainings, []);

  return (
    <div style={{ width: 1450, height: 750 }}>
      <AgGridReact rowData={trainings} 
      columnDefs={columnDefs}
      defaultColDef={{
        filter: true,
        sortable: true,
        floatingFilter: true,
        resizable: true,
      }}
      />
    </div>
  );
}

export default TrainingList;
