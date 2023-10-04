import type { Alpine, PluginCallback } from 'alpinejs';

export function stores(Alpine: Alpine) {
  const modules = import.meta.glob<PluginCallback>('./**/*.store.ts', {
    import: 'default',
    eager: true,
  });

  for (const plugin of Object.values(modules)) {
    Alpine.plugin(plugin);
  }
}
