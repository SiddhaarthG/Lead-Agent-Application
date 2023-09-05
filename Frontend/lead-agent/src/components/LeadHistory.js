import React, { useState, useEffect } from "react";
import axios from "axios";

const LeadHistory = () => {
  const [leadHistory, setLeadHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8088/history/getAll")
      .then((response) => {
        setLeadHistory(response.data.reverse());
      })
      .catch((error) => {
        console.error("Error fetching lead history:", error);
      });
  }, []);

  const filteredHistory = leadHistory.filter((history) => {
    const searchTerms = searchQuery.toLowerCase().split(" ");
    const historyText = [
      history.leadName,
      history.oldStatus,
      history.newStatus,
      history.modifiedBy,
      history.notes,
      new Date(history.modificationDate).toLocaleString(),
    ]
      .join(" ")
      .toLowerCase();

    return searchTerms.every((term) => historyText.includes(term));
  });

  return (
    <div className="p-3">
      <div className="flex flex-col">
        <div className="sticky top-0 bg-white z-10">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full px-10 py-2 text-blue-700 bg-white border rounded-full focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Search..."
              />
            </div>
            <div className="-my-2  sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle   inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 ">
                    <thead className="bg-blue-300  sticky top-0 z-10">
                      <tr className="table-header">
                        <th
                          scope="col"
                          className="px-2 py-4 text-center text-xs font-bold text-black uppercase tracking-wider sticky"
                        >
                          Lead Name
                        </th>
                        <th
                          scope="col"
                          className="pr-5 px-3 py-4 text-right text-xs font-bold text-black uppercase tracking-wider sticky"
                        >
                          Old Status
                        </th>
                        <th
                          scope="col"
                          className="pl-10 px-7 py-4 text-center text-xs font-bold text-black uppercase tracking-wider sticky"
                        >
                          New Status
                        </th>
                        <th
                          scope="col"
                          className="pl-3 px-4 py-4 text-center text-xs font-bold text-black uppercase tracking-wider sticky"
                        >
                          Modified By
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-center text-xs font-bold text-black uppercase tracking-wider sticky"
                        >
                          Notes
                        </th>
                        <th
                          scope="col"
                          className="ml-3 px-10 py-4 text-center text-xs font-bold text-black uppercase tracking-wider sticky"
                        >
                          Modified / Created Date
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="-my-2 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle  text-left inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 ">
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHistory.map((history) => (
                    <tr key={history.id}>
                      <td className="px-12 py-4 whitespace-nowrap">
                        {history.leadName}
                      </td>
                      <td className="px-9 py-4 whitespace-nowrap">
                        {history.oldStatus}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap">
                        {history.newStatus}
                      </td>
                      <td className="px-7 py-4 whitespace-nowrap">
                        {history.modifiedBy}
                      </td>
                      <td className="px-6 py-4 text-left whitespace-nowrap">
                        {history.notes}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap">
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
