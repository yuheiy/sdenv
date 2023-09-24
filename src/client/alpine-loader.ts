import type { PluginCallback } from 'alpinejs';

export const app: PluginCallback = (Alpine) => {
  const modules = import.meta.glob<PluginCallback>('./*.{component,store}.ts', {
    import: 'plugin',
    eager: true,
  });

  for (const plugin of Object.values(modules)) {
    Alpine.plugin(plugin);
  }
};
