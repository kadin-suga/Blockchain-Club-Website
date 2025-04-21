console.log("AnalyticsPage loaded")
import React, { useEffect, useState } from 'react';
import Header from '../Sections/Header';
import Footer from '../Sections/Footer';
import EventsTable from '../Analytics/TrackingDashboard';
import { kafkaConsumer } from '../../services/kafkaConsumer';

function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Function to fetch and update data
  const fetchAndUpdateData = () => {
    const updateTime = new Date();
    const newData = kafkaConsumer.getData();
    
    // Process the data to ensure all events have timestamps
    const processedData = {
      pageViews: (newData.pageViews || []).map(event => ({
        ...event,
        timestamp: event.timestamp || updateTime.toISOString()
      })),
      clicks: (newData.clicks || []).map(event => ({
        ...event,
        timestamp: event.timestamp || updateTime.toISOString()
      })),
      mouseMovements: (newData.mouseMovements || []).map(event => ({
        ...event,
        timestamp: event.timestamp || updateTime.toISOString()
      }))
    };

    console.log('Data update at', updateTime.toLocaleString(), ':', {
      pageViews: processedData.pageViews.length,
      clicks: processedData.clicks.length,
      mouseMovements: processedData.mouseMovements.length,
      sample: {
        pageView: processedData.pageViews[0],
        click: processedData.clicks[0],
        mouseMovement: processedData.mouseMovements[0]
      }
    });

    setAnalyticsData(processedData);
    setLastUpdate(updateTime);
  };

  useEffect(() => {
    const initializeAnalytics = async () => {
      try {
        await kafkaConsumer.connect();
        
        // Initial data fetch
        fetchAndUpdateData();
        setIsLoading(false);

        // Update data every 5 seconds
        const interval = setInterval(fetchAndUpdateData, 5000);

        return () => {
          clearInterval(interval);
          kafkaConsumer.disconnect();
        };
      } catch (error) {
        console.error('Failed to initialize analytics:', error);
        setIsLoading(false);
      }
    };

    initializeAnalytics();
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100">
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="text-2xl font-semibold text-gray-600">
              Loading Events...
            </div>
          </div>
        ) : (
          <>
            <div className="p-4 bg-white shadow-sm">
              <p className="text-sm text-gray-600">
                Last updated: {lastUpdate ? lastUpdate.toLocaleString() : 'Never'}
              </p>
            </div>
            <EventsTable kafkaData={analyticsData} lastUpdate={lastUpdate} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AnalyticsPage; 
