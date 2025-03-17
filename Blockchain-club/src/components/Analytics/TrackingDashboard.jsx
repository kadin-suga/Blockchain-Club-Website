import React, { useState, useEffect } from 'react';

function EventsTable({ kafkaData, lastUpdate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState([]);
  const [totalCounts, setTotalCounts] = useState({
    pageViews: 0,
    clicks: 0,
    mouseMovements: 0
  });
  const eventsPerPage = 50;

  // Update events whenever kafkaData or lastUpdate changes
  useEffect(() => {
    if (kafkaData && lastUpdate) {
      // Get timestamp for 1 minute ago
      const oneMinuteAgo = new Date(Date.now() - 60000);

      // Update total counts first
      setTotalCounts({
        pageViews: kafkaData.pageViews?.length || 0,
        clicks: kafkaData.clicks?.length || 0,
        mouseMovements: kafkaData.mouseMovements?.length || 0
      });

      // Combine all events and preserve their original timestamps
      const allEvents = [
        ...(kafkaData.pageViews || []).map(event => ({
          ...event,
          type: 'Page View',
          id: `pageview-${event.path}-${event.timestamp}`
        })),
        ...(kafkaData.clicks || []).map(event => ({
          ...event,
          type: 'Click',
          id: `click-${event.path}-${event.elementType}-${event.timestamp}`
        })),
        ...(kafkaData.mouseMovements || []).map(event => ({
          ...event,
          type: 'Mouse Movement',
          id: `mousemove-${event.path}-${event.clientX}-${event.clientY}-${event.timestamp}`
        }))
      ];

      // Filter events from the last minute and sort by timestamp
      const recentEvents = allEvents.filter(event => {
        const eventTime = new Date(event.timestamp);
        return eventTime >= oneMinuteAgo;
      }).sort((a, b) => {
        const timeA = new Date(a.timestamp).getTime();
        const timeB = new Date(b.timestamp).getTime();
        return timeB - timeA;
      });

      console.log('Processing events:', {
        totalCounts: totalCounts,
        recentEvents: {
          total: recentEvents.length,
          byType: {
            pageViews: recentEvents.filter(e => e.type === 'Page View').length,
            clicks: recentEvents.filter(e => e.type === 'Click').length,
            mouseMovements: recentEvents.filter(e => e.type === 'Mouse Movement').length
          }
        },
        timestamp: lastUpdate.toLocaleString()
      });

      setEvents(recentEvents);
      setCurrentPage(1);
    }
  }, [kafkaData, lastUpdate]);

  // Calculate pagination
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = events.slice(startIndex, endIndex);

  const formatTimestamp = (timestamp) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      return date.toLocaleString();
    } catch (e) {
      console.warn('Invalid timestamp:', timestamp);
      return 'Invalid timestamp';
    }
  };

  const formatEventDetails = (event) => {
    switch (event.type) {
      case 'Page View':
        return `Path: ${event.path}`;
      case 'Click':
        return `Path: ${event.path}, Element: ${event.elementType}${event.elementId ? `, ID: ${event.elementId}` : ''}`;
      case 'Mouse Movement':
        return `Path: ${event.path}, Position: (${event.clientX}, ${event.clientY})`;
      default:
        return 'No details available';
    }
  };

  // Get counts by type from current data (last minute only)
  const recentPageViews = events.filter(e => e.type === 'Page View').length;
  const recentClicks = events.filter(e => e.type === 'Click').length;
  const recentMouseMovements = events.filter(e => e.type === 'Mouse Movement').length;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Activity Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Total Activity</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Total Page Views</p>
              <p className="text-lg font-semibold text-gray-900">{totalCounts.pageViews}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Total Clicks</p>
              <p className="text-lg font-semibold text-gray-900">{totalCounts.clicks}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Total Mouse Movements</p>
              <p className="text-lg font-semibold text-gray-900">{totalCounts.mouseMovements}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Last Minute Activity</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Recent Page Views</p>
              <p className="text-lg font-semibold text-gray-900">{recentPageViews}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Recent Clicks</p>
              <p className="text-lg font-semibold text-gray-900">{recentClicks}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Recent Mouse Movements</p>
              <p className="text-lg font-semibold text-gray-900">{recentMouseMovements}</p>
            </div>
          </div>
          <div className="mt-2 text-center text-sm text-gray-500">
            Last updated: {lastUpdate ? lastUpdate.toLocaleString() : 'Never'}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatTimestamp(event.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {event.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatEventDetails(event)}
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                    No events in the last minute
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, events.length)}</span> of{' '}
                  <span className="font-medium">{events.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsTable; 