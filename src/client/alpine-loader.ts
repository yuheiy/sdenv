import type { Alpine, PluginCallback } from 'alpinejs';

export function app(Alpine: Alpine) {
  const modules = import.meta.glob<PluginCallback>('./**/*.{component,store}.ts', {
    import: 'default',
    eager: true,
  });

  for (const plugin of Object.values(modules)) {
    Alpine.plugin(plugin);
  }
}
