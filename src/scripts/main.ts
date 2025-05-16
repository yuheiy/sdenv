import Alpine from 'alpinejs';

import.meta.glob('./{components,stores}/*.{js,ts,jsx,tsx}', { eager: true });

// https://vitejs.dev/guide/env-and-mode.html#env-variables
if (import.meta.env.DEV) {
  console.log({
    MODE: import.meta.env.MODE,
    BASE_URL: import.meta.env.BASE_URL,
    PROD: import.meta.env.PROD,
    DEV: import.meta.env.DEV,
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).Alpine = Alpine;
Alpine.start();
