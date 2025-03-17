import { kafkaService, TOPICS } from './kafkaService';

class MockKafkaConsumer {
  constructor() {
    this.data = {
      pageViews: [],
      mouseMovements: [],
      clicks: [],
    };
  }

  async connect() {
    try {
      // Get stored events from localStorage
      const events = kafkaService.getEvents();
      
      // Process stored events
      events.forEach(({ topic, message }) => {
        switch (topic) {
          case TOPICS.PAGE_VIEWS:
            this.data.pageViews.push(message);
            break;
          case TOPICS.MOUSE_MOVEMENTS:
            this.data.mouseMovements.push(message);
            break;
          case TOPICS.CLICKS:
            this.data.clicks.push(message);
            break;
        }
      });

      console.log('Mock analytics consumer connected');
    } catch (error) {
      console.error('Failed to connect mock consumer:', error);
    }
  }

  async disconnect() {
    console.log('Mock analytics consumer disconnected');
  }

  getData() {
    return this.data;
  }

  clearData() {
    this.data = {
      pageViews: [],
      mouseMovements: [],
      clicks: [],
    };
  }
}

export const kafkaConsumer = new MockKafkaConsumer(); 