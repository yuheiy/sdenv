import type { PluginCallback } from 'alpinejs';

export default ((Alpine) => {
  Alpine.data('example', () => ({
    init() {
      if (import.meta.env.DEV) {
        console.log('init component');
      }
    },
  }));
}) as PluginCallback;
