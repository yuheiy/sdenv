import type { Alpine, PluginCallback } from 'alpinejs';

export function autoLoader(Alpine: Alpine) {
  const modules = import.meta.glob<PluginCallback>('./**/*.alpine.ts', {
    import: 'default',
    eager: true,
  });

  for (const plugin of Object.values(modules)) {
    Alpine.plugin(plugin);
  }
}
