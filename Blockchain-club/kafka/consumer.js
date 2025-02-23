import { Kafka } from 'kafkajs';
import fs from 'fs';
import path from 'path';
// run command below
// node Blockchain-club/kafka/consumer.js   
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

// Function to log data to a file
const logTrafficData = () => {
  try {
    fs.writeFileSync(logFilePath, JSON.stringify(pageCounts, null, 2));
  } catch (error) {
    console.error('Error writing traffic data:', error);
  }
};

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
