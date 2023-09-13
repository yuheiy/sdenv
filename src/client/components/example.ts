import type { AlpineComponent } from 'alpinejs';

export default function () {
  return {
    init() {
      if (import.meta.env.DEV) {
        console.log('init component');
      }
    },
  } satisfies AlpineComponent;
}
