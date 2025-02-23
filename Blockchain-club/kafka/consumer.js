import { Kafka } from 'kafkajs';
import fs from 'fs';
import path from 'path';

// Kafka setup
const kafka = new Kafka({
  clientId: 'traffic-consumer',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'traffic-group' });

// Object to store page view counts
let pageCounts = {};

// Define log file path
const logDir = path.resolve('logs');
const logFilePath = path.join(logDir, 'traffic_log.json');

// Ensure the logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Function to read existing traffic data from the log file
const readTrafficData = () => {
  if (fs.existsSync(logFilePath)) {
    try {
      const data = fs.readFileSync(logFilePath, 'utf8');
      pageCounts = JSON.parse(data); // Update pageCounts with existing data
    } catch (error) {
      console.error('Error reading traffic data:', error);
    }
  }
};

// Function to log data to a file
const logTrafficData = () => {
  try {
    fs.writeFileSync(logFilePath, JSON.stringify(pageCounts, null, 2));
  } catch (error) {
    console.error('Error writing traffic data:', error);
  }
};

// Initial read to populate pageCounts from the log file
readTrafficData();

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'website-traffic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        // Parse message
        const eventData = JSON.parse(message.value.toString());
        const page = eventData.page; // Extract page info

        if (page) {
          // Increment page count
          pageCounts[page] = (pageCounts[page] || 0) + 1;

          // Log to console
          console.log(`Page View Tracked: ${page} | Total Views: ${pageCounts[page]}`);

          // Save to file
          logTrafficData();
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    },
  });
};

run().catch(console.error);
