import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { kafkaService, TOPICS } from '../services/kafkaService';

const MOUSE_MOVEMENT_THROTTLE = 100; // Send mouse movement data every 100ms

export const useUserTracking = () => {
  const location = useLocation();
  const lastMouseMovement = useRef(Date.now());

  // Track page views
  useEffect(() => {
    const trackPageView = async () => {
      await kafkaService.sendMessage(TOPICS.PAGE_VIEWS, {
        path: location.pathname,
        search: location.search,
      });
    };

    trackPageView();
  }, [location]);

  // Track mouse movements (throttled)
  const handleMouseMove = useCallback((event) => {
    const now = Date.now();
    if (now - lastMouseMovement.current >= MOUSE_MOVEMENT_THROTTLE) {
      const { clientX, clientY, screenX, screenY } = event;
      kafkaService.sendMessage(TOPICS.MOUSE_MOVEMENTS, {
        clientX,
        clientY,
        screenX,
        screenY,
        path: location.pathname,
      });
      lastMouseMovement.current = now;
    }
  }, [location]);

  // Track clicks
  const handleClick = useCallback((event) => {
    const { clientX, clientY, target } = event;
    kafkaService.sendMessage(TOPICS.CLICKS, {
      clientX,
      clientY,
      elementType: target.tagName.toLowerCase(),
      elementId: target.id,
      elementClass: target.className,
      path: location.pathname,
    });
  }, [location]);

  // Set up event listeners
  useEffect(() => {
    // Connect to Kafka when component mounts
    kafkaService.connectProducer();

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      kafkaService.disconnectProducer();
    };
  }, [handleMouseMove, handleClick]);
};