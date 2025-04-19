// Import the Firebase messaging library
import { getMessaging } from 'firebase/messaging';

// Firebase messaging service worker script
// Initialize Firebase messaging
const messaging = getMessaging();

self.addEventListener('push', (event) => {
  const message = event.data.json();
  const title = message.notification.title;
  const options = {
    body: message.notification.body,
    icon: message.notification.icon,
    badge: message.notification.badge,
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
