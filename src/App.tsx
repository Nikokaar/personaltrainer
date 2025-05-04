import './App.css'
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';

function App() {
 

  return (
    <>
        
      <AppBar position = 'relative'>
        <Toolbar>
          <Typography variant="h6">Personal Trainer</Typography>
        </Toolbar>
      </AppBar>
      <Container>
      <nav style={{ margin: '1rem 0' }}>
      <Link to={"/CustomerList"}>Customers</Link> 
      <Link to={"/TrainingList"}>Trainings</Link>     
      </nav>
      
    </Container>
    

      <Outlet />
    </>
  );
}

export default App
