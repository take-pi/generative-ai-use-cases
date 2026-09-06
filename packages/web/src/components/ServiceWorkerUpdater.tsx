import { useEffect } from 'react';

const UPDATE_CHECK_INTERVAL_MS = 5 * 60 * 1000; // 5 min

const checkForUpdate = () => {
  navigator.serviceWorker?.getRegistration().then((registration) => {
    registration?.update();
  });
};

const ServiceWorkerUpdater: React.FC = () => {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    const intervalId = setInterval(checkForUpdate, UPDATE_CHECK_INTERVAL_MS);

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkForUpdate();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return null;
};

export default ServiceWorkerUpdater;
