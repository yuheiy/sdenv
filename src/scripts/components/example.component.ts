import type { Alpine } from 'alpinejs';

export default function (Alpine: Alpine) {
  Alpine.data('example', () => ({
    init() {
      if (import.meta.env.DEV) {
        console.log('init example component');
      }
    },
  }));
}
