import type { PluginCallback } from 'alpinejs';

export default ((Alpine) => {
  Alpine.store('example', {
    init() {
      if (import.meta.env.DEV) {
        console.log('init store');
      }
    },
  });
}) as PluginCallback;
