import type { Alpine, PluginCallback } from 'alpinejs';

export function components(Alpine: Alpine) {
  const modules = import.meta.glob<PluginCallback>('./**/*.component.ts', {
    import: 'default',
    eager: true,
  });

  for (const plugin of Object.values(modules)) {
    Alpine.plugin(plugin);
  }
}
