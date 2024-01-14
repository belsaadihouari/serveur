import React from 'react';
import "./detail.css";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Cardarticle from "./cardarticle"
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const Detail = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    }; 

    return (
        <div className='containerdetail'>
       <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs textColor="secondary" indicatorColor="secondary"  value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab  className='tab' label="Javascrpit Articles" {...a11yProps(0)} />
          <Tab className='tab' label="React js Articles" {...a11yProps(1)} />
          <Tab className='tab' label="Node js Articles" {...a11yProps(2)} />
          <Tab className='tab' label="Next js Articles" {...a11yProps(3)} />
          <Tab className='tab' label="Mongodb Articles" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel  value={value} index={0}>
        <div className='containercardarticle flex'>
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <div className='containercardarticle flex'>
      <Cardarticle />
      </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <div className='containercardarticle flex'>
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      <div className='containercardarticle flex'>
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
      <div className='containercardarticle flex'>
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        <Cardarticle />
        </div>
      </CustomTabPanel>
    </Box>
    </div>
    );
}

export default Detail;
