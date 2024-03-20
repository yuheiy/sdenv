import collapse from '@alpinejs/collapse';
import focus from '@alpinejs/focus';
import ui from '@alpinejs/ui';
import Alpine from 'alpinejs';

async function loadAlpineModules() {
  // enable code splitting
  await import('./alpinejs');
}

async function main() {
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

  await loadAlpineModules();

  (window as any).Alpine = Alpine;
  Alpine.start();
}

main();
