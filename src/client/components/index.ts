import type { Alpine } from 'alpinejs';
import invariant from 'tiny-invariant';

export default (Alpine: Alpine) => {
  const modules = import.meta.glob<Parameters<typeof Alpine.data>[1]>('./*.ts', {
    import: 'default',
    eager: true,
  });

  for (const [path, module] of Object.entries(modules)) {
    const base = path.split('/').pop();
    invariant(base);
    const name = base.split('.').slice(0, -1).join('.');
    Alpine.data(name, module);
  }
};
