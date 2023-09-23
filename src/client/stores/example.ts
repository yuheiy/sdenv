import type { Stores } from 'alpinejs';

export default function () {
  return {
    init() {
      if (import.meta.env.DEV) {
        console.log('init store');
      }
    },
  } satisfies Stores;
}
