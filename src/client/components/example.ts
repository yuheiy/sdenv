import type { AlpineComponent } from 'alpinejs';

export default () =>
  ({
    init() {
      if (import.meta.env.DEV) {
        console.log('init component');
      }
    },
  }) satisfies AlpineComponent;
