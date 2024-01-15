
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Divider } from '@mui/material';
import { useState } from 'react';

const CustomTab = ({ children, tabsLabel = [], initialTab = "0",onTabChange}) => {
    const [value, setValue] = useState(initialTab);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
        if (typeof onTabChange === "function") {
            onTabChange(newValue)
        }
    };

    return (
        <TabContext value={value}>
            <TabList
                onChange={handleChangeTab}
                centered
                aria-label="tab detalle"
                indicatorColor="#1976d2"
               
            >
                {
                    tabsLabel.map((label, index) => {
                        return (<Tab  key={index} label={label} value={`${index}`} />)
                    })
                }
            </TabList>
            <Divider sx={{ borderColor: "#1976d2", borderWidth: "2px" }} ></Divider>
            {
                tabsLabel.map((label, index) => {
                    return (
                        <TabPanel key={index} value={`${index}`} sx={{ p: { xs: 1, md: 2, xl: 3 } }}>
                            {children}
                        </TabPanel>
                    )
                })
            }
        </TabContext>
    );
}
export default CustomTab
