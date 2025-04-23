import './App.css'
import { Link, Outlet } from 'react-router-dom';
import CustomerList from './CustomerList'
import TrainingList from './TrainingList'

function App() {
 

  return (
    <>
    <nav>
      <Link to={"/CustomerList"}>Customers</Link> 
      <Link to={"/TrainingList"}>Trainings</Link>     
      </nav>

      <Outlet />
    </>
  );
}

export default App
