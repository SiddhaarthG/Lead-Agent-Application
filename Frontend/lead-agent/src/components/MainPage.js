import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AssignedLeadsTable from './LeadTable';
import LeadHistoryTable from './LeadHistory';

const MainPage = () => {
  const location = useLocation();
  const agentInfo = location?.state?.agentInfo || {};
  const [activeTab, setActiveTab] = useState(0);

  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Welcome to your Dashboard <span className="text-blue-500">{agentInfo.name}</span>
      </h1>
      <br />
      <div className="sticky top-0 bg-white">
        <Tabs>
          <TabList className="flex ">
            <Tab
              className={`py-2 px-4 text-xl text-gray-600 hover:text-blue-600 font-semibold cursor-pointer transition ${
                activeTab === 0 ? 'border-b-4 border-green-600' : ''
              }`}
              selectedClassName="text-gray-900 font-semibold"
              onClick={() => handleTabSelect(0)}
            >
              Assigned Leads
            </Tab>
            <div className="h-6 w-px bg-gray-300 my-auto mx-4"></div>
            <Tab
              className={`py-2 px-4 text-xl text-gray-600 hover:text-blue-600 font-semibold cursor-pointer transition ${
                activeTab === 1 ? 'border-b-4 border-green-600' : ''
              }`}
              selectedClassName="text-gray-900 font-semibold"
              onClick={() => handleTabSelect(1)}
            >
              History
            </Tab>
          </TabList>
        </Tabs>
      </div>
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        <Tabs selectedIndex={activeTab} onSelect={handleTabSelect}>
          <TabPanel>
            <AssignedLeadsTable agentId={agentInfo.id} />
          </TabPanel>
          <TabPanel>
            <LeadHistoryTable />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default MainPage;
