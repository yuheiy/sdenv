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

  await loadAlpineModules();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).Alpine = Alpine;
  Alpine.start();
}

main();
