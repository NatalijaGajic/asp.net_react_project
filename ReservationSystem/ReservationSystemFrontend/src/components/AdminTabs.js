import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function DisabledTabs() {
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    //console.log(newValue); 0, 1, 2
    setValue(newValue);
  };

  return (
    <>
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Games" />
        <Tab label="Reservations" />
        <Tab label="Tables" />
      </Tabs>
    </Paper>
    {
        (value === 0) && <p>Games</p>
    }
    {
        (value === 1) && <p>Reservations</p>
    }
    {
        (value === 2) && <p>Tables</p>
    }
    </>
  );
}
