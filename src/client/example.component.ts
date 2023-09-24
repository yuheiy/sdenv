import type { PluginCallback } from 'alpinejs';

export const plugin: PluginCallback = (Alpine) => {
  Alpine.data('example', () => ({
    init() {
      if (import.meta.env.DEV) {
        console.log('init component');
      }
    },
  }));
};
