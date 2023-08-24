import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LeadHistory.css'; 

const LeadHistory = () => {
  const [leadHistory, setLeadHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8088/history/getAll') 
      .then(response => {
        setLeadHistory(response.data.reverse());
      })
      .catch(error => {
        console.error('Error fetching lead history:', error);
      });
  }, []);

  const filteredHistory = leadHistory.filter(history => {
    const searchTerms = searchQuery.toLowerCase().split(' ');
    const historyText = [
      history.leadName,
      history.oldStatus,
      history.newStatus,
      history.modifiedBy,
      history.notes,
      new Date(history.modificationDate).toLocaleString(),
    ].join(' ').toLowerCase();
    
    return searchTerms.every(term => historyText.includes(term));
  });

  return (
    <div className="p-6">
      <div className="flex flex-col">
        <div className="sticky top-0 bg-white z-10">
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="block w-full px-10 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <br />
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr className='table-header'>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lead Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Old Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      New Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Modified By
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Modified / Created Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHistory.map(history => (
                    <tr key={history.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {history.leadName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {history.oldStatus}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {history.newStatus}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {history.modifiedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {history.notes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(history.modificationDate).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadHistory;
