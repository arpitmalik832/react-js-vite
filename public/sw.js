/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { PrecacheController } from 'workbox-precaching';

self.__precacheManifest = [].concat(
  self.__precacheManifest || self.__WB_MANIFEST,
);

const isSelfLocation = urlOrigin => [self.location.origin].includes(urlOrigin);

const precacheController = new PrecacheController();

registerRoute(
  ({ request }) => precacheController.getCacheKeyForURL(request.url),
  new StaleWhileRevalidate({
    cacheName: precacheController.strategy.cacheName,
  }),
);

registerRoute(
  ({ url }) =>
    isSelfLocation(url.origin) &&
    (url.pathname.includes(`/js/`) ||
      url.pathname.includes(`/css/`) ||
      url.pathname.endsWith(`remoteEntry.js`) ||
      url.pathname.endsWith(`/`)),
  new StaleWhileRevalidate({
    cacheName: 'chunks',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

registerRoute(
  ({ url }) =>
    isSelfLocation(url.origin) &&
    (url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.svg') ||
      url.pathname.endsWith('.gif') ||
      url.pathname.endsWith('.jpeg') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname.endsWith(`.ico`)),
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

self.skipWaiting();
