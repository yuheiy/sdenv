import type { Alpine } from 'alpinejs';

export default function (Alpine: Alpine) {
  Alpine.store('example', {
    init() {
      if (import.meta.env.DEV) {
        console.log('init example store');
      }
    },
  });
}
