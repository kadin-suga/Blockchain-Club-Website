// Mock Kafka implementation for browser compatibility
export const TOPICS = {
  MOUSE_MOVEMENTS: 'mouse-movements',
  CLICKS: 'user-clicks',
  PAGE_VIEWS: 'page-views',
};

class MockKafkaService {
  constructor() {
    this.isConnected = false;
    this.events = [];
  }

  async connectProducer() {
    this.isConnected = true;
    console.log('Mock Kafka producer connected');
    return Promise.resolve();
  }

  async disconnectProducer() {
    this.isConnected = false;
    console.log('Mock Kafka producer disconnected');
    return Promise.resolve();
  }

  async sendMessage(topic, message) {
    if (!this.isConnected) {
      await this.connectProducer();
    }

    this.events.push({
      topic,
      message: {
        ...message,
        timestamp: new Date().toISOString(),
      },
    });

    // Store events in localStorage for persistence
    localStorage.setItem('kafkaEvents', JSON.stringify(this.events));
    console.log(`Mock message sent to ${topic}:`, message);
  }

  getEvents() {
    const storedEvents = localStorage.getItem('kafkaEvents');
    return storedEvents ? JSON.parse(storedEvents) : [];
  }
}

export const kafkaService = new MockKafkaService();