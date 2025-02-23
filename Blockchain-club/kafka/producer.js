import { Kafka, Partitioners } from 'kafkajs';
import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
// Run command below
// node Blockchain-club/kafka/consumer.js   
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const kafka = new Kafka({
  clientId: 'website-tracker',
  brokers: ['localhost:9092']
});

// Create producer with the legacy partitioner to retain previous behavior
const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner
});

const app = express();

// Enable CORS for all origins (customize as needed)
app.use(cors());

// Use Express's built-in JSON middleware
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, 'public')));

// Route to track page visits
app.post('/track', async (req, res) => {
  const { user, page } = req.body;

  const eventData = {
    user,
    timestamp: new Date().toISOString(),
    page
  };

  try {
    // Send the event data to Kafka
    await producer.send({
      topic: 'website-traffic',
      messages: [{ value: JSON.stringify(eventData) }]
    });

    console.log('Tracked:', eventData);
    res.status(200).send({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    res.status(500).send({ error: 'Failed to track event' });
  }
});

// Start producer and server
const run = async () => {
  await producer.connect();
  app.listen(3000, () => console.log('Server running on port 3000'));
};

run().catch(console.error);
