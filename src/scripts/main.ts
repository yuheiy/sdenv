import collapse from '@alpinejs/collapse';
import focus from '@alpinejs/focus';
import ui from '@alpinejs/ui';
// eslint-disable-next-line import/no-named-as-default
import Alpine from 'alpinejs';
import { loadComponents } from './components';
import { loadStores } from './stores';

(async () => {
  // https://vitejs.dev/guide/env-and-mode.html#env-variables
  if (import.meta.env.DEV) {
    console.log({
      MODE: import.meta.env.MODE,
      BASE_URL: import.meta.env.BASE_URL,
      PROD: import.meta.env.PROD,
      DEV: import.meta.env.DEV,
    });
  }

  Alpine.plugin(collapse);
  Alpine.plugin(focus);
  Alpine.plugin(ui);

  await Promise.all([loadComponents(), loadStores()]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).Alpine = Alpine;
  Alpine.start();
})();
