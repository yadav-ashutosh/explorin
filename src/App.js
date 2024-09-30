import './App.css';
import React, { useState } from 'react';
import { Paper, AppBar, Tabs, Tab, Box, Button } from '@mui/material';
import SimpleTable from './components/Worker';
import OtherComponent from './components/Other';
function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
      <div className="App">
       <Paper sx={{ width: 'auto' , padding: '26px' }}>
       <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <h2>Create workorder</h2>
        <Button sx={{ backgroundColor: '#63d2d1', color: 'white', height: '50%'}}>
          Save
        </Button>
      </Box>
      <AppBar position="static" color="default" >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Overview" />
          <Tab label="Other" />
        </Tabs>
      </AppBar>
      {tabValue === 0 && <SimpleTable />}
      {tabValue === 1 && <OtherComponent />}
      
    </Paper>
    </div>
  );
}

export default App;
