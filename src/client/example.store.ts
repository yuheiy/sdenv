import type { PluginCallback } from 'alpinejs';

export const plugin: PluginCallback = (Alpine) => {
  Alpine.store('example', {
    init() {
      if (import.meta.env.DEV) {
        console.log('init store');
      }
    },
  });
};
