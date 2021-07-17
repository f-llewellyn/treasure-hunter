// Imports workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

// registers route for image files
workbox.routing.registerRoute(
    ({request}) => request.destination === "image",
    // PWA will prioritise cache over network
    new workbox.strategies.CacheFirst()
);